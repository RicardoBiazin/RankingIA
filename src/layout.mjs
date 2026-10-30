// Moldura comum das páginas: cabeçalho com versão, menu, moeda, idioma e tema;
// rodapé com as fontes. Cada página existe em todos os idiomas (src/i18n.mjs).

import { esc } from '../scripts/util.mjs';
import { FONTES } from './pesos.mjs';
import { PERFIL } from './perfil.mjs';
import { MOEDAS } from './moedas.mjs';
import { IDIOMAS } from './i18n.mjs';

export const SITE = 'https://rankingia.biazin.com.br';

const LOGO = '<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#2a78d6"/><rect x="7" y="17" width="4.5" height="8" rx="1.5" fill="#fff"/><rect x="13.75" y="8" width="4.5" height="17" rx="1.5" fill="#fff"/><rect x="20.5" y="13" width="4.5" height="12" rx="1.5" fill="#fff"/></svg>';
const SOL_LUA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

const MENU = [['/', 'nav.ranking'], ['/graficos.html', 'nav.graficos'], ['/comparar.html', 'nav.comparar'], ['/metodologia.html', 'nav.metodologia']];

// Prefixo de URL do idioma: '' para o português, '/en' etc.
export const prefixo = (idioma) => (idioma.pasta ? '/' + idioma.pasta : '');

export function formatos(idioma) {
  const loc = idioma.locale;
  return {
    data: (iso) => iso ? new Date(iso.slice(0, 10) + 'T12:00:00Z').toLocaleDateString(loc, { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }) : '—',
    dataHora: (iso) => iso ? new Date(iso).toLocaleString(loc, { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }) : '—',
    nf: (v, casas = 1) => v == null ? '—' : Number(v).toLocaleString(loc, { minimumFractionDigits: casas, maximumFractionDigits: casas }),
  };
}

export function pagina({ idioma, t, rel, titulo, descricao, conteudo, scripts = [], versao, dados, noindex = false, jsonLd = null }) {
  const pre = prefixo(idioma);
  const { data, dataHora } = formatos(idioma);
  const url = (i, r = rel) => SITE + prefixo(i) + r;
  const nav = MENU.map(([href, chave]) => `<a href="${pre}${href}"${href === rel ? ' aria-current="page"' : ''}>${t(chave)}</a>`).join('');
  const idiomas = IDIOMAS.map((i) => `<li><a href="${prefixo(i)}${rel}" hreflang="${i.codigo}" lang="${i.codigo}"${i === idioma ? ' aria-current="true"' : ''}>${esc(i.nome)}</a></li>`).join('');
  const alternativos = IDIOMAS.map((i) => `<link rel="alternate" hreflang="${i.codigo}" href="${url(i)}">`).join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${url(IDIOMAS[0])}">`;

  const partes = [];
  for (const [id, f] of Object.entries(dados.fontes)) {
    if (!f.coletadoEm || id === 'cambio') continue;
    let extra = '';
    if (id === 'livebench' && f.release) extra = ` (${t('rodape.release', { d: data(f.release) })})`;
    if (id === 'lmarena' && f.datas?.texto) extra = ` (${t('rodape.placar', { d: data(f.datas.texto) })})`;
    partes.push(`<a href="${FONTES[id].url}" rel="noopener">${esc(FONTES[id].nome)}</a>${extra}`);
  }
  const falhas = Object.entries(dados.fontes).filter(([, f]) => !f.ok && f.coletadoEm).map(([id, f]) => t('rodape.falha', { f: FONTES[id].nome, d: dataHora(f.coletadoEm) }));
  const usaAA = dados.fontes.artificialanalysis?.coletadoEm;
  const taxas = dados.cambio?.taxas;
  const cambio = taxas ? t('rodape.cambio', {
    l: '<a href="https://frankfurter.dev/" rel="noopener">Frankfurter</a>',
    d: data(dados.cambio.data),
    lista: 'US$ 1 = ' + MOEDAS.filter((m) => taxas[m.codigo]).map((m) => `${m.simbolo} ${taxas[m.codigo].toLocaleString(idioma.locale, { maximumFractionDigits: 4 })}`).join(' · '),
  }) : '';
  const arq = idioma.pasta || 'pt';

  return `<!doctype html>
<html lang="${idioma.codigo}"${taxas ? ` data-cambio="${esc(JSON.stringify(taxas))}"` : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<link rel="canonical" href="${url(idioma)}">
${alternativos}
${noindex ? '<meta name="robots" content="noindex">\n' : ''}<meta property="og:type" content="website">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url(idioma)}">
<meta property="og:locale" content="${idioma.og}">
${IDIOMAS.filter((i) => i !== idioma).map((i) => `<meta property="og:locale:alternate" content="${i.og}">`).join('\n')}
<meta property="og:site_name" content="RankingIA">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(descricao)}">
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>\n` : ''}<meta name="theme-color" content="#2a78d6">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/estilo.css?v=${versao}">
<script src="/assets/t-${arq}.js?v=${versao}"></script>
<script src="/assets/tema.js?v=${versao}"></script>
<script src="/assets/moeda.js?v=${versao}"></script>
</head>
<body>
<header class="topo">
<div class="conteudo">
<a class="marca" href="${pre}/">${LOGO}RankingIA</a>
<span class="versao" title="${esc(t('versao.titulo'))}">v${esc(versao)}</span>
<nav class="menu" aria-label="${esc(t('nav.principal'))}">${nav}</nav>
<label class="oculto" for="moeda">${esc(t('moeda.titulo'))}</label>
<select id="moeda" class="moeda" title="${esc(t('moeda.titulo'))}">${MOEDAS.map((m) => `<option value="${m.codigo}" data-curto="${esc(m.simbolo)}" data-longo="${esc(`${m.simbolo} · ${m.nome}`)}">${esc(m.simbolo)}</option>`).join('')}</select>
<details class="idiomas"><summary title="${esc(t('idioma.titulo'))}" aria-label="${esc(t('idioma.titulo'))}">${esc(idioma.curto)}</summary><ul>${idiomas}</ul></details>
<button class="tema" type="button" id="tema" title="${esc(t('tema.titulo'))}" aria-label="${esc(t('tema.titulo'))}">${SOL_LUA}</button>
</div>
</header>
<main class="conteudo">
${conteudo}
</main>
<footer class="rodape">
<div class="conteudo">
<p>${t('rodape.dados')}: ${partes.join(' · ')}. ${t('rodape.atualizado', { d: dataHora(dados.geradoEm) })}${usaAA ? ' ' + t('rodape.aa', { l: '<a href="https://artificialanalysis.ai/" rel="noopener">Artificial Analysis</a>' }) : ''}</p>
<p class="autonomo">${t('rodape.autonomo')}</p>
${cambio ? `<p>${cambio}</p>\n` : ''}${falhas.length ? `<p class="fontes-falha">${falhas.map(esc).join('. ')}.</p>\n` : ''}<p>RankingIA v${esc(versao)} · ${t('rodape.feito')} <a href="https://biazin.com.br/">${esc(PERFIL.nome)}</a> · <a href="https://github.com/RicardoBiazin/RankingIA" rel="noopener">${t('rodape.codigo')}</a> · <a href="${pre}/metodologia.html">${t('rodape.como')}</a></p>
</div>
</footer>
${scripts.map((s) => `<script src="${s}?v=${versao}"></script>`).join('\n')}
${PERFIL.cloudflareToken ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${PERFIL.cloudflareToken}"}'></script>\n` : ''}</body>
</html>
`;
}
