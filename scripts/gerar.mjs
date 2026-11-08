// Gera o site estático em public/ a partir de dados/modelos.json, em todos os idiomas
// de src/i18n.mjs (português na raiz, os outros em /en, /es, /fr, /zh):
// ranking, gráficos, comparar, metodologia, uma página por modelo, sitemap e o JSON do cliente.
// Uso: node scripts/gerar.mjs

import { readFileSync, readdirSync, rmSync, copyFileSync, mkdirSync } from 'node:fs';
import { caminho, chave, esc, gravarJSON, gravarTexto, lerJSON } from './util.mjs';
import { pagina, prefixo, formatos, SITE } from '../src/layout.mjs';
import { FONTES, PESO_NEUTRO } from '../src/pesos.mjs';
import { formatar } from '../src/moedas.mjs';
import { IDIOMAS, tradutor, textosCliente } from '../src/i18n.mjs';
import { METODOLOGIA, METODOLOGIA_TITULO, STATUS_CAB } from '../src/metodologia.mjs';
import { PERFIL } from '../src/perfil.mjs';
import { robotsTxt, llmsTxt, llmsFullTxt } from '../src/ia.mjs';

const versao = JSON.parse(readFileSync(caminho('package.json'), 'utf8')).version;
const dados = lerJSON('dados/modelos.json');
if (!dados) throw new Error('rode antes: node scripts/normalizar.mjs');
const { modelos, metricas } = dados;
const ranking = modelos.filter((m) => !m.parcial);
const outros = modelos.filter((m) => m.parcial);
const ponderadas = metricas.filter((m) => m.peso > 0);
const categorias = metricas.filter((m) => m.categoria);
const extras = metricas.filter((m) => m.peso === 0 && !m.categoria);
const met = Object.fromEntries(metricas.map((m) => [m.id, m]));
const cats = dados.categorias ?? [];
// Em quais categorias cada métrica aparece; 'todas' = visão padrão (métricas com peso >= 1).
const catsDe = (id) => [...(met[id]?.peso >= 1 ? ['todas'] : []), ...cats.filter((c) => c.metricas.includes(id)).map((c) => c.id)].join(' ');
const colunasMetricas = [...ponderadas, ...categorias, ...extras].filter((x) => catsDe(x.id));
const arenaIds = ['arena_texto', 'arena_webdev', 'arena_visao'].filter((id) => met[id]);

rmSync(caminho('public'), { recursive: true, force: true });

// ---------- dados que não dependem do idioma ----------
const nv = (v) => v == null ? '' : v; // data-v vazio vai para o fim na ordenação
const historicoNota = {};
const historicoModelo = {}; // chave -> { dias, nota, pos }
for (const arq of readdirSync(caminho('dados/historico')).filter((a) => /^\d{4}-\d{2}-\d{2}\.json$/.test(a)).sort()) {
  const dia = arq.slice(0, 10), snap = lerJSON(`dados/historico/${arq}`);
  historicoNota[dia] = Object.fromEntries(Object.entries(snap).map(([k, v]) => [k, v[0]]));
  for (const [k, [nota, pos]] of Object.entries(snap)) {
    const h = (historicoModelo[k] ??= { dias: [], nota: [], pos: [] });
    h.dias.push(dia); h.nota.push(nota); h.pos.push(pos);
  }
}
const lb = lerJSON('dados/brutos/livebench.json');
const aliases = lerJSON('dados/aliases.json', {});

// Famílias: versões do mesmo modelo em ordem de lançamento (sem data, pela versão).
const familias = {};
for (const m of modelos) (familias[m.familia] ??= []).push(m);
for (const lista of Object.values(familias)) {
  lista.sort((a, b) => (a.lancamento && b.lancamento ? (a.lancamento < b.lancamento ? -1 : a.lancamento > b.lancamento ? 1 : 0) : 0) || a.versao - b.versao);
}

gravarJSON('public/dados/ranking.json', {
  versao,
  geradoEm: dados.geradoEm,
  fontes: dados.fontes,
  metricas,
  modelos: modelos.map((m) => ({
    c: m.chave, s: m.slug, n: m.nome, e: m.empresa, a: m.aberto, l: m.lancamento, ctx: m.contexto,
    pi: m.precoEntrada, po: m.precoSaida, v: m.velocidade, t: m.ttft, nota: m.nota, pos: m.posicao, cob: m.cobertura,
    m: m.metricas, p: m.percentis,
  })),
  historicoNota,
  // As chaves do histórico vêm da coleta; aplica os apelidos atuais.
  historicoLiveBench: (lb?.historico ?? []).map((h) => ({ data: h.data, modelos: Object.fromEntries(Object.entries(h.modelos).map(([c, v]) => [aliases[chave(c)] ?? chave(c), v])) })),
}, true);

