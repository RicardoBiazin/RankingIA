// Confere dados e site gerado: regras de nome, cálculo da nota, páginas, links
// internos, versão no cabeçalho, CSP (sem script/estilo inline) e sitemap.
// Uso: node scripts/testar.mjs

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { caminho, chave, lerJSON } from './util.mjs';
import { notas } from './fontes/livebench.mjs';
import { converter } from './fontes/artificialanalysis.mjs';
import { PERFIL } from '../src/perfil.mjs';

let falhas = 0;
const conferir = (ok, msg) => { console.log(`${ok ? 'ok   ' : 'FALHA'} ${msg}`); if (!ok) falhas++; };
const versao = JSON.parse(readFileSync(caminho('package.json'), 'utf8')).version;

// ---------- regras ----------
for (const [nome, esperado] of [
  ['Anthropic: Claude Opus 5.5', 'claude-opus-5.5'],
  ['anthropic/claude-opus-5.5', 'claude-opus-5.5'],
  ['Claude Opus 5.5 (High)', 'claude-opus-5.5'],
  ['DeepSeek-V4-Pro Preview (High)', 'deepseek-v4-pro'],
  ['Claude Opus 5.5 (Max, Default Fallback)', 'claude-opus-5.5'],
  ['DeepSeek-V4.1-Flash-20261017 (Max)', 'deepseek-v4.1-flash'],
  ['deepseek-v4.1-flash-1017', 'deepseek-v4.1-flash'],
  ['claude-opus-4-5-20251101-thinking-64k-high-effort', 'claude-opus-4-5-64k'],
  ['Qwen3-235B-A22B-Instruct (2507)', 'qwen3-235b-a22b'],
  ['google/gemma-4-31b-it', 'gemma-4-31b'],
  ['GPT-5.6 Sol (xHigh, Codex Harness)', 'gpt-5.6-sol'],
]) conferir(chave(nome) === esperado, `chave("${nome}") = ${chave(nome)}`);

const lbTeste = notas([{ model: 'a', x: '80', y: '60', z: '' }, { model: 'b', x: '50', y: '50', z: '10' }], { A: ['x'], B: ['y'], C: ['z'], _overall_weights: { A: 2 } });
conferir(lbTeste[0].geral === null && lbTeste[0].categorias.A === 80, 'LiveBench: modelo sem todas as categorias fica sem nota geral');
conferir(lbTeste[1].geral === 40, `LiveBench: média ponderada (2·50 + 50 + 10) / 4 = ${lbTeste[1].geral}`);

const aaTeste = converter({ data: [
  { id: 'x', name: 'Modelo X (Xhigh)', slug: 'modelo-x-xhigh', model_creator: { name: 'OpenAI' }, evaluations: { artificial_analysis_intelligence_index: 68, hle: 0.4 }, pricing: { price_1m_input_tokens: 1, price_1m_output_tokens: 4 }, median_output_tokens_per_second: 120 },
  { id: 'y', name: 'Modelo X (Max)', slug: 'modelo-x', model_creator: { name: 'OpenAI' }, evaluations: { artificial_analysis_intelligence_index: 70.2, hle: 0.456, gpqa: null }, pricing: { price_1m_input_tokens: 1, price_1m_output_tokens: 4 }, median_output_tokens_per_second: 100 },
] });
conferir(aaTeste.length === 1 && aaTeste[0].chave === 'modelo-x' && aaTeste[0].nome === 'Modelo X', 'Artificial Analysis: modos do mesmo modelo viram uma chave');
conferir(aaTeste[0].inteligencia === 70.2 && aaTeste[0].hle === 45.6 && aaTeste[0].gpqa === null && aaTeste[0].velocidade === 100, 'Artificial Analysis: fica o melhor modo; benchmarks em %');

// ---------- dados ----------
const d = lerJSON('dados/modelos.json');
conferir(d && Array.isArray(d.modelos), 'dados/modelos.json existe');
const ranking = d.modelos.filter((m) => !m.parcial);
conferir(ranking.length >= 10, `ranking geral com ${ranking.length} modelos (mínimo 10)`);
conferir(ranking.every((m, i) => m.posicao === i + 1), 'posições 1..n sem buraco');
conferir(ranking.every((m, i) => i === 0 || ranking[i - 1].nota >= m.nota), 'ranking em ordem decrescente de nota');
conferir(ranking.every((m) => m.nota >= 0 && m.nota <= 100), 'notas entre 0 e 100');
conferir(d.modelos.filter((m) => m.parcial).every((m) => m.nota === null && m.posicao === null), 'modelos fora do ranking sem nota nem posição');
conferir(d.modelos.every((m) => Object.values(m.percentis).every((p) => p >= 0 && p <= 100)), 'percentis entre 0 e 100');
const slugs = d.modelos.map((m) => m.slug);
conferir(new Set(slugs).size === slugs.length, 'slugs únicos');
conferir(slugs.every((s) => /^[a-z0-9.-]+$/.test(s)), 'slugs só com a-z 0-9 . -');
for (const [id, f] of Object.entries(d.fontes)) {
  if (id === 'artificialanalysis' && !f.coletadoEm) { console.log(`aviso Artificial Analysis desligada (${f.erro})`); continue; }
  conferir(Boolean(f.coletadoEm), `fonte ${id} tem dados (${f.ok ? 'ok' : 'snapshot antigo: ' + f.erro})`);
}
const candidatos = lerJSON('dados/candidatos-alias.json', []);
if (candidatos.length) console.log(`aviso ${candidatos.length} nomes sem par no OpenRouter mas parecidos (ver dados/candidatos-alias.json), ex.: ${candidatos.slice(0, 3).map((c) => `${c.chave} ~ ${c.parecidas[0]}`).join(', ')}`);

