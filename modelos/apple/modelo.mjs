// Visual "Apple" da inicial: navegação fina de vidro, tipografia grande, pódio em grade "bento",
// ranking em linhas largas com divisores finos e controle segmentado de categoria.
import { head, esc, scripts } from '../_base.mjs';

export const meta = {
  nome: 'Apple',
  inspiracao: 'apple.com',
  descricao: 'Barra de vidro, muito espaço em branco, títulos enormes, pódio bento com cartões de cantos grandes, lista limpa com divisores finos e controle segmentado de categorias.',
};

const SETA = '<span class="seta" aria-hidden="true"></span>';
const LUPA = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>';
const GLOBO = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 3.9 5.7 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.7-3.9-9S9.4 5.7 12 3z"/></svg>';

export function render(d) {
  const { t } = d;
  const ta = (k, v) => esc(t(k, v));
  const cor = (empresa) => {
    const i = d.empresas.indexOf(empresa);
    return 'c' + (i < 0 ? 0 : i % 12);
  };
  // Logo original da empresa sobre ladrilho branco; sem logo, a inicial com cor por classe.
  const avatar = (empresa, logo, extra = '') => {
    const src = logo !== undefined ? logo : d.logoEmpresa(empresa);
    if (src) return `<span class="av av-img${extra}" aria-hidden="true"><img src="${esc(src)}" alt="" width="24" height="24" loading="lazy" decoding="async"></span>`;
    return `<span class="av ${cor(empresa)}${extra}" aria-hidden="true">${esc(Array.from(empresa || '·')[0].toUpperCase())}</span>`;
  };
  const selo = (m) => (m.aberto ? `<span class="selo" title="${ta('selo.aberto.titulo')}">${t('selo.aberto')}</span>` : '');
  const preco = (m) => `${m.precoEntrada} / ${m.precoSaida}`;
  const porMilhao = `${t('th.entrada')} / ${t('th.saida')} · ${t('por1m')}`;

  const [lider, ...resto] = d.podio;
  const cartaoLider = lider ? `
<article class="bento b0">
<p class="rot">${esc(lider.rotulo)}</p>
<h2><a class="nome-grande" href="${lider.m.url}">${esc(lider.m.nome)}</a></h2>
<p class="emp">${avatar(lider.m.empresa, lider.m.logo)}<span>${esc(lider.m.empresa)}</span>${selo(lider.m)}</p>
<p class="nota-gigante" aria-label="${esc(t('nota.n', { n: lider.m.notaTxt }))}"><span>${lider.m.notaTxt}</span><small>/100</small></p>
<dl class="fatos">
<div><dt>${t('th.entrada')} / ${t('th.saida')}</dt><dd>${preco(lider.m)} <small>${t('por1m')}</small></dd></div>
<div><dt>${t('th.contexto')}</dt><dd>${esc(lider.m.contexto)}</dd></div>
<div><dt>${t('th.lancado')}</dt><dd>${esc(lider.m.lancamento)}</dd></div>
</dl>
</article>` : '';
  const cartoes = resto.map((p, i) => `
<article class="bento b${i + 1}">
<p class="rot">${esc(p.rotulo)}</p>
<h2><a class="nome-medio" href="${p.m.url}">${esc(p.m.nome)}</a></h2>
<p class="emp">${avatar(p.m.empresa, p.m.logo)}<span>${esc(p.m.empresa)}</span>${selo(p.m)}</p>
<p class="valor">${p.valor}</p>
</article>`).join('');

  const linha = (m, i) => `
<li class="lin" data-i="${i}" data-pos="${m.pos}" data-aberto="${m.aberto ? 1 : 0}" data-emp="${esc(m.empresa)}" data-busca="${m.busca}">
<span class="l-pos">${m.pos}</span>
<div class="l-modelo">${avatar(m.empresa, m.logo)}<div class="l-nomes"><a class="l-nome" href="${m.url}">${esc(m.nome)}</a><span class="l-emp">${esc(m.empresa)}${selo(m)}</span></div></div>
<div class="l-nota"><span class="num" data-geral="${m.notaTxt}">${m.notaTxt}</span><progress class="barra" max="100" value="${m.nota ?? 0}" data-geral="${m.nota ?? 0}" aria-hidden="true"></progress></div>
<div class="l-meta"><div class="l-preco"><span>${preco(m)}</span><small>${t('por1m')}</small></div>
<span class="l-ctx" data-rot="${ta('th.contexto')}">${esc(m.contexto)}</span>
<span class="l-data" data-rot="${ta('th.lancado')}">${esc(m.lancamento)}</span></div>
<details class="l-cats"><summary>${t('categoria')}</summary>
<ul class="cats-grade">${m.cats.map((c) => `<li data-c="${esc(c.id)}" data-v="${c.nota ?? ''}" data-p="${c.pos ?? ''}"><span>${esc(c.nome)}</span><b>${c.notaTxt}</b></li>`).join('')}</ul>
</details>
</li>`;

  const outro = (o) => `<li data-aberto="${o.aberto ? 1 : 0}" data-emp="${esc(o.empresa)}" data-busca="${o.busca}">${o.empresa || o.logo ? avatar(o.empresa, o.logo, ' mini') : ''}<div class="o-txt"><a href="${o.url}">${esc(o.nome)}</a><span>${esc(o.empresa)}${o.elo != null ? ` · Elo ${o.elo}` : ''}${selo(o)}</span></div></li>`;

  const outrosTags = d.menu.filter((x) => x.chave !== 'nav.ranking');

  return head('apple', d) + `
<body>
<a class="pular" href="#ranking">${t('nav.ranking')}</a>
<header class="nav">
<div class="nav-in">
<a class="marca" href="${d.homePadrao}"><span class="logo">${d.logo}</span><strong>${esc(d.nomeSite)}</strong><span class="ver-site">v${esc(d.versao)}</span></a>
<nav class="menu" aria-label="${ta('nav.principal')}">${d.menu.map((x) => `<a href="${x.href}"${x.chave === 'nav.ranking' ? ' aria-current="page"' : ''}>${esc(x.rotulo)}</a>`).join('')}</nav>
<div class="ferr">
${d.moeda}
<details class="idioma"><summary aria-label="${ta('visual.titulo')}">${GLOBO}<span>${esc(d.idiomas.find((i) => i.atual)?.curto ?? '')}</span></summary>
<ul>${d.idiomas.map((i) => `<li><a href="${i.href}" lang="${esc(i.codigo)}" hreflang="${esc(i.codigo)}"${i.atual ? ' aria-current="true"' : ''}>${esc(i.nome)}</a></li>`).join('')}</ul>
</details>
${d.botaoTema}
</div>
</div>
</header>

<main>
<section class="hero">
<div class="visual-barra">${d.seletor}</div>
<h1>${esc(d.h1)}</h1>
<p class="intro">${d.intro}</p>
<p class="atalhos">${outrosTags.map((x) => `<a href="${x.href}">${esc(x.rotulo)}${SETA}</a>`).join('')}</p>
</section>

<section class="podio" aria-label="${ta('nav.ranking')}">
<div class="bento-grade">${cartaoLider}${cartoes}
</div>
</section>

<section class="ranking" id="ranking">
<div class="cab-ranking">
<h2>${t('caption.ranking', { n: d.total })}</h2>
<label class="spot js-so" hidden><span class="so-leitor">${ta('filtro.busca')}</span>${LUPA}<input type="search" id="busca" autocomplete="off" placeholder="${ta('filtro.busca')}"></label>
</div>
<div class="filtros js-so" hidden>
<label class="sel"><span class="so-leitor">${ta('filtro.empresa')}</span><select id="empresa"><option value="">${t('filtro.empresas')}</option>${d.empresas.map((e) => `<option value="${esc(e)}">${esc(e)}</option>`).join('')}</select></label>
<div class="seg seg-pq" id="seg-tipo" role="group" aria-label="${ta('filtro.tipo')}">
<button type="button" data-tipo="" aria-pressed="true">${t('tipo.todos')}</button><button type="button" data-tipo="1" aria-pressed="false">${t('tipo.abertos')}</button><button type="button" data-tipo="0" aria-pressed="false">${t('tipo.fechados')}</button>
</div>
<div class="seg seg-pq" id="seg-lim" role="group" aria-label="${ta('mostrar.titulo')}">
<button type="button" data-lim="10" aria-pressed="false">10</button><button type="button" data-lim="25" aria-pressed="false">25</button><button type="button" data-lim="0" aria-pressed="true">${t('todos')}</button>
</div>
<span class="contagem" id="contagem" aria-live="polite"></span>
</div>
<div class="cat-barra js-so" hidden>
<div class="seg seg-cat" id="seg-cat" role="group" aria-label="${ta('categoria')}">
<button type="button" data-cat="" aria-pressed="true">${t('cat.todas')}</button>${d.cats.map((c) => `<button type="button" data-cat="${esc(c.id)}" aria-pressed="false">${esc(c.nome)}</button>`).join('')}
</div>
</div>
<div class="cabeca-lista" aria-hidden="true">
<span>${t('th.posicao')}</span><span>${t('th.modelo')}</span><span>${t('th.nota')}</span><span>${esc(porMilhao)}</span><span>${t('th.contexto')}</span><span>${t('th.lancado')}</span>
</div>
<ol class="lista" id="lista">${d.ranking.map(linha).join('')}
</ol>
</section>

<section class="outros">
<details id="outros">
<summary><h2>${t('outros.h2')}</h2><span class="qtd">${d.outros.n}</span></summary>
<p class="outros-texto">${esc(d.outros.texto)}</p>
<ul class="outros-lista" id="outros-lista">${d.outros.lista.map(outro).join('')}</ul>
</details>
</section>
</main>

<footer class="rodape">
<div class="rodape-in">
${d.rodape}
<p class="voltar"><a href="${d.homePadrao}">${t('visual.rotulo')}: ${t('visual.padrao')}${SETA}</a></p>
</div>
</footer>
${scripts('apple', d, ['filtro.js'])}
</body>
</html>
`;
}
