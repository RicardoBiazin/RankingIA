// Visual "Instagram" da inicial do RankingIA: o ranking como um app de feed.
// Topo fixo (marca, busca, ícones), barra lateral (desktop) ou barra inferior (celular), faixa de
// "stories" com as empresas, carrossel de destaques (pódio), abas Ranking / Por categoria e cada
// modelo como um cartão de publicação. Sem JS tudo aparece em ordem de ranking; o JS liga busca,
// filtros, ordenação por categoria e favoritos (curtir, guardado só neste navegador).

import { head, esc, scripts } from '../_base.mjs';

export const meta = {
  nome: 'Feed de modelos',
  inspiracao: 'Instagram (instagram.com): feed, stories, carrossel, curtir',
  descricao: 'Empresas como stories que filtram, destaques em carrossel, abas Ranking e Por categoria e cada modelo como um cartão de publicação com nota, barras por categoria e coração para favoritar.',
};

const ID = 'instagram';
const NCORES = 12; // classes .c0 .. .c11 (cor da empresa)

// Ícones lineares próprios (viewBox 0 0 24 24).
const ICONES = {
  ranking: '<rect x="3" y="12" width="5" height="9" rx="1.2"/><rect x="9.5" y="4" width="5" height="17" rx="1.2"/><rect x="16" y="9" width="5" height="12" rx="1.2"/>',
  graficos: '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
  comparar: '<path d="M7 4L3 8l4 4"/><path d="M3 8h13"/><path d="M17 20l4-4-4-4"/><path d="M21 16H8"/>',
  metodologia: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/><path d="M9 8h6M9 12h4"/>',
  coracao: '<path d="M12 20.5s-8.500-5.200-9.800-10.600A5.300 5.300 0 0 1 12 6.800a5.300 5.300 0 0 1 9.800 3.100C20.500 15.300 12 20.500 12 20.500z"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  idioma: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.800 2.700 2.800 15.300 0 18M12 3c-2.800 2.700-2.800 15.300 0 18"/>',
  detalhes: '<path d="M9 5l7 7-7 7"/>',
  tudo: '<circle cx="6" cy="6" r="2.500"/><circle cx="18" cy="6" r="2.500"/><circle cx="6" cy="18" r="2.500"/><circle cx="18" cy="18" r="2.500"/><circle cx="12" cy="12" r="2.500"/>',
  estrela: '<path d="M12 3l2.700 5.600 6.100.8-4.500 4.200 1.100 6.100L12 16.800 6.600 19.700l1.100-6.100L3.200 9.400l6.100-.8z"/>',
  trofeu: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4"/><path d="M12 13v4M8 21h8M10 17h4"/>',
  moeda: '<circle cx="12" cy="12" r="9"/><path d="M14.500 9.200c-.5-.9-1.500-1.300-2.600-1.300-1.500 0-2.600.8-2.600 2 0 3 5.400 1.300 5.400 4.200 0 1.200-1.200 2-2.800 2-1.200 0-2.300-.5-2.800-1.500M12 6.500v1.400M12 16.100v1.400"/>',
  aberto: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.500-2"/>',
};
const ic = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONES[n]}</svg>`;

// A data em árabe vem com marcas RLM que embaralham o trecho; o span dir="ltr" resolve sem elas.
const limpaBidi = (s) => String(s).replace(/[‎‏؜]/g, '');
const inicial = (s) => (Array.from(String(s).trim())[0] ?? '?').toUpperCase();
// Miolo do avatar: logo original da empresa em círculo branco (classe .logo) ou, sem logo, a inicial.
const miolo = (logo, nome) => (logo
  ? `<span class="ini logo"><img src="${esc(logo)}" alt="" width="40" height="40" loading="lazy" decoding="async"></span>`
  : `<span class="ini">${esc(inicial(nome))}</span>`);
// Largura da barra: inteiro 0..100 (classe .wN no CSS, sem style inline).
const largura = (n) => (n == null ? 0 : Math.max(0, Math.min(100, Math.round(n))));

export function render(d) {
  const { t } = d;
  const iEmpresa = new Map(d.empresas.map((e, i) => [e, i]));
  const cor = (empresa) => (iEmpresa.has(empresa) ? `c${iEmpresa.get(empresa) % NCORES}` : 'cx');
  const qtd = new Map();
  for (const m of d.ranking) qtd.set(m.empresa, (qtd.get(m.empresa) ?? 0) + 1);
  for (const m of d.outros.lista) qtd.set(m.empresa, (qtd.get(m.empresa) ?? 0) + 1);
  // stories: empresas com mais modelos primeiro
  const empresasOrdem = [...d.empresas].sort((a, b) => (qtd.get(b) ?? 0) - (qtd.get(a) ?? 0) || a.localeCompare(b));
  const ordemMenu = { 'nav.ranking': 'ranking', 'nav.graficos': 'graficos', 'nav.comparar': 'comparar', 'nav.metodologia': 'metodologia' };

  const menu = d.menu.map((x) => `<a href="${esc(x.href)}">${ic(ordemMenu[x.chave] ?? 'ranking')}<span>${esc(x.rotulo)}</span></a>`).join('\n      ');

  const idiomaAtual = d.idiomas.find((i) => i.atual) ?? d.idiomas[0];
  const idiomas = `<details class="idioma" id="idioma">
      <summary aria-label="${esc(t('idioma.titulo'))}" title="${esc(t('idioma.titulo'))}">${ic('idioma')}<span>${esc(idiomaAtual.curto)}</span></summary>
      <ul>${d.idiomas.map((i) => `<li><a href="${esc(i.href)}" lang="${esc(i.codigo)}" hreflang="${esc(i.codigo)}"${i.atual ? ' aria-current="true"' : ''}>${esc(i.nome)}</a></li>`).join('')}</ul>
    </details>`;

  const stories = empresasOrdem.map((e) => `<li><button type="button" class="story ${cor(e)}" data-emp="${esc(e)}" aria-pressed="false"><span class="anel" aria-hidden="true">${miolo(d.logoEmpresa(e), e)}</span><span class="story-nome">${esc(e)}</span><span class="story-qtd">${qtd.get(e) ?? 0}</span></button></li>`).join('\n      ');

  const destaque = (p, n) => `<li class="destaque d${n % 4}"><a href="${esc(p.m.url)}">
        <span class="anel dest-avatar ${cor(p.m.empresa)}" aria-hidden="true">${miolo(p.m.logo, p.m.empresa || p.m.nome)}</span>
        <span class="dest-rotulo">${ic(['trofeu', 'moeda', 'aberto', 'estrela'][n % 4])}<span>${esc(p.rotulo)}</span></span>
        <span class="dest-nome">${esc(p.m.nome)}</span>
        <span class="dest-quem">${esc(p.m.empresa)}</span>
        <span class="dest-valor">${p.valor}</span></a></li>`;

  const barras = (m) => m.cats.map((c) => `<li class="cat-linha" data-cat="${esc(c.id)}" data-n="${c.nota == null ? '' : c.nota}" data-p="${c.pos ?? ''}"><span class="cat-nome">${esc(c.nome)}</span><span class="barra"><i class="w${largura(c.nota)}"></i></span><span class="cat-nota">${c.notaTxt}</span></li>`).join('\n          ');

  const post = (m) => {
    const c = cor(m.empresa);
    return `<article class="post ${c}" id="m-${esc(m.slug)}" data-slug="${esc(m.slug)}" data-pos="${m.pos}" data-emp="${esc(m.empresa)}" data-aberto="${m.aberto ? 1 : 0}" data-busca="${m.busca}">
      <header class="post-topo">
        <span class="anel avatar" aria-hidden="true">${miolo(m.logo, m.empresa || m.nome)}</span>
        <div class="post-quem">
          <h3 class="post-nome"><a href="${esc(m.url)}">${esc(m.nome)}</a></h3>
          <p class="post-sub">${m.empresa ? `<span>${esc(m.empresa)}</span> · ` : ''}<span dir="ltr">${esc(limpaBidi(m.lancamento))}</span></p>
        </div>
        <span class="pos" data-geral="#${m.pos}">#${m.pos}</span>
      </header>
      <figure class="placar">
        <span class="placar-nota"><strong class="nota-v" data-geral="${esc(m.notaTxt)}">${m.notaTxt}</strong><span class="nota-rot" data-geral="${esc(t('th.nota'))}">${esc(t('th.nota'))}</span></span>
        <span class="placar-extra">
          ${m.aberto ? `<span class="selo-aberto">${ic('aberto', 'ico-mini')}${esc(t('selo.aberto'))}</span>` : ''}
          ${m.elo != null ? `<span class="mini-dado" dir="ltr">${ic('estrela', 'ico-mini')}Elo ${m.elo}</span>` : ''}
          ${m.velocidade ? `<span class="mini-dado" dir="ltr">${esc(m.velocidade)}</span>` : ''}
        </span>
      </figure>
      <div class="acoes">
        <button type="button" class="curtir" aria-pressed="false" aria-label="${esc(m.nome)}" hidden>${ic('coracao', 'ico-coracao')}</button>
        <a class="acao" href="${esc(d.pre)}/comparar.html?m=${encodeURIComponent(m.slug)}">${ic('comparar')}<span>${esc(t('th.comparar'))}</span></a>
        <a class="acao detalhes" href="${esc(m.url)}" aria-label="${esc(m.nome)}">${ic('detalhes')}</a>
      </div>
      <ul class="cats">
          ${barras(m)}
      </ul>
      <dl class="legenda">
        <div><dt>${esc(t('th.entrada'))}</dt><dd>${m.precoEntrada}</dd></div>
        <div><dt>${esc(t('th.saida'))}</dt><dd>${m.precoSaida}</dd></div>
        <div><dt>${esc(t('th.contexto'))}</dt><dd dir="ltr">${esc(m.contexto)}</dd></div>
      </dl>
      <p class="por1m">${esc(t('por1m'))}</p>
    </article>`;
  };

  const outro = (m) => `<li class="outro ${cor(m.empresa)}" data-emp="${esc(m.empresa)}" data-aberto="${m.aberto ? 1 : 0}" data-busca="${m.busca}"><span class="anel mini" aria-hidden="true">${miolo(m.logo, m.empresa || m.nome)}</span><a href="${esc(m.url)}">${esc(m.nome)}</a><span class="outro-sub">${esc(m.empresa)}${m.elo != null ? ` · Elo ${m.elo}` : ''}${m.aberto ? ` · ${esc(t('selo.aberto'))}` : ''}</span></li>`;

  const chips = d.cats.map((c) => `<button type="button" class="chip" data-cat="${esc(c.id)}" aria-pressed="false" title="${esc(c.metricas)}">${esc(c.nome)}</button>`).join('\n        ');

  return head(ID, d) + `
