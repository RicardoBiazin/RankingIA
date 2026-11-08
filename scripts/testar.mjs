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
  { id: 'x', name: 'Modelo X (Xhigh)', slug: 'modelo-x-xhigh', model_creator: { name: 'OpenAI' }, evaluations: { artificial_analysis_intelligence_index: 68 }, pricing: { price_1m_input_tokens: 1, price_1m_output_tokens: 4 }, performance: { median_output_tokens_per_second: 120 } },
  { id: 'y', name: 'Modelo X (Max)', slug: 'modelo-x', model_creator: { name: 'OpenAI' }, evaluations: { artificial_analysis_intelligence_index: 70.2 }, pricing: { price_1m_input_tokens: 1, price_1m_output_tokens: 4 }, performance: { median_output_tokens_per_second: 100 } },
] });
conferir(aaTeste.length === 1 && aaTeste[0].chave === 'modelo-x' && aaTeste[0].nome === 'Modelo X', 'Artificial Analysis: modos do mesmo modelo viram uma chave');
conferir(aaTeste[0].inteligencia === 70.2 && aaTeste[0].velocidade === 100 && aaTeste[0].precoSaida === 4, 'Artificial Analysis: fica o melhor modo; velocidade vem de performance');

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
const { IDIOMAS, TEXTOS } = await import('../src/i18n.mjs');
// Traduções: todo texto nos 5 idiomas, sem vazio, com os mesmos {marcadores}.
const marcas = (x) => [...x.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
const ruins = Object.entries(TEXTOS).filter(([, v]) => v.length !== IDIOMAS.length || v.some((x) => !x) || v.some((x) => marcas(x) !== marcas(v[0]))).map(([k]) => k);
conferir(!ruins.length, `${Object.keys(TEXTOS).length} textos traduzidos nos ${IDIOMAS.length} idiomas ${ruins.slice(0, 5).join(' ')}`);
const paginas = [];
for (const i of IDIOMAS) {
  const pre = i.pasta ? i.pasta + '/' : '';
  paginas.push(...['index.html', 'graficos.html', 'comparar.html', 'metodologia.html', '404.html'].map((a) => pre + a), ...readdirSync(pub(pre + 'modelo')).map((a) => pre + 'modelo/' + a));
  conferir(d.modelos.every((m) => existsSync(pub(`${pre}modelo/${m.slug}.html`))), `${i.codigo}: uma página por modelo (${d.modelos.length})`);
  const html = readFileSync(pub(pre + 'index.html'), 'utf8');
  conferir(html.includes(`<html lang="${i.codigo}"`) && IDIOMAS.every((j) => html.includes(`hreflang="${j.codigo}"`)), `${i.codigo}: lang e hreflang dos ${IDIOMAS.length} idiomas`);
  conferir(existsSync(pub(`assets/t-${i.pasta || 'pt'}.js`)), `${i.codigo}: textos do navegador`);
  if (i.i > 0) {
    // Texto em português que não pode vazar para os outros idiomas.
    const vaza = ['Buscar modelo ou', 'Notas por fonte', 'Comparar com outros', 'Outros modelos (só', 'Mostrar categorias'].filter((x) => html.includes(x));
    conferir(!vaza.length, `${i.codigo}: sem texto em português na página inicial ${vaza.join(', ')}`);
  }
}
// Toda chave que o JavaScript do navegador pede tem de ir em window.T.
const { textosCliente } = await import('../src/i18n.mjs');
const doCliente = Object.keys(textosCliente(IDIOMAS[0]));
const pedidas = new Set(readdirSync(caminho('src/assets')).filter((a) => a.endsWith('.js')).flatMap((a) => [...readFileSync(caminho('src/assets/' + a), 'utf8').matchAll(/R\.t\('([\w.]+)'/g)].map((m) => m[1])));
const faltamCliente = [...pedidas].filter((k) => !doCliente.includes(k));
conferir(!faltamCliente.length, `${pedidas.size} textos pedidos pelo navegador estão em window.T ${faltamCliente.join(' ')}`);
let semVersao = [], inline = [], h1 = [], links = new Set(), quebrados = [], titulo = [];
for (const p of paginas) {
  const html = readFileSync(pub(p), 'utf8');
  if (!new RegExp(`<span class="versao" title="[^"]+">v${versao.replace(/\./g, '\.')}</span>`).test(html)) semVersao.push(p);
  // JSON-LD (type="application/ld+json") é dado, não roda: a CSP não o bloqueia.
  if (/\sstyle=/.test(html) || /<script(?![^>]*\b(?:src=|type="application\/ld\+json"))[^>]*>/.test(html) || /\son[a-z]+=/.test(html)) inline.push(p);
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) h1.push(p);
  if (!/<title>[^<]{6,90}<\/title>/.test(html) || !/<meta name="description" content="[^"]{20,}">/.test(html)) titulo.push(p);
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) links.add(m[1].split('?')[0]);
}
for (const l of links) {
  const alvo = l.endsWith('/') ? l.slice(1) + 'index.html' : l.slice(1);
  if (!existsSync(pub(alvo))) quebrados.push(l);
}
conferir(!semVersao.length, `versão v${versao} no cabeçalho de todas as ${paginas.length} páginas ${semVersao.slice(0, 3).join(' ')}`);
conferir(!inline.length, `sem style/script/handler inline (CSP) ${inline.slice(0, 3).join(' ')}`);
conferir(!h1.length, `um h1 por página ${h1.slice(0, 3).join(' ')}`);
conferir(!titulo.length, `title e description em todas ${titulo.slice(0, 3).join(' ')}`);
conferir(!quebrados.length, `${links.size} links internos existem ${quebrados.slice(0, 5).join(' ')}`);

