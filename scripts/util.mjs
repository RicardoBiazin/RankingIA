// Funções comuns aos scripts: chave canônica de modelo, nome de empresa, JSON e HTML.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const caminho = (rel) => fileURLToPath(new URL('../' + rel, import.meta.url));

export function lerJSON(rel, padrao = null) {
  const arq = caminho(rel);
  return existsSync(arq) ? JSON.parse(readFileSync(arq, 'utf8')) : padrao;
}

export function gravarJSON(rel, dados, compacto = false) {
  const arq = caminho(rel);
  mkdirSync(dirname(arq), { recursive: true });
  writeFileSync(arq, JSON.stringify(dados, null, compacto ? 0 : 1) + '\n');
}

export function gravarTexto(rel, texto) {
  const arq = caminho(rel);
  mkdirSync(dirname(arq), { recursive: true });
  writeFileSync(arq, texto);
}

// Lê o .env local (chaves). O .env nunca vai para o git.
export function carregarEnv() {
  const arq = caminho('.env');
  if (!existsSync(arq)) return;
  for (const l of readFileSync(arq, 'utf8').split(/\r?\n/)) {
    const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

// Chave canônica: junta "Anthropic: Claude Opus 5.5", "anthropic/claude-opus-5.5",
// "Claude Opus 5.5 (High)" e "claude-opus-5.5" em "claude-opus-5.5".
// Datas e sufixos de esforço saem; o resto dos casos vai para dados/aliases.json.
export function chave(nome) {
  let s = String(nome).toLowerCase().trim();
  s = s.replace(/^[^:/]{1,40}:\s+/, '');         // "Anthropic: ..."
  s = s.replace(/^.*\//, '');                    // "anthropic/..."
  s = s.replace(/\([^)]*\)/g, ' ').trim();       // "(High)", "(0902)"
  s = s.replace(/[\s_]+/g, '-');
  s = s.replace(/-(\d{4}-\d{2}-\d{2}|\d{8}|\d{6}|\d{4})(?=-|$)/g, '');
  s = s.replace(/-(thinking|reasoning|xhigh|high|medium|low|max|effort|auto|latest)(?=-|$)/g, '');
  s = s.replace(/(-(preview|exp|experimental|beta|it|instruct))+$/, '');
  s = s.replace(/^claude-(\d+(?:\.\d+)?)-(opus|sonnet|haiku)/, 'claude-$2-$1'); // "Claude 4 Opus" = "Claude Opus 4"
  s = s.replace(/[^a-z0-9.+-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return s;
}

const EMPRESAS = {
  anthropic: 'Anthropic', openai: 'OpenAI', google: 'Google', 'x-ai': 'xAI', xai: 'xAI',
  'meta-llama': 'Meta', meta: 'Meta', 'meta ai': 'Meta', mistralai: 'Mistral', mistral: 'Mistral',
  deepseek: 'DeepSeek', 'deepseek-ai': 'DeepSeek', qwen: 'Alibaba', alibaba: 'Alibaba',
  moonshotai: 'Moonshot AI', moonshot: 'Moonshot AI', 'z-ai': 'Z.ai', zai: 'Z.ai', zhipu: 'Z.ai',
  'zhipu ai': 'Z.ai', minimax: 'MiniMax', xiaomi: 'Xiaomi', nvidia: 'NVIDIA', amazon: 'Amazon',
  microsoft: 'Microsoft', cohere: 'Cohere', baidu: 'Baidu', bytedance: 'ByteDance',
  'bytedance-seed': 'ByteDance', tencent: 'Tencent', ibm: 'IBM', 'ibm-granite': 'IBM', ai21: 'AI21',
  kimi: 'Moonshot AI', perplexity: 'Perplexity', inception: 'Inception', liquid: 'Liquid AI', stepfun: 'StepFun', 'stepfun-ai': 'StepFun',
  thinkingmachines: 'Thinking Machines', 'thinking-machines': 'Thinking Machines', 'arcee-ai': 'Arcee AI', 'nous': 'Nous Research', nousresearch: 'Nous Research',
};

export function empresa(id) {
  if (!id) return null;
  const k = String(id).toLowerCase().trim();
  return EMPRESAS[k] ?? String(id).replace(/(^|[-\s])\w/g, (c) => c.toUpperCase()).replace(/-/g, ' ');
}

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function buscar(url, opcoes = {}, tentativas = 3) {
  let ultimo;
  for (let i = 0; i < tentativas; i++) {
    try {
      const r = await fetch(url, { ...opcoes, signal: AbortSignal.timeout(60000) });
      if (!r.ok) throw new Error(`${url} -> HTTP ${r.status}`);
      return r;
    } catch (e) {
      ultimo = e;
      if (/HTTP 4\d\d/.test(e.message)) break; // erro do cliente não melhora tentando de novo
      await new Promise((ok) => setTimeout(ok, 1500 * (i + 1)));
    }
  }
  throw ultimo;
}

// CSV simples (sem aspas com vírgula dentro), suficiente para os arquivos do LiveBench.
export function lerCSV(texto) {
  const linhas = texto.trim().split(/\r?\n/);
  const cab = linhas.shift().split(',');
  return linhas.map((l) => Object.fromEntries(l.split(',').map((v, i) => [cab[i], v])));
}

// Empresa pelo começo do nome, para modelos que só aparecem no LiveBench (sem empresa).
const PREFIXOS = [
  [/^claude/, 'Anthropic'], [/^(gpt|o\d|chatgpt)/, 'OpenAI'], [/^(gemini|gemma)/, 'Google'], [/^grok/, 'xAI'],
  [/^(qwen|qwq)/, 'Alibaba'], [/^deepseek/, 'DeepSeek'], [/^kimi/, 'Moonshot AI'], [/^glm/, 'Z.ai'],
  [/^(mistral|magistral|devstral|codestral)/, 'Mistral'], [/^(nemotron|nvidia)/, 'NVIDIA'], [/^(llama|muse)/, 'Meta'],
  [/^minimax/, 'MiniMax'], [/^mimo/, 'Xiaomi'], [/^step/, 'StepFun'], [/^smaug/, 'Abacus.AI'],
];
export function empresaPorNome(c) {
  return PREFIXOS.find(([re]) => re.test(c))?.[1] ?? null;
}

// Família do modelo: a chave sem os números de versão. "claude-opus-4.6" e
// "claude-opus-5.5" são "claude-opus"; "gemini-3.7-flash" é "gemini-flash".
export function familia(c) {
  return c.split('-').map((t) => t.replace(/^v?\d+(\.\d+)*$/, '').replace(/^([a-z]+)\d+(\.\d+)*$/, '$1')).filter(Boolean).join('-');
}

// Número da versão para ordenar quando falta a data de lançamento: "claude-opus-4.6" -> 4.6.
export function versao(c) {
  const m = c.match(/(?:^|-)v?(\d+(?:\.\d+)?)(?:-|$)/) ?? c.match(/[a-z](\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : 0;
}
