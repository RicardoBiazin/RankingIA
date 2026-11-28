// Visual "Lens": busca visual estilo Google Lens / Google Imagens para o ranking de modelos de IA.
// Campo de busca grande e redondo, chips de filtro, "melhor correspondência" em destaque e uma grade
// de cartões com "visor" (cantos de enquadramento de câmera) onde o logo da empresa (ou a inicial, sem logo) ocupa o centro.
import { head, esc, scripts } from '../_base.mjs';

export const meta = {
  nome: 'Lens',
  inspiracao: 'Google Lens / Google Imagens',
  descricao: 'Busca visual: campo de busca redondo no topo, chips de categoria/tipo/empresa, melhor correspondência em destaque e mosaico de cartões com visor de câmera, notas com pontos verde/amarelo/vermelho e "outros modelos" como resultados relacionados.',
};

const NCORES = 12; // classes .c0..c11 (cor da empresa)

// Ícones (traço, viewBox 24). As cores dos cantos da lente vêm de classes do CSS (claro/escuro).
const svg = (cls, corpo) => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${corpo}</svg>`;
const LENTE = (cls) => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path class="lb" d="M3 8V5a2 2 0 0 1 2-2h3"/><path class="lv" d="M16 3h3a2 2 0 0 1 2 2v3"/><path class="la" d="M21 16v3a2 2 0 0 1-2 2h-3"/><path class="lg" d="M8 21H5a2 2 0 0 1-2-2v-3"/><circle class="lb" cx="12" cy="12" r="3.4"/></svg>`;
const LUPA = (cls) => svg(cls, '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>');
const FECHAR = (cls) => svg(cls, '<path d="M6 6l12 12M18 6L6 18"/>');
const GLOBO = (cls) => svg(cls, '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>');
const SETA = (cls) => svg(cls, '<path d="M15 5l-7 7 7 7"/>');

// Logo da empresa (m.logo = '/logos/x.svg' ou null). Sem logo: inicial colorida pela classe .cN.
const logoImg = (src) => `<img src="${esc(src)}" alt="" width="96" height="96" loading="lazy" decoding="async">`;
const inicial = (s) => (Array.from(s || '').find((c) => /[\p{L}\p{N}]/u.test(c)) ?? '?').toUpperCase();
// Faixas das notas (0 a 100): os quartis do ranking ficam perto de 27, 45 e 64.
const faixa = (v) => (v == null ? 'n-nd' : v >= 60 ? 'n-alta' : v >= 35 ? 'n-media' : 'n-baixa');

