// Moldura comum das páginas: cabeçalho com versão, menu, tema e rodapé com as fontes.

import { esc } from '../scripts/util.mjs';
import { FONTES } from './pesos.mjs';
import { PERFIL } from './perfil.mjs';

export const SITE = 'https://rankingia.biazin.com.br';

const LOGO = '<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#2a78d6"/><rect x="7" y="17" width="4.5" height="8" rx="1.5" fill="#fff"/><rect x="13.75" y="8" width="4.5" height="17" rx="1.5" fill="#fff"/><rect x="20.5" y="13" width="4.5" height="12" rx="1.5" fill="#fff"/></svg>';
const SOL_LUA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

const MENU = [
  ['/', 'Ranking'],
  ['/graficos.html', 'Gráficos'],
  ['/comparar.html', 'Comparar'],
  ['/metodologia.html', 'Metodologia'],
];

export const dataHora = (iso) => iso ? new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }) : '—';
export const dataBR = (iso) => iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '—';

export function rodapeFontes(fontes) {
  const partes = [];
  for (const [id, f] of Object.entries(fontes)) {
    if (!f.coletadoEm) continue;
    const info = FONTES[id];
    let extra = '';
    if (id === 'livebench' && f.release) extra = ` (release ${dataBR(f.release)})`;
    if (id === 'lmarena' && f.datas?.texto) extra = ` (placar de ${dataBR(f.datas.texto)})`;
    partes.push(`<a href="${info.url}" rel="noopener">${esc(info.nome)}</a>${extra}`);
  }
  const falhas = Object.entries(fontes).filter(([, f]) => !f.ok && f.coletadoEm).map(([id, f]) => `${FONTES[id].nome} não respondeu na última coleta; valem os dados de ${dataHora(f.coletadoEm)}`);
  return { partes, falhas };
}

export function pagina({ titulo, descricao, caminho, conteudo, scripts = [], versao, dados, noindex = false }) {
  const { partes, falhas } = rodapeFontes(dados.fontes);
  const usaAA = dados.fontes.artificialanalysis?.coletadoEm;
  const url = SITE + caminho;
  const nav = MENU.map(([href, nome]) => `<a href="${href}"${href === caminho || (href === '/' && caminho === '/index.html') ? ' aria-current="page"' : ''}>${nome}</a>`).join('');
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}<meta property="og:type" content="website">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="pt_BR">
<meta name="theme-color" content="#2a78d6">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/estilo.css?v=${versao}">
<script src="/assets/tema.js?v=${versao}"></script>
</head>
<body>
<header class="topo">
<div class="conteudo">
<a class="marca" href="/">${LOGO}RankingIA</a>
<span class="versao" title="Versão do site">v${esc(versao)}</span>
<nav class="menu" aria-label="Principal">${nav}</nav>
<button class="tema" type="button" id="tema" title="Alternar tema claro/escuro" aria-label="Alternar tema claro/escuro">${SOL_LUA}</button>
</div>
</header>
<main class="conteudo">
${conteudo}
</main>
<footer class="rodape">
<div class="conteudo">
<p>Dados: ${partes.join(' · ')}. Atualizado em ${dataHora(dados.geradoEm)}.${usaAA ? ' Índices, preços e velocidade da <a href="https://artificialanalysis.ai/" rel="noopener">Artificial Analysis</a>.' : ''}</p>
${falhas.length ? `<p class="fontes-falha">${falhas.map(esc).join('. ')}.</p>\n` : ''}<p>RankingIA v${esc(versao)} · feito por <a href="https://biazin.com.br/">${esc(PERFIL.nome)}</a> · <a href="https://github.com/RicardoBiazin/RankingIA" rel="noopener">código aberto (MIT)</a> · <a href="/metodologia.html">como a nota é calculada</a></p>
</div>
</footer>
${scripts.map((s) => `<script src="${s}?v=${versao}"></script>`).join('\n')}
${PERFIL.cloudflareToken ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${PERFIL.cloudflareToken}"}'></script>\n` : ''}</body>
</html>
`;
}