const index = readFileSync(pub('index.html'), 'utf8');
conferir(/class="autonomo"/.test(index), 'rodapé avisa que coleta e resultados são autônomos');
// SEO da página inicial em cada idioma: title até 60, description 140–160 (o chinês é mais curto em caracteres),
// canonical próprio, Open Graph, x-default e JSON-LD WebSite.
const seoRuim = [];
for (const i of IDIOMAS) {
  const h = readFileSync(pub((i.pasta ? i.pasta + '/' : '') + 'index.html'), 'utf8');
  const tit = h.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const desc = [...(h.match(/<meta name="description" content="([^"]*)">/)?.[1] ?? '').replace(/&[a-z#0-9]+;/g, '_')].length;
  const url = `https://rankingia.biazin.com.br${i.pasta ? '/' + i.pasta : ''}/`;
  const ld = h.match(/<script type="application\/ld\+json">([^<]*)<\/script>/)?.[1];
  const ok = [...tit].length <= 60 && (i.pasta === 'zh' || (desc >= 140 && desc <= 160))
    && h.includes(`<link rel="canonical" href="${url}">`) && h.includes(`<meta property="og:url" content="${url}">`)
    && h.includes('<meta property="og:site_name" content="RankingIA">') && h.includes('hreflang="x-default" href="https://rankingia.biazin.com.br/"')
    && ld && JSON.parse(ld)['@type'] === 'WebSite' && JSON.parse(ld).url === url;
  if (!ok) seoRuim.push(`${i.codigo} (title ${[...tit].length}, description ${desc})`);
}
conferir(!seoRuim.length, `SEO da página inicial nos ${IDIOMAS.length} idiomas ${seoRuim.join(' ')}`);
conferir(/^Sitemap: https:\/\/rankingia\.biazin\.com\.br\/sitemap\.xml$/m.test(readFileSync(pub('robots.txt'), 'utf8')), 'robots.txt aponta para o sitemap');
const linhasRanking = index.split('<table class="tabela" id="ranking"')[1].split('</table>')[0].match(/<tr[^>]* data-busca/g)?.length;
conferir((d.categorias ?? []).length >= 5 && d.categorias.every((c) => index.includes(`data-cat="${c.id}"`)), `botões de ${d.categorias?.length} categorias`);
conferir(ranking.every((m) => Object.values(m.categorias ?? {}).every((v) => v >= 0 && v <= 100)), 'notas por categoria entre 0 e 100');
conferir(linhasRanking === ranking.length, `tabela do ranking com ${linhasRanking} linhas`);
const externos = [...index.matchAll(/<(?:script|link)[^>]+(?:src|href)="(https?:[^"]+)"/g)].map((m) => m[1]).filter((u) => !u.startsWith('https://rankingia.biazin.com.br') && !(PERFIL.cloudflareToken && u.startsWith('https://static.cloudflareinsights.com/')));
conferir(!externos.length, `sem script/estilo externo ${externos.join(' ')}`);
if (d.fontes.artificialanalysis?.coletadoEm) conferir(index.includes('href="https://artificialanalysis.ai/"'), 'citação da Artificial Analysis no rodapé (obrigatória)');
conferir(index.includes('<select id="moeda"') && /data-usd="/.test(index), 'seletor de moeda e preços marcados com data-usd');
if (d.cambio) {
  const { MOEDAS } = await import('../src/moedas.mjs');
  const faltam = MOEDAS.filter((m) => m.codigo !== 'USD' && !(d.cambio.taxas[m.codigo] > 0)).map((m) => m.codigo);
  conferir(!faltam.length && d.cambio.taxas.BRL > 1, `câmbio das ${MOEDAS.length - 1} moedas (R$ ${d.cambio.taxas.BRL}) ${faltam.join(' ')}`);
  conferir(index.includes(' data-cambio="{') && MOEDAS.every((m) => index.includes(`<option value="${m.codigo}"`)), 'câmbio no <html> e as 10 moedas no seletor');
}
const cliente = JSON.parse(readFileSync(pub('dados/ranking.json'), 'utf8'));
conferir(cliente.modelos.length === d.modelos.length && cliente.versao === versao, 'public/dados/ranking.json coerente');
conferir(existsSync(pub('vendor/chart.umd.min.js')), 'Chart.js local em /vendor');
const sitemap = readFileSync(pub('sitemap.xml'), 'utf8');
conferir((sitemap.match(/<loc>/g) ?? []).length === (d.modelos.length + 4) * IDIOMAS.length, `sitemap com as 4 páginas e todos os modelos nos ${IDIOMAS.length} idiomas`);
const toml = readFileSync(caminho('netlify.toml'), 'utf8');
conferir(/script-src 'self'/.test(toml) && !/unsafe-inline/.test(toml), "CSP do netlify.toml sem 'unsafe-inline'");
conferir(existsSync(caminho('CODE_OF_CONDUCT.md')), 'CODE_OF_CONDUCT.md na raiz (exigido pelo programa de código aberto da Netlify)');
conferir(readdirSync(caminho('public'), { recursive: true }).filter((n) => String(n).endsWith('.html')).every((n) => /href="https:\/\/www\.netlify\.com"[^>]*>This site is powered by Netlify</.test(readFileSync(caminho('public/' + n), 'utf8'))), 'todas as páginas têm o link "This site is powered by Netlify"');
// Agentes de IA (GEO): robots liberado, llms.txt com as páginas principais, llms-full.txt sem "undefined".
const { RASTREADORES_IA } = await import('../src/ia.mjs');
const robots = readFileSync(caminho('public/robots.txt'), 'utf8');
const llms = readFileSync(caminho('public/llms.txt'), 'utf8');
const llmsFull = readFileSync(caminho('public/llms-full.txt'), 'utf8');
conferir(RASTREADORES_IA.every((bot) => robots.includes(`User-agent: ${bot}
Allow: /`)), `robots.txt libera ${RASTREADORES_IA.length} rastreadores de IA`);
conferir(llms.startsWith('# RankingIA') && /^> /m.test(llms), 'llms.txt com título e resumo');
conferir(['/', '/graficos.html', '/comparar.html', '/metodologia.html'].every((r) => llms.includes(`https://rankingia.biazin.com.br${r}`)), 'llms.txt aponta para as páginas principais');
conferir(d.modelos.filter((m) => !m.parcial).sort((a, b) => b.nota - a.nota).slice(0, 25).every((m) => llms.includes(`/modelo/${m.slug}.html`)), 'llms.txt lista os 25 modelos de maior nota');
conferir(!/undefined|null|NaN/.test(llms + llmsFull), 'llms.txt e llms-full.txt sem undefined/null/NaN');
conferir(d.modelos.filter((m) => !m.parcial).every((m) => llmsFull.includes(`### ${m.nome}`)), 'llms-full.txt tem todos os modelos do ranking');
const gi = readFileSync(caminho('.gitignore'), 'utf8');
conferir(/^\.env$/m.test(gi), '.env no .gitignore');

console.log(falhas ? `\n${falhas} falha(s)` : '\ntudo ok');
process.exit(falhas ? 1 : 0);