export function render(d) {
  const t = d.t;
  const corDe = (empresa) => { const i = d.empresas.indexOf(empresa); return i < 0 ? 'c-nd' : `c${i % NCORES}`; };

  const visor = (m, pos) => `<div class="visor" aria-hidden="true"><i class="q q1"></i><i class="q q2"></i><i class="q q3"></i><i class="q q4"></i>${m.logo ? `<span class="logo-ladrilho">${logoImg(m.logo)}</span>` : `<span class="ini">${esc(inicial(m.empresa))}</span>`}${pos != null ? `<span class="pos">#${pos}</span>` : ''}</div>`;
  const selo = (m) => (m.aberto ? ` <span class="selo" title="${esc(t('selo.aberto.titulo'))}">${t('selo.aberto')}</span>` : '');
  const dados = (m) => `<p class="un">${t('por1m')}</p>
<dl class="dados">
<div><dt>${t('th.entrada')}</dt><dd>${m.precoEntrada}</dd></div>
<div><dt>${t('th.saida')}</dt><dd>${m.precoSaida}</dd></div>
<div><dt>${t('th.contexto')}</dt><dd>${esc(m.contexto)}</dd></div>
<div><dt>${t('th.lancado')}</dt><dd>${esc(m.lancamento)}</dd></div>
</dl>`;

  // Cartão do mosaico (um modelo do ranking).
  const cartao = (m) => `<li class="card ${corDe(m.empresa)}" data-pos="${m.pos}" data-nota="${m.nota ?? ''}" data-aberto="${m.aberto ? 1 : 0}" data-empresa="${esc(m.empresa)}" data-busca="${m.busca}">
${visor(m, m.pos)}
<div class="corpo">
<h3 class="nome"><a href="${m.url}">${esc(m.nome)}</a></h3>
<p class="emp">${esc(m.empresa)}${selo(m)}</p>
<p class="nota"><span class="dot ${faixa(m.nota)}"></span><strong class="nota-v">${m.notaTxt}</strong><span class="nota-r"></span></p>
${dados(m)}
<details class="cats"><summary>${t('categoria')}</summary>
<ul>${m.cats.map((c) => `<li data-cat="${c.id}" data-nota="${c.nota ?? ''}" data-pos="${c.pos ?? ''}"><span class="dot ${faixa(c.nota)}"></span><span class="cn">${esc(c.nome)}</span><b>${c.notaTxt}</b></li>`).join('')}</ul>
</details>
</div>
</li>`;

  // "Melhor correspondência": o 1º do pódio é grande, os outros pequenos.
  const podio = d.podio.map((p, i) => {
    const m = p.m;
    return `<article class="card pd pd${i + 1} ${corDe(m.empresa)}">
${visor(m, m.pos ?? null)}
<div class="corpo">
<p class="rotulo">${esc(p.rotulo)}</p>
<h2 class="nome"><a href="${m.url}">${esc(m.nome)}</a></h2>
<p class="emp">${esc(m.empresa)}${selo(m)}</p>
<p class="nota"><span class="dot ${faixa(m.nota)}"></span><strong class="nota-v">${m.notaTxt}</strong></p>
<p class="valor">${p.valor}</p>
${i === 0 ? dados(m) : ''}
</div>
</article>`;
  }).join('\n');

  const chipsCat = [`<button type="button" class="chip" data-cat="todas" aria-pressed="true">${t('cat.todas')}</button>`,
    ...d.cats.map((c) => `<button type="button" class="chip" data-cat="${c.id}" data-rot="${esc(t('th.notaCat', { c: c.nome }))}" title="${esc(c.metricas)}" aria-pressed="false">${esc(c.nome)}</button>`)].join('\n');
  const chipsTipo = [['', 'tipo.todos', true], ['1', 'tipo.abertos', false], ['0', 'tipo.fechados', false]]
    .map(([v, k, on]) => `<button type="button" class="chip" data-tipo="${v}" aria-pressed="${on}">${t(k)}</button>`).join('\n');

  const outros = d.outros.lista.map((o) => `<li class="outro ${corDe(o.empresa)}" data-aberto="${o.aberto ? 1 : 0}" data-empresa="${esc(o.empresa)}" data-busca="${o.busca}"><a href="${o.url}">${o.logo ? `<span class="mini mini-logo">${logoImg(o.logo)}</span>` : `<span class="mini">${esc(inicial(o.empresa))}</span>`}<span class="o-txt"><span class="o-nome">${esc(o.nome)}</span><span class="o-emp">${esc(o.empresa)}</span></span>${o.elo != null ? `<span class="o-elo">Elo ${o.elo}</span>` : ''}</a></li>`).join('\n');

  const idiomas = `<details class="idiomas"><summary aria-label="${esc(t('idioma.titulo'))}" title="${esc(t('idioma.titulo'))}">${GLOBO('ico')}<span>${esc(d.idiomas.find((i) => i.atual)?.curto ?? '')}</span></summary>
<ul>${d.idiomas.map((i) => `<li><a href="${i.href}" lang="${i.codigo}" hreflang="${i.codigo}"${i.atual ? ' aria-current="true"' : ''}><span class="curto">${esc(i.curto)}</span>${esc(i.nome)}</a></li>`).join('')}</ul></details>`;

  return head('lens', d) + `
<body>
<header class="topo">
<div class="caixa topo-in">
<a class="marca" href="${d.homePadrao}">${LENTE('marca-ico')}<span>${esc(d.nomeSite)}</span><small>v${esc(d.versao)}</small></a>
<nav class="menu" aria-label="${esc(t('nav.principal'))}">${d.menu.map((a) => `<a href="${a.href}"${a.chave === 'nav.ranking' ? ' aria-current="page"' : ''}>${esc(a.rotulo)}</a>`).join('')}</nav>
<div class="ferramentas">${d.moeda}${idiomas}${d.botaoTema}</div>
<div class="visual-linha">${d.seletor}</div>
</div>
</header>

<main>
<section class="hero caixa" aria-labelledby="t-h1">
<h1 id="t-h1">${d.h1}</h1>
<p class="intro">${d.intro}</p>
<form class="busca" role="search" id="busca" action="#">
<label class="oculto" for="q">${t('filtro.busca')}</label>
${LUPA('busca-lupa')}
<input id="q" type="search" placeholder="${esc(t('filtro.busca'))}" autocomplete="off" spellcheck="false" enterkeyhint="search">
<button type="button" class="busca-limpar" id="q-limpar" aria-label="${esc(t('limpar'))}" hidden>${FECHAR('ico')}</button>
${LENTE('busca-lente')}
</form>
<div class="filtros" id="filtros">
<div class="chips" role="group" aria-label="${esc(t('categoria'))}">
${chipsCat}
</div>
<div class="chips chips2" role="group" aria-label="${esc(t('filtro.tipo'))}">
${chipsTipo}
<label class="chip-sel"><span class="oculto">${t('filtro.empresa')}</span><select id="f-empresa"><option value="">${t('filtro.empresas')}</option>${d.empresas.map((e) => `<option value="${esc(e)}">${esc(e)}</option>`).join('')}</select></label>
<span class="contagem" id="contagem" aria-live="polite"></span>
</div>
</div>
</section>

<div class="caixa">
<section class="melhor" id="melhor" aria-label="${esc(d.podio[0]?.rotulo ?? '')}">
<div class="podio-grade">
${podio}
</div>
</section>

<section class="resultados" aria-labelledby="t-res">
<div class="res-cab"><h2 id="t-res">${t('js.rankingGeral')}</h2><span class="res-n">${d.total}</span></div>
<ol class="mosaico" id="mosaico">
${d.ranking.map(cartao).join('\n')}
</ol>
<div class="vazio" id="vazio" hidden>${LENTE('vazio-ico')}<button type="button" class="chip" id="vazio-limpar">${t('limpar')}</button></div>
</section>

<details class="relacionados" id="outros-det">
<summary><h2>${t('outros.h2')}</h2><span class="res-n" id="outros-n">${d.outros.n}</span></summary>
<p class="outros-texto">${d.outros.texto}</p>
<ul class="outros-lista" id="outros-lista">
${outros}
</ul>
</details>
</div>
</main>

<div class="caixa voltar-linha"><a class="voltar" href="${d.homePadrao}" title="${esc(t('visual.titulo'))}">${SETA('ico seta')}<span>${t('visual.padrao')}</span></a></div>
${d.rodape.trimStart().startsWith('<footer') ? d.rodape.trimStart().replace('<footer', '<footer class="rodape"') : `<footer class="rodape">${d.rodape}</footer>`}
${scripts('lens', d, ['filtro.js'])}
</body>
</html>
`;
}