// ---------- site ----------
const pub = (rel) => caminho('public/' + rel);
const paginas = ['index.html', 'graficos.html', 'comparar.html', 'metodologia.html', '404.html', ...readdirSync(pub('modelo')).map((a) => 'modelo/' + a)];
conferir(d.modelos.every((m) => existsSync(pub(`modelo/${m.slug}.html`))), `uma página por modelo (${d.modelos.length})`);
let semVersao = [], inline = [], h1 = [], links = new Set(), quebrados = [], titulo = [];
for (const p of paginas) {
  const html = readFileSync(pub(p), 'utf8');
  if (!html.includes(`<span class="versao" title="Versão do site">v${versao}</span>`)) semVersao.push(p);
  if (/\sstyle=/.test(html) || /<script(?![^>]*\bsrc=)[^>]*>/.test(html) || /\son[a-z]+=/.test(html)) inline.push(p);
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) h1.push(p);
  if (!/<title>[^<]{10,90}<\/title>/.test(html) || !/<meta name="description" content="[^"]{40,}">/.test(html)) titulo.push(p);
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) links.add(m[1].split('?')[0]);
}
for (const l of links) {
  const alvo = l === '/' ? 'index.html' : l.slice(1);
  if (!existsSync(pub(alvo))) quebrados.push(l);
}
conferir(!semVersao.length, `versão v${versao} no cabeçalho de todas as ${paginas.length} páginas ${semVersao.slice(0, 3).join(' ')}`);
conferir(!inline.length, `sem style/script/handler inline (CSP) ${inline.slice(0, 3).join(' ')}`);
conferir(!h1.length, `um h1 por página ${h1.slice(0, 3).join(' ')}`);
conferir(!titulo.length, `title e description em todas ${titulo.slice(0, 3).join(' ')}`);
conferir(!quebrados.length, `${links.size} links internos existem ${quebrados.slice(0, 5).join(' ')}`);

const index = readFileSync(pub('index.html'), 'utf8');
const linhasRanking = index.split('<table class="tabela" id="ranking">')[1].split('</table>')[0].match(/<tr data-busca/g)?.length;
conferir(linhasRanking === ranking.length, `tabela do ranking com ${linhasRanking} linhas`);
const externos = [...index.matchAll(/<(?:script|link)[^>]+(?:src|href)="(https?:[^"]+)"/g)].map((m) => m[1]).filter((u) => !u.startsWith('https://rankingia.biazin.com.br') && !(PERFIL.cloudflareToken && u.startsWith('https://static.cloudflareinsights.com/')));
conferir(!externos.length, `sem script/estilo externo ${externos.join(' ')}`);
if (d.fontes.artificialanalysis?.coletadoEm) conferir(index.includes('href="https://artificialanalysis.ai/"'), 'citação da Artificial Analysis no rodapé (obrigatória)');
conferir(index.includes('<select id="moeda"') && /data-usd="/.test(index), 'seletor de moeda e preços marcados com data-usd');
if (d.cambio) conferir(d.cambio.BRL > 1 && d.cambio.EUR > 0.3 && index.includes(`data-cambio-brl="${d.cambio.BRL}"`), `câmbio no <html> (R$ ${d.cambio.BRL}, € ${d.cambio.EUR})`);
const cliente = JSON.parse(readFileSync(pub('dados/ranking.json'), 'utf8'));
conferir(cliente.modelos.length === d.modelos.length && cliente.versao === versao, 'public/dados/ranking.json coerente');
conferir(existsSync(pub('vendor/chart.umd.min.js')), 'Chart.js local em /vendor');
const sitemap = readFileSync(pub('sitemap.xml'), 'utf8');
conferir((sitemap.match(/<loc>/g) ?? []).length === d.modelos.length + 4, 'sitemap com as 4 páginas e todos os modelos');
const toml = readFileSync(caminho('netlify.toml'), 'utf8');
conferir(/script-src 'self'/.test(toml) && !/unsafe-inline/.test(toml), "CSP do netlify.toml sem 'unsafe-inline'");
const gi = readFileSync(caminho('.gitignore'), 'utf8');
conferir(/^\.env$/m.test(gi), '.env no .gitignore');

console.log(falhas ? `\n${falhas} falha(s)` : '\ntudo ok');
process.exit(falhas ? 1 : 0);