<body>
<header class="topo">
  <div class="topo-in">
    <a class="marca" href="${esc(d.homePadrao)}">${d.logo}<strong>${esc(d.nomeSite)}</strong><span class="versao">v${esc(d.versao)}</span></a>
    <form class="busca" role="search" id="busca-form" hidden>
      ${ic('busca', 'ico-busca')}
      <label class="vh" for="busca">${esc(t('filtro.busca'))}</label>
      <input id="busca" type="search" placeholder="${esc(t('filtro.busca'))}" autocomplete="off" spellcheck="false">
    </form>
    <div class="ferramentas">
      ${d.moeda}
      ${idiomas}
      ${d.botaoTema}
    </div>
  </div>
</header>

<div class="corpo">
  <aside class="lateral">
    <nav class="menu" aria-label="${esc(t('nav.principal'))}">
      ${menu}
    </nav>
    <div class="visual-caixa">${d.seletor}</div>
  </aside>

  <main class="principal" id="conteudo">
    <section class="perfil" aria-labelledby="titulo">
      <span class="anel grande" aria-hidden="true"><span class="ini">${d.logo}</span></span>
      <div class="perfil-texto">
        <h1 id="titulo">${d.h1}</h1>
        <p class="intro">${d.intro}</p>
      </div>
    </section>

    <div class="stories-faixa" id="stories-faixa" hidden>
      <ul class="stories">
      <li><button type="button" class="story todas" data-emp="" aria-pressed="true"><span class="anel" aria-hidden="true"><span class="ini">${ic('tudo', 'ico-tudo')}</span></span><span class="story-nome">${esc(t('filtro.empresas'))}</span><span class="story-qtd">${d.total}</span></button></li>
      ${stories}
      </ul>
    </div>

    <ul class="destaques" aria-label="${esc(t('nav.ranking'))}">
      ${d.podio.map(destaque).join('\n      ')}
    </ul>

    <div class="abas-faixa" id="abas-faixa" hidden>
      <div class="abas" role="group" aria-label="${esc(t('nav.ranking'))}">
        <button type="button" class="aba" data-aba="geral" aria-pressed="true">${ic('ranking', 'ico-aba')}<span>${esc(t('nav.ranking'))}</span></button>
        <button type="button" class="aba" data-aba="cat" aria-pressed="false">${ic('estrela', 'ico-aba')}<span>${esc(t('mod.porCategoria'))}</span></button>
      </div>
      <div class="chips" id="chips" role="group" aria-label="${esc(t('categoria'))}" hidden>
        ${chips}
      </div>
      <div class="barra-filtro">
        <label class="vh" for="f-tipo">${esc(t('filtro.tipo'))}</label>
        <select id="f-tipo"><option value="">${esc(t('tipo.todos'))}</option><option value="1">${esc(t('tipo.abertos'))}</option><option value="0">${esc(t('tipo.fechados'))}</option></select>
        <button type="button" class="fav-filtro" id="fav-filtro" aria-pressed="false" aria-label="♥">${ic('coracao', 'ico-coracao')}<span id="fav-n">0</span></button>
        <span class="contagem" id="contagem" role="status" aria-live="polite"></span>
      </div>
    </div>

    <section class="feed-bloco" aria-labelledby="t-feed">
      <h2 id="t-feed" class="vh">${esc(t('js.rankingGeral'))}</h2>
      <div class="feed" id="feed">
      ${d.ranking.map(post).join('\n      ')}
      </div>
    </section>

    <details class="outros" id="outros">
      <summary><h2>${esc(t('outros.h2'))}</h2><span class="outros-n" id="outros-n">${d.outros.n}</span></summary>
      <p class="outros-texto">${d.outros.texto}</p>
      <ul class="outros-lista" id="outros-lista">
        ${d.outros.lista.map(outro).join('\n        ')}
      </ul>
    </details>
  </main>
</div>

<footer class="rodape">
  <div class="rodape-in">
    ${d.rodape}
    <p class="voltar"><a href="${esc(d.homePadrao)}">${esc(t('visual.rotulo'))}: ${esc(t('visual.padrao'))}</a></p>
  </div>
</footer>
${scripts(ID, d, ['filtro.js'])}
</body>
</html>
`;
}