// ---------- um idioma por vez ----------
const urlsSitemap = [];
for (const idioma of IDIOMAS) {
  const t = tradutor(idioma);
  const pre = prefixo(idioma);
  const { data, dataHora, nf } = formatos(idioma);
  const grava = (rel, html) => gravarTexto(`public${pre}${rel === '/' ? '/index.html' : rel}`, html);
  const base = { idioma, t, versao, dados };
  urlsSitemap.push(...['/', '/graficos.html', '/comparar.html', '/metodologia.html', ...modelos.map((m) => `/modelo/${m.slug}.html`)].map((r) => pre + r));

  // Formatação no idioma.
  const posicao = (n) => n == null ? '—' : t('pos', { n });
  const preco = (v) => formatar(v, 'USD').replace('grátis', t('gratis'));
  const precoH = (v) => `<span data-usd="${nv(v)}">${preco(v)}</span>`;
  const SIGLA = '<span class="sigla-moeda">US$</span>';
  const contexto = (n) => n == null ? '—' : n >= 1e6 ? t('ctx.mi', { n: nf(n / 1e6, n % 1e6 ? 1 : 0) }) : t('ctx.mil', { n: Math.round(n / 1000) });
  const valor = (m, id) => {
    const v = m.metricas[id];
    if (v == null) return '—';
    return met[id].unidade === 'Elo' ? String(Math.round(v)) : nf(v, 1);
  };
  const barra = (p) => p == null ? '' : `<span class="barra" aria-hidden="true"><i class="w${Math.round(p)}"></i></span>`;
  const selo = (m) => m.aberto ? `<span class="selo aberto" title="${esc(t('selo.aberto.titulo'))}">${t('selo.aberto')}</span>` : '';
  const nomeCat = (id) => t('cat.' + id);
  // Nome, rótulo curto e descrição da métrica no idioma; sem tradução, fica o nome da fonte.
  const ehLB = (id) => id.startsWith('lb_') && id !== 'lb_geral';
  const lbNome = (id, campo) => (t.tem('lb.' + id) ? t('lb.' + id) : met[id][campo]);
  const nomeMet = (id) => ehLB(id) ? t('met.lb', { c: lbNome(id, 'nome') }) : t.tem('met.' + id) ? t('met.' + id) : met[id].nome;
  const curtoMet = (id) => ehLB(id) ? t('met.lb.curto', { c: lbNome(id, 'curto') }) : t.tem(`met.${id}.curto`) ? t(`met.${id}.curto`) : met[id].curto;
  const descMet = (id) => ehLB(id) ? t('met.lb.desc', { c: lbNome(id, 'nome') }) : t.tem(`met.${id}.desc`) ? t(`met.${id}.desc`) : met[id].desc;
  const linkModelo = (m) => `${pre}/modelo/${esc(m.slug)}.html`;
  const busca = (m) => esc((m.nome + ' ' + (m.empresa ?? '') + ' ' + m.chave).toLowerCase());

  // Textos para o JavaScript do navegador.
  gravarTexto(`public/assets/t-${idioma.pasta || 'pt'}.js`, `window.T=${JSON.stringify(textosCliente(idioma))};window.IDIOMA=${JSON.stringify({ codigo: idioma.codigo, locale: idioma.locale, pre })};\n`);

  // ---------- ranking (index) ----------
  const th = (rotulo, { esq = false, cls = '', titulo = '', tipo = 'num', cats: dc = '' } = {}) =>
    `<th scope="col" class="${[esq ? 'esq' : '', cls].join(' ').trim()}" data-tipo="${tipo}"${dc ? ` data-cats="${dc}"` : ''}${titulo ? ` title="${esc(titulo)}"` : ''}><button type="button">${rotulo}</button></th>`;
  const colunasFim = (m) => `<td data-v="${nv(m.precoEntrada)}">${precoH(m.precoEntrada)}</td>
<td data-v="${nv(m.precoSaida)}">${precoH(m.precoSaida)}</td>
<td data-v="${nv(m.contexto)}">${contexto(m.contexto)}</td>
<td data-v="${nv(m.lancamento)}">${data(m.lancamento)}</td>
<td><input type="checkbox" class="sel" value="${esc(m.slug)}" aria-label="${esc(t('comparar.aria', { m: m.nome }))}"></td>`;
  const thFim = `${th(t('th.entrada'), { titulo: t('th.entrada.titulo') })}
${th(t('th.saida'), { titulo: t('th.saida.titulo') })}
${th(t('th.contexto'), { titulo: t('th.contexto.titulo') })}
${th(t('th.lancado'), { titulo: t('th.lancado.titulo') })}
<th scope="col">${t('th.comparar')}</th>`;
  const celModelo = (m) => `<td class="esq modelo" data-v="${esc(m.nome.toLowerCase())}"><a href="${linkModelo(m)}">${esc(m.nome)}</a>${selo(m)}<small>${esc(m.empresa ?? '—')}</small></td>`;

  const linhaRanking = (m) => {
    const cel = (id) => `<td data-cats="${catsDe(id)}" data-v="${nv(m.metricas[id])}">${valor(m, id)}</td>`;
    const posCats = cats.map((c) => ` data-r-${c.id}="${m.posCategorias?.[c.id] ?? ''}"`).join('');
    return `<tr${posCats} data-pos="${m.posicao}" data-busca="${busca(m)}" data-empresa="${esc(m.empresa ?? '')}" data-aberto="${m.aberto ? 1 : 0}" data-preco="${nv(m.precoEntrada)}" data-slug="${esc(m.slug)}"${m.posicao === 1 ? ' class="top1"' : ''}>
<td class="pos" data-v="${m.posicao}">${m.posicao}</td>
${celModelo(m)}
${cats.map((c) => `<td class="nota" data-cats="${c.id}" data-v="${nv(m.categorias?.[c.id])}">${m.categorias?.[c.id] != null ? nf(m.categorias[c.id]) + barra(m.categorias[c.id]) : '—'}</td>`).join('')}
<td class="nota" data-v="${m.nota}">${nf(m.nota)}${barra(m.nota)}</td>
${colunasMetricas.map((x) => cel(x.id)).join('')}
${colunasFim(m)}
</tr>`;
  };
  const linhaOutro = (m) => `<tr data-busca="${busca(m)}" data-empresa="${esc(m.empresa ?? '')}" data-aberto="${m.aberto ? 1 : 0}" data-preco="${nv(m.precoEntrada)}" data-slug="${esc(m.slug)}">
${celModelo(m)}
${arenaIds.map((id) => `<td data-v="${nv(m.metricas[id])}">${valor(m, id)}</td>`).join('')}
${colunasFim(m)}
</tr>`;

  const empresas = [...new Set(modelos.map((m) => m.empresa).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const filtros = `<div class="filtros" role="search">
<label class="oculto" for="busca">${t('filtro.busca')}</label>
<input type="search" id="busca" placeholder="${esc(t('filtro.busca'))}" autocomplete="off">
<label class="oculto" for="f-empresa">${t('filtro.empresa')}</label>
<select id="f-empresa"><option value="">${t('filtro.empresas')}</option>${empresas.map((e) => `<option>${esc(e)}</option>`).join('')}</select>
<label class="oculto" for="f-tipo">${t('filtro.tipo')}</label>
<select id="f-tipo"><option value="">${t('tipo.todos')}</option><option value="1">${t('tipo.abertos')}</option><option value="0">${t('tipo.fechados')}</option></select>
<label class="oculto" for="f-preco">${t('filtro.preco')}</label>
<select id="f-preco"><option value="">${t('preco.qualquer')}</option>${[0.5, 2, 5].map((v) => `<option value="${v}" data-usd-rotulo="${v}">${t('ate', { p: preco(v) })}</option>`).join('')}</select>
<label class="caixa" for="f-mostrar">${t('mostrar')}</label>
<select id="f-mostrar" title="${esc(t('mostrar.titulo'))}"><option value="10" selected>10</option><option value="20">20</option><option value="50">50</option><option value="100">100</option><option value="">${t('todos')}</option></select>
<span class="contagem" id="contagem" aria-live="polite"></span>
</div>
<div class="chips" role="group" aria-label="${esc(t('categoria'))}">
<span class="rotulo-chips">${t('categoria')}</span>
<button type="button" class="chip" data-cat="todas" aria-pressed="true">${t('cat.todas')}</button>
${cats.map((c) => `<button type="button" class="chip" data-cat="${c.id}" aria-pressed="false" title="${esc(c.metricas.map(nomeMet).join(', '))}">${esc(nomeCat(c.id))}</button>`).join('\n')}
</div>`;

  const melhor = (lista, f) => lista.filter((m) => f(m) != null).sort((a, b) => f(b) - f(a))[0];
  const top = ranking[0];
  // Custo-benefício só entre a metade de cima do ranking, para não premiar modelo fraco e barato.
  const notaMediana = ranking[Math.floor(ranking.length / 2)]?.nota ?? 0;
  const custoBeneficio = melhor(ranking.filter((m) => m.nota >= notaMediana && m.precoEntrada > 0 && m.precoSaida != null), (m) => m.nota / ((3 * m.precoEntrada + m.precoSaida) / 4) ** 0.5);
  const topAberto = ranking.find((m) => m.aberto);
  const topArena = melhor(modelos, (m) => m.metricas.arena_texto);
  const cartao = (rotulo, m, v) => m ? `<a class="cartao" href="${linkModelo(m)}"><span class="rotulo">${rotulo}</span><span class="nome">${esc(m.nome)}</span><span class="valor">${v}</span></a>` : '';
  const nomesFontes = ponderadas.map((m) => FONTES[m.fonte].nome).filter((v, i, a) => a.indexOf(v) === i).map(esc).join(', ');

  grava('/', pagina({
    ...base, rel: '/',
    titulo: t('idx.titulo'),
    descricao: t('idx.desc', { n: ranking.length }),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'RankingIA',
      url: `${SITE}${pre}/`,
      inLanguage: idioma.codigo,
      description: t('idx.desc', { n: ranking.length }),
      author: { '@type': 'Person', name: PERFIL.nome, url: 'https://biazin.com.br/' },
    },
    scripts: ['/assets/tabela.js'],
    conteudo: `<div class="intro">
<div><h1>${t('idx.h1')}</h1>
<p>${t('idx.intro', { fontes: nomesFontes, l: `<a href="${pre}/metodologia.html">${t('idx.como')}</a>` })}</p></div>
</div>
<div class="podio">
${cartao(t('podio.primeiro'), top, t('nota.n', { n: nf(top?.nota) }))}
${cartao(t('podio.custo'), custoBeneficio, custoBeneficio ? `${t('nota.n', { n: nf(custoBeneficio.nota) })} · ${precoH(custoBeneficio.precoEntrada)} / ${precoH(custoBeneficio.precoSaida)} ${t('por1m')}` : '')}
${cartao(t('podio.aberto'), topAberto, topAberto ? `${t('nota.n', { n: nf(topAberto.nota) })} · ${t('lugar', { p: posicao(topAberto.posicao) })}` : '')}
${cartao(t('podio.arena'), topArena, topArena ? `Elo ${Math.round(topArena.metricas.arena_texto)}` : '')}
</div>
<section class="cartao" aria-labelledby="t-ranking">
<h2 id="t-ranking" class="oculto">${t('js.rankingGeral')}</h2>
${filtros}
<div class="rolagem">
<table class="tabela" id="ranking" data-cat="todas">
<caption class="oculto">${t('caption.ranking', { n: ranking.length })}</caption>
<thead><tr>
${th('#', { titulo: t('th.posicao') })}
${th(t('th.modelo'), { esq: true, tipo: 'texto' })}
${cats.map((c) => th(esc(t('th.notaCat', { c: nomeCat(c.id).toLowerCase() })), { cls: 'nota-cat', cats: c.id, titulo: t('th.notaCat.titulo', { c: nomeCat(c.id), m: c.metricas.map(nomeMet).join(', ') }) })).join('')}
${th(t('th.nota'), { cls: 'nota-geral', titulo: t('th.nota.titulo') })}
${colunasMetricas.map((x) => th(esc(curtoMet(x.id)), { cats: catsDe(x.id), titulo: descMet(x.id) })).join('')}
${thFim}
</tr></thead>
<tbody>
${ranking.map(linhaRanking).join('\n')}
</tbody>
</table>
</div>
</section>
<h2 id="t-outros">${t('outros.h2')}</h2>
<p class="fraco">${t('outros.texto', { n: outros.length, fontes: dados.exigeUmaDe.map(nomeMet).join(` ${t('ou')} `) })} <span id="contagem-outros"></span></p>
<section class="cartao" aria-labelledby="t-outros">
<div class="rolagem">
<table class="tabela" id="outros">
<thead><tr>
${th(t('th.modelo'), { esq: true, tipo: 'texto' })}
${arenaIds.map((id) => th(esc(curtoMet(id)), { titulo: descMet(id) })).join('')}
${thFim}
</tr></thead>
<tbody>
${outros.map(linhaOutro).join('\n')}
</tbody>
</table>
</div>
</section>
<div class="comparar-barra" id="comparar-barra" hidden>
<span id="comparar-n"></span>
<button type="button" class="limpar" id="comparar-limpar">${t('limpar')}</button>
<a class="botao" id="comparar-ir" href="${pre}/comparar.html">${t('th.comparar')}</a>
</div>`,
  }));

  // ---------- página de cada modelo ----------
  const paginaModelo = (m) => {
    const linhas = metricas.filter((x) => m.metricas[x.id] != null).map((x) => `<tr>
<th scope="row" class="esq">${esc(nomeMet(x.id))}${x.peso > 0 ? ` <span class="selo" title="${esc(t('mod.peso.titulo', { p: nf(x.peso, x.peso % 1 ? 1 : 0) }))}">${t('mod.peso', { p: nf(x.peso, x.peso % 1 ? 1 : 0) })}</span>` : ''}</th>
<td>${valor(m, x.id)}</td>
<td>${m.percentis[x.id] != null ? `${nf(m.percentis[x.id], 0)}%${barra(m.percentis[x.id])}` : '—'}</td>
<td class="esq"><a href="${FONTES[x.fonte].url}" rel="noopener">${esc(FONTES[x.fonte].nome)}</a></td>
</tr>`).join('\n');
    const o = m.origens;
    const links = [
      o.openrouter && [`https://openrouter.ai/${o.openrouter}`, 'OpenRouter'],
      m.hf && [`https://huggingface.co/${m.hf}`, t('mod.hf')],
      o.lmarena && ['https://arena.ai/leaderboard', 'LMArena'],
      o.livebench && ['https://livebench.ai/', 'LiveBench'],
      o.artificialanalysis && [`https://artificialanalysis.ai/models/${o.artificialanalysis}`, 'Artificial Analysis'],
    ].filter(Boolean);
    const precoTxt = m.precoEntrada != null ? `${preco(m.precoEntrada)} / ${preco(m.precoSaida)}` : '—';
    const descricao = m.parcial
      ? t('mod.descParcial', { m: m.nome + (m.empresa ? ` (${m.empresa})` : ''), e: m.metricas.arena_texto ? Math.round(m.metricas.arena_texto) : '—', p: precoTxt, c: contexto(m.contexto) })
      : t('mod.desc', { m: m.nome + (m.empresa ? ` (${m.empresa})` : ''), pos: posicao(m.posicao), n: nf(m.nota), p: precoTxt });

    // Família: todas as versões com alguma nota, da primeira à atual.
    const fam = (familias[m.familia] ?? [m]).filter((x) => x.nota != null || x.metricas.arena_texto != null || x.metricas.aa_inteligencia != null);
    const temFamilia = fam.length >= 2;
    const temAA = fam.some((x) => x.metricas.aa_inteligencia != null);
    const serieFamilia = fam.map((x) => ({ n: x.nome, s: x.slug, l: x.lancamento, nota: x.nota, elo: x.metricas.arena_texto ?? null, aa: x.metricas.aa_inteligencia ?? null, atual: x === m }));
    const h = historicoModelo[m.chave] ?? { dias: [], nota: [], pos: [] };
    const usaGrafico = temFamilia || h.dias.length >= 2;

    return pagina({
      ...base, rel: `/modelo/${m.slug}.html`,
      titulo: t('mod.titulo', { m: m.nome }),
      descricao,
      scripts: usaGrafico ? ['/vendor/chart.umd.min.js', '/assets/comum.js', '/assets/modelo.js'] : [],
      conteudo: `<nav class="fraco"><a href="${pre}/">${t('nav.ranking')}</a> › ${esc(m.nome)}</nav>
<div class="cabeca-modelo">
<div>
<h1>${esc(m.nome)}${selo(m)}</h1>
<p class="empresa">${esc(m.empresa ?? t('mod.empresaNA'))}</p>
</div>
<div class="placar">
${m.parcial
    ? `<span class="fraco">${t('mod.fora')}</span>`
    : `<span class="grande">${nf(m.nota)}</span><span class="fraco">${t('mod.posDe', { pos: posicao(m.posicao), n: ranking.length })}</span>`}
</div>
</div>
<dl class="fichas">
<div class="cartao"><dt>${t('mod.entradaSaida')}</dt><dd>${m.precoEntrada != null ? `${precoH(m.precoEntrada)} / ${precoH(m.precoSaida)}` : '—'}</dd><small>${t('mod.por1mTokens', { s: SIGLA })}</small></div>
<div class="cartao"><dt>${t('th.contexto')}</dt><dd>${contexto(m.contexto)}</dd><small>${t('mod.tokens')}</small></div>
<div class="cartao"><dt>${t('mod.lancamento')}</dt><dd>${data(m.lancamento)}</dd><small>${t('mod.lancamentoFonte')}</small></div>
<div class="cartao"><dt>${t('mod.pesos')}</dt><dd>${m.aberto ? t('mod.abertos') : m.aberto === false ? t('mod.fechados') : '—'}</dd><small>${m.hf ? `<a href="https://huggingface.co/${esc(m.hf)}" rel="noopener">${esc(m.hf)}</a>` : '&nbsp;'}</small></div>
${m.velocidade != null ? `<div class="cartao"><dt>${t('mod.velocidade')}</dt><dd>${nf(m.velocidade, 0)} tok/s</dd><small>${t('mod.ttft', { s: nf(m.ttft, 2) })}</small></div>` : ''}
</dl>
${temFamilia ? `<section class="cartao grafico" aria-labelledby="t-familia">
<h2 id="t-familia">${t('fam.titulo')}</h2>
<p>${t('fam.texto', { n: fam.length })}</p>
<div class="tela baixa"><canvas id="g-familia" role="img" aria-label="${esc(t('fam.titulo'))}" data-serie="${esc(JSON.stringify(serieFamilia))}"></canvas></div>
<details><summary>${t('gr.verDados')}</summary><div class="rolagem"><table class="tabela">
<thead><tr><th scope="col" class="esq">${t('th.modelo')}</th><th scope="col">${t('th.lancado')}</th><th scope="col">${t('th.nota')}</th><th scope="col">${t('mod.posicao')}</th>${temAA ? `<th scope="col">${esc(curtoMet('aa_inteligencia'))}</th>` : ''}<th scope="col">Elo Arena</th></tr></thead>
<tbody>
${fam.map((x) => `<tr${x === m ? ' class="top1"' : ''}><th scope="row" class="esq">${x === m ? esc(x.nome) : `<a href="${linkModelo(x)}">${esc(x.nome)}</a>`}</th><td>${data(x.lancamento)}</td><td>${nf(x.nota)}</td><td>${posicao(x.posicao)}</td>${temAA ? `<td>${valor(x, 'aa_inteligencia')}</td>` : ''}<td>${x.metricas.arena_texto != null ? Math.round(x.metricas.arena_texto) : '—'}</td></tr>`).join('\n')}
</tbody></table></div></details>
</section>
<p></p>` : ''}
<section class="cartao" aria-labelledby="t-notas">
<div class="filtros"><h2 id="t-notas" class="oculto">${t('mod.notasFonte')}</h2><strong>${t('mod.notasFonte')}</strong><span class="contagem">${t('mod.percentilExpl')}</span></div>
<div class="rolagem">
<table class="tabela">
<thead><tr><th scope="col" class="esq">${t('mod.metrica')}</th><th scope="col">${t('mod.valor')}</th><th scope="col">${t('mod.percentil')}</th><th scope="col" class="esq">${t('mod.fonte')}</th></tr></thead>
<tbody>
${linhas}
</tbody>
</table>
</div>
</section>
${!m.parcial && cats.some((c) => m.categorias?.[c.id] != null) ? `<h2>${t('mod.porCategoria')}</h2>
<section class="cartao"><div class="rolagem"><table class="tabela">
<thead><tr><th scope="col" class="esq">${t('categoria')}</th><th scope="col">${t('th.nota')}</th><th scope="col">${t('mod.posicao')}</th><th scope="col" class="esq">${t('mod.metricas')}</th></tr></thead>
<tbody>
${cats.filter((c) => m.categorias?.[c.id] != null).map((c) => `<tr><th scope="row" class="esq">${esc(nomeCat(c.id))}</th><td>${nf(m.categorias[c.id])}${barra(m.categorias[c.id])}</td><td>${posicao(m.posCategorias[c.id])}</td><td class="esq fraco">${esc(c.metricas.filter((id) => m.metricas[id] != null).map(nomeMet).join(', '))}</td></tr>`).join('\n')}
</tbody></table></div></section>` : ''}
${!m.parcial ? `<h2>${t('mod.evolucao')}</h2>
<section class="cartao grafico"><p>${t('mod.evolucao.texto')}</p>
${h.dias.length >= 2
    ? `<div class="tela baixa"><canvas id="g-modelo" role="img" aria-label="${esc(t('mod.evolucao.aria', { m: m.nome }))}" data-serie="${esc(JSON.stringify(h))}"></canvas></div>`
    : `<p class="fraco">${t('mod.evolucao.espera', { d: data(Object.keys(historicoNota)[0]) })}</p>`}
</section>` : ''}
<p></p>
<p><a class="botao" href="${pre}/comparar.html?m=${encodeURIComponent(m.slug)}${top && top.slug !== m.slug ? ',' + encodeURIComponent(top.slug) : ''}">${t('mod.compararOutros')}</a></p>
${links.length ? `<h2>${t('mod.nasFontes')}</h2>\n<ul class="links">${links.map(([u, n]) => `<li><a class="botao leve" href="${esc(u)}" rel="noopener">${n}</a></li>`).join('')}</ul>` : ''}`,
    });
  };
  for (const m of modelos) grava(`/modelo/${m.slug}.html`, paginaModelo(m));

  // ---------- gráficos ----------
  const blocoGrafico = (id, titulo, texto, { largo = false } = {}) => `<section class="cartao grafico${largo ? ' largo' : ''}" aria-labelledby="t-${id}">
<h2 id="t-${id}">${titulo}</h2>
<p>${texto}</p>
<div class="tela"><canvas id="g-${id}" role="img" aria-label="${esc(titulo)}"></canvas></div>
<details><summary>${t('gr.verDados')}</summary><div class="rolagem" id="d-${id}"></div></details>
</section>`;
  grava('/graficos.html', pagina({
    ...base, rel: '/graficos.html',
    titulo: t('gr.titulo'),
    descricao: t('gr.desc'),
    scripts: ['/vendor/chart.umd.min.js', '/assets/comum.js', '/assets/graficos.js'],
    conteudo: `<div class="intro"><div><h1>${t('gr.h1')}</h1><p>${t('gr.intro')}</p></div></div>
<div class="graficos">
${blocoGrafico('nota-preco', t('gr.notaPreco'), t('gr.notaPreco.texto'))}
${blocoGrafico('arena-preco', t('gr.arenaPreco'), t('gr.arenaPreco.texto'))}
${dados.fontes.artificialanalysis?.coletadoEm ? blocoGrafico('nota-velocidade', t('gr.velocidade'), t('gr.velocidade.texto')) : ''}
${blocoGrafico('fronteira', t('gr.fronteira'), t('gr.fronteira.texto'), { largo: true })}
${blocoGrafico('evolucao', t('gr.livebench'), t('gr.livebench.texto'), { largo: true })}
${blocoGrafico('historico', t('gr.historico'), t('gr.historico.texto'), { largo: true })}
</div>`,
  }));

  // ---------- comparar ----------
  grava('/comparar.html', pagina({
    ...base, rel: '/comparar.html',
    titulo: t('cmp.titulo'),
    descricao: t('cmp.desc'),
    scripts: ['/vendor/chart.umd.min.js', '/assets/comum.js', '/assets/comparar.js'],
    conteudo: `<div class="intro"><div><h1>${t('cmp.h1')}</h1><p>${t('cmp.intro')}</p></div></div>
<section class="cartao" aria-label="${esc(t('cmp.escolha'))}">
<div class="seletor" id="seletor">
${[1, 2, 3, 4].map((i) => `<label><span class="oculto">${t('cmp.modeloN', { i })}</span><select id="s${i}"><option value="">${t('cmp.modeloN', { i })}${i > 2 ? ' ' + t('cmp.opcional') : ''}</option></select></label>`).join('\n')}
</div>
</section>
<p></p>
<div class="grade-2">
<section class="cartao" aria-labelledby="t-comp"><h2 id="t-comp" class="oculto">${t('cmp.tabela')}</h2><div class="rolagem" id="comparativo"><p class="fraco pad">${t('cmp.escolhaAcima')}</p></div></section>
<section class="cartao grafico" aria-labelledby="t-radar"><h2 id="t-radar">${t('cmp.perfil')}</h2><p>${t('cmp.perfil.texto')}</p><div class="tela"><canvas id="radar" role="img" aria-label="${esc(t('cmp.radar.aria'))}"></canvas></div></section>
</div>`,
  }));

  // ---------- metodologia ----------
  const cab = STATUS_CAB[idioma.codigo];
  const ctx = {
    aa: Boolean(dados.fontes.artificialanalysis?.coletadoEm),
    exige: dados.exigeUmaDe.map((id) => esc(nomeMet(id))).join(` ${t('ou')} `),
    neutro: nf(PESO_NEUTRO, 0),
    pesos: `<table><thead><tr><th>${cab[3]}</th><th>${cab[4]}</th><th>${cab[0]}</th></tr></thead><tbody>
${ponderadas.map((x) => `<tr><td>${esc(nomeMet(x.id))}</td><td>${nf(x.peso, x.peso % 1 ? 1 : 0)}</td><td>${esc(FONTES[x.fonte].nome)}</td></tr>`).join('')}
</tbody></table>`,
    cats: `<table><thead><tr><th>${cab[5]}</th><th>${cab[6]}</th></tr></thead><tbody>
${cats.map((c) => `<tr><td>${esc(nomeCat(c.id))}</td><td>${esc(c.metricas.map(nomeMet).join(', '))}</td></tr>`).join('')}
</tbody></table>`,
    status: `<table><thead><tr><th>${cab[0]}</th><th>${cab[1]}</th><th>${cab[2]}</th></tr></thead><tbody>${Object.entries(dados.fontes).map(([id, f]) => `<tr><td>${esc(FONTES[id].nome)}</td><td>${f.ok ? 'ok' : esc(f.erro ?? cab[7])}</td><td>${dataHora(f.coletadoEm)}</td></tr>`).join('')}</tbody></table>`,
  };
  const [mTitulo, mDesc] = METODOLOGIA_TITULO[idioma.codigo];
  grava('/metodologia.html', pagina({
    ...base, rel: '/metodologia.html',
    titulo: mTitulo, descricao: mDesc,
    conteudo: `<div class="texto">\n${METODOLOGIA[idioma.codigo](ctx)}\n</div>`,
  }));

  // ---------- 404 ----------
  grava('/404.html', pagina({
    ...base, rel: '/404.html', noindex: true,
    titulo: t('e404.titulo'),
    descricao: t('e404.desc'),
    conteudo: `<div class="texto"><h1>${t('e404.h1')}</h1><p>${t('e404.texto')} <a href="${pre}/">${t('e404.voltar')}</a>.</p></div>`,
  }));
}

// ---------- arquivos de apoio ----------
const css = readFileSync(caminho('src/assets/estilo.css'), 'utf8')
  + '\n/* Colunas por categoria (geradas): só aparece a coluna marcada com a categoria ativa */\n'
  + '#ranking [data-cats] { display: none; }\n'
  + ['todas', ...cats.map((c) => c.id)].map((id) => `#ranking[data-cat="${id}"] [data-cats~="${id}"] { display: table-cell; }`).join('\n') + '\n'
  + '\n/* Larguras das barras (geradas) */\n' + Array.from({ length: 101 }, (_, i) => `.barra i.w${i}{width:${i}%}`).join('\n') + '\n';
gravarTexto('public/assets/estilo.css', css);
for (const a of ['tema.js', 'moeda.js', 'tabela.js', 'graficos.js', 'comparar.js', 'comum.js', 'modelo.js']) copyFileSync(caminho('src/assets/' + a), caminho('public/assets/' + a));
mkdirSync(caminho('public/vendor'), { recursive: true });
copyFileSync(caminho('node_modules/chart.js/dist/chart.umd.min.js'), caminho('public/vendor/chart.umd.min.js'));
gravarTexto('public/favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2a78d6"/><rect x="7" y="17" width="4.5" height="8" rx="1.5" fill="#fff"/><rect x="13.75" y="8" width="4.5" height="17" rx="1.5" fill="#fff"/><rect x="20.5" y="13" width="4.5" height="12" rx="1.5" fill="#fff"/></svg>\n');
// Agentes de IA: robots.txt liberado para os rastreadores conhecidos, e os índices em texto (llms.txt).
gravarTexto('public/robots.txt', robotsTxt());
gravarTexto('public/llms.txt', llmsTxt(dados));
gravarTexto('public/llms-full.txt', llmsFullTxt(dados));
const hoje = dados.geradoEm.slice(0, 10);
gravarTexto('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsSitemap.map((u) => `<url><loc>${SITE}${u}</loc><lastmod>${hoje}</lastmod></url>`).join('\n')}\n</urlset>\n`);

console.log(`public/: ${IDIOMAS.length} idiomas × ${modelos.length} páginas de modelo, ranking com ${ranking.length}, outros ${outros.length} (v${versao})`);
