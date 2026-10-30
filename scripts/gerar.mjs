// Gera o site estático em public/ a partir de dados/modelos.json:
// ranking, gráficos, comparar, metodologia, uma página por modelo, sitemap e o JSON do cliente.
// Uso: node scripts/gerar.mjs

import { readFileSync, readdirSync, rmSync, copyFileSync, mkdirSync } from 'node:fs';
import { caminho, chave, esc, gravarJSON, gravarTexto, lerJSON } from './util.mjs';
import { pagina, SITE, dataBR, dataHora } from '../src/layout.mjs';
import { FONTES, PESO_NEUTRO } from '../src/pesos.mjs';

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

rmSync(caminho('public'), { recursive: true, force: true });
mkdirSync(caminho('public/modelo'), { recursive: true });

// ---------- formatação ----------
const nf = (v, casas = 1) => v == null ? '—' : Number(v).toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
// Preço em US$ (texto puro, para metas) e em HTML com data-usd, que o moeda.js converte.
const preco = (v) => v == null ? '—' : v === 0 ? 'grátis' : '$' + nf(v, v < 0.1 ? 3 : 2);
const precoH = (v) => `<span data-usd="${nv(v)}">${preco(v)}</span>`;
const SIGLA = '<span class="sigla-moeda">US$</span>';
const contexto = (n) => n == null ? '—' : n >= 1e6 ? `${nf(n / 1e6, n % 1e6 ? 1 : 0)} M` : `${Math.round(n / 1000)} mil`;
const valor = (m, id) => {
  const v = m.metricas[id];
  if (v == null) return '—';
  return met[id].unidade === 'Elo' ? String(Math.round(v)) : nf(v, 1);
};
const barra = (p) => p == null ? '' : `<span class="barra" aria-hidden="true"><i class="w${Math.round(p)}"></i></span>`;
const selo = (m) => m.aberto ? '<span class="selo aberto" title="Pesos abertos">aberto</span>' : '';
const nv = (v) => v == null ? '' : v; // data-v vazio vai para o fim na ordenação

// ---------- JSON para o navegador ----------
const historicoNota = {};
for (const arq of readdirSync(caminho('dados/historico')).filter((a) => /^\d{4}-\d{2}-\d{2}\.json$/.test(a)).sort()) {
  historicoNota[arq.slice(0, 10)] = Object.fromEntries(Object.entries(lerJSON(`dados/historico/${arq}`)).map(([k, v]) => [k, v[0]]));
}
const lb = lerJSON('dados/brutos/livebench.json');
const aliases = lerJSON('dados/aliases.json', {});
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

// ---------- ranking (index) ----------
function linhaRanking(m) {
  const cel = (id, cls = '') => `<td class="${cls}" data-v="${nv(m.metricas[id])}">${valor(m, id)}</td>`;
  return `<tr data-busca="${esc((m.nome + ' ' + (m.empresa ?? '') + ' ' + m.chave).toLowerCase())}" data-empresa="${esc(m.empresa ?? '')}" data-aberto="${m.aberto ? 1 : 0}" data-preco="${nv(m.precoEntrada)}" data-slug="${esc(m.slug)}"${m.posicao === 1 ? ' class="top1"' : ''}>
<td class="pos" data-v="${m.posicao}">${m.posicao}</td>
<td class="esq modelo" data-v="${esc(m.nome.toLowerCase())}"><a href="/modelo/${esc(m.slug)}.html">${esc(m.nome)}</a>${selo(m)}<small>${esc(m.empresa ?? '—')}</small></td>
<td class="nota" data-v="${m.nota}">${nf(m.nota)}${barra(m.nota)}</td>
${ponderadas.map((x) => cel(x.id)).join('')}
${categorias.map((x) => cel(x.id, 'cat')).join('')}
${extras.map((x) => cel(x.id, 'cat')).join('')}
<td data-v="${nv(m.precoEntrada)}">${precoH(m.precoEntrada)}</td>
<td data-v="${nv(m.precoSaida)}">${precoH(m.precoSaida)}</td>
<td data-v="${nv(m.contexto)}">${contexto(m.contexto)}</td>
<td data-v="${nv(m.lancamento)}">${dataBR(m.lancamento)}</td>
<td><input type="checkbox" class="sel" value="${esc(m.slug)}" aria-label="Comparar ${esc(m.nome)}"></td>
</tr>`;
}

function linhaOutro(m) {
  return `<tr data-busca="${esc((m.nome + ' ' + (m.empresa ?? '') + ' ' + m.chave).toLowerCase())}" data-empresa="${esc(m.empresa ?? '')}" data-aberto="${m.aberto ? 1 : 0}" data-preco="${nv(m.precoEntrada)}" data-slug="${esc(m.slug)}">
<td class="esq modelo" data-v="${esc(m.nome.toLowerCase())}"><a href="/modelo/${esc(m.slug)}.html">${esc(m.nome)}</a>${selo(m)}<small>${esc(m.empresa ?? '—')}</small></td>
${['arena_texto', 'arena_webdev', 'arena_visao'].filter((id) => met[id]).map((id) => `<td data-v="${nv(m.metricas[id])}">${valor(m, id)}</td>`).join('')}
<td data-v="${nv(m.precoEntrada)}">${precoH(m.precoEntrada)}</td>
<td data-v="${nv(m.precoSaida)}">${precoH(m.precoSaida)}</td>
<td data-v="${nv(m.contexto)}">${contexto(m.contexto)}</td>
<td data-v="${nv(m.lancamento)}">${dataBR(m.lancamento)}</td>
<td><input type="checkbox" class="sel" value="${esc(m.slug)}" aria-label="Comparar ${esc(m.nome)}"></td>
</tr>`;
}

const th = (rotulo, { esq = false, cls = '', titulo = '', tipo = 'num' } = {}) =>
  `<th scope="col" class="${[esq ? 'esq' : '', cls].join(' ').trim()}" data-tipo="${tipo}"${titulo ? ` title="${esc(titulo)}"` : ''}><button type="button">${rotulo}</button></th>`;

const empresas = [...new Set(modelos.map((m) => m.empresa).filter(Boolean))].sort((a, b) => a.localeCompare(b));
const filtros = `<div class="filtros" role="search">
<label class="oculto" for="busca">Buscar modelo</label>
<input type="search" id="busca" placeholder="Buscar modelo ou empresa" autocomplete="off">
<label class="oculto" for="f-empresa">Empresa</label>
<select id="f-empresa"><option value="">Todas as empresas</option>${empresas.map((e) => `<option>${esc(e)}</option>`).join('')}</select>
<label class="oculto" for="f-tipo">Tipo</label>
<select id="f-tipo"><option value="">Abertos e fechados</option><option value="1">Só pesos abertos</option><option value="0">Só fechados</option></select>
<label class="oculto" for="f-preco">Preço de entrada</label>
<select id="f-preco"><option value="">Qualquer preço</option><option value="0.5" data-usd-rotulo="0.5">até $0,50 / 1M</option><option value="2" data-usd-rotulo="2">até $2 / 1M</option><option value="5" data-usd-rotulo="5">até $5 / 1M</option></select>
<label class="caixa"><input type="checkbox" id="f-cat"> Mostrar categorias</label>
<span class="contagem" id="contagem" aria-live="polite"></span>
</div>`;

const melhor = (lista, f) => lista.filter((m) => f(m) != null).sort((a, b) => f(b) - f(a))[0];
const top = ranking[0];
// Custo-benefício só entre a metade de cima do ranking, para não premiar modelo fraco e barato.
const notaMediana = ranking[Math.floor(ranking.length / 2)]?.nota ?? 0;
const custoBeneficio = melhor(ranking.filter((m) => m.nota >= notaMediana && m.precoEntrada > 0 && m.precoSaida != null), (m) => m.nota / ((3 * m.precoEntrada + m.precoSaida) / 4) ** 0.5);
const topAberto = ranking.find((m) => m.aberto);
const topArena = melhor(modelos, (m) => m.metricas.arena_texto);
const cartao = (rotulo, m, v) => m ? `<a class="cartao" href="/modelo/${esc(m.slug)}.html"><span class="rotulo">${rotulo}</span><span class="nome">${esc(m.nome)}</span><span class="valor">${v}</span></a>` : '';

const index = pagina({
  titulo: 'RankingIA — ranking dos modelos de IA (LLMs) em português',
  descricao: `Ranking de ${ranking.length} modelos de IA com nota que junta LiveBench, LMArena e preços do OpenRouter. Compare GPT, Claude, Gemini, DeepSeek, Qwen e outros por qualidade, preço e contexto.`,
  caminho: '/',
  versao, dados,
  scripts: ['/assets/tabela.js'],
  conteudo: `<div class="intro">
<div><h1>Ranking de modelos de IA</h1>
<p>Uma nota de 0 a 100 que junta benchmarks públicos (${ponderadas.map((m) => esc(FONTES[m.fonte].nome)).filter((v, i, a) => a.indexOf(v) === i).join(', ')}) e mostra quanto cada modelo custa. A nota diz em quantos % dos modelos do ranking este modelo fica à frente, em média ponderada. <a href="/metodologia.html">Como calculamos</a>.</p></div>
</div>
<div class="podio">
${cartao('1º lugar geral', top, `Nota ${nf(top?.nota)}`)}
${cartao('Melhor custo-benefício', custoBeneficio, custoBeneficio ? `Nota ${nf(custoBeneficio.nota)} · ${precoH(custoBeneficio.precoEntrada)} / ${precoH(custoBeneficio.precoSaida)} por 1M` : '')}
${cartao('Melhor de pesos abertos', topAberto, topAberto ? `Nota ${nf(topAberto.nota)} · ${topAberto.posicao}º lugar` : '')}
${cartao('Preferido pelas pessoas (Arena)', topArena, topArena ? `Elo ${Math.round(topArena.metricas.arena_texto)}` : '')}
</div>
<section class="cartao" aria-labelledby="t-ranking">
<h2 id="t-ranking" class="oculto">Ranking geral</h2>
${filtros}
<div class="rolagem">
<table class="tabela" id="ranking">
<caption class="oculto">Ranking geral: ${ranking.length} modelos com benchmark objetivo</caption>
<thead><tr>
${th('#', { titulo: 'Posição' })}
${th('Modelo', { esq: true, tipo: 'texto' })}
${th('Nota', { titulo: 'Nota RankingIA (0 a 100)' })}
${ponderadas.map((x) => th(esc(x.curto), { titulo: x.desc })).join('')}
${categorias.map((x) => th(esc(x.curto), { cls: 'cat', titulo: x.desc })).join('')}
${extras.map((x) => th(esc(x.curto), { cls: 'cat', titulo: x.desc })).join('')}
${th('Entrada', { titulo: 'Preço por 1 milhão de tokens de entrada' })}
${th('Saída', { titulo: 'Preço por 1 milhão de tokens de saída' })}
${th('Contexto', { titulo: 'Janela de contexto em tokens' })}
${th('Lançado', { titulo: 'Data em que entrou no OpenRouter' })}
<th scope="col">Comparar</th>
</tr></thead>
<tbody>
${ranking.map(linhaRanking).join('\n')}
</tbody>
</table>
</div>
</section>
<h2 id="t-outros">Outros modelos (só preferência humana)</h2>
<p class="fraco">Estes ${outros.length} modelos ainda não têm benchmark objetivo (LiveBench${dados.fontes.artificialanalysis?.coletadoEm ? ' ou Artificial Analysis' : ''}), por isso ficam fora da nota. Estão ordenados pelo Elo da LMArena; os mesmos filtros valem aqui.</p>
<section class="cartao" aria-labelledby="t-outros">
<div class="rolagem">
<table class="tabela" id="outros">
<thead><tr>
${th('Modelo', { esq: true, tipo: 'texto' })}
${['arena_texto', 'arena_webdev', 'arena_visao'].filter((id) => met[id]).map((id) => th(esc(met[id].curto), { titulo: met[id].desc })).join('')}
${th('Entrada', { titulo: 'Preço por 1 milhão de tokens de entrada' })}
${th('Saída', { titulo: 'Preço por 1 milhão de tokens de saída' })}
${th('Contexto')}
${th('Lançado')}
<th scope="col">Comparar</th>
</tr></thead>
<tbody>
${outros.map(linhaOutro).join('\n')}
</tbody>
</table>
</div>
</section>
<div class="comparar-barra" id="comparar-barra" hidden>
<span id="comparar-n"></span>
<button type="button" class="limpar" id="comparar-limpar">limpar</button>
<a class="botao" id="comparar-ir" href="/comparar.html">Comparar</a>
</div>`,
});
gravarTexto('public/index.html', index);

// ---------- página de cada modelo ----------
function paginaModelo(m) {
  const linhas = metricas.filter((x) => m.metricas[x.id] != null).map((x) => `<tr>
<th scope="row" class="esq">${esc(x.nome)}${x.peso > 0 ? ` <span class="selo" title="Entra na nota com peso ${x.peso}">peso ${nf(x.peso, x.peso % 1 ? 1 : 0)}</span>` : ''}</th>
<td>${valor(m, x.id)}${x.unidade === '%' ? '' : ''}</td>
<td>${m.percentis[x.id] != null ? `${nf(m.percentis[x.id], 0)}%${barra(m.percentis[x.id])}` : '—'}</td>
<td class="esq"><a href="${FONTES[x.fonte].url}" rel="noopener">${esc(FONTES[x.fonte].nome)}</a></td>
</tr>`).join('\n');
  const o = m.origens;
  const links = [
    o.openrouter && [`https://openrouter.ai/${o.openrouter}`, 'OpenRouter'],
    m.hf && [`https://huggingface.co/${m.hf}`, 'Hugging Face (pesos)'],
    o.lmarena && ['https://lmarena.ai/leaderboard', 'LMArena'],
    o.livebench && ['https://livebench.ai/', 'LiveBench'],
    o.artificialanalysis && [`https://artificialanalysis.ai/models/${o.artificialanalysis}`, 'Artificial Analysis'],
  ].filter(Boolean);
  const precoTxt = m.precoEntrada != null ? `${preco(m.precoEntrada)} / ${preco(m.precoSaida)}` : '—';
  const resumo = m.parcial
    ? `${m.nome}${m.empresa ? ` (${m.empresa})` : ''}: Elo na LMArena${m.metricas.arena_texto ? ` ${Math.round(m.metricas.arena_texto)}` : ''}, preço ${precoTxt} por 1M tokens e contexto ${contexto(m.contexto)}.`
    : `${m.nome}${m.empresa ? ` (${m.empresa})` : ''} está em ${m.posicao}º no RankingIA com nota ${nf(m.nota)}. Veja notas no LiveBench e na LMArena, preço (${precoTxt} por 1M tokens) e contexto.`;
  return pagina({
    titulo: `${m.nome} — nota, benchmarks e preço | RankingIA`,
    descricao: resumo,
    caminho: `/modelo/${m.slug}.html`,
    versao, dados,
    conteudo: `<nav class="fraco"><a href="/">Ranking</a> › ${esc(m.nome)}</nav>
<div class="cabeca-modelo">
<div>
<h1>${esc(m.nome)}${selo(m)}</h1>
<p class="empresa">${esc(m.empresa ?? 'Empresa não informada')}</p>
</div>
<div class="placar">
${m.parcial
    ? `<span class="fraco">Fora da nota: sem benchmark objetivo</span>`
    : `<span class="grande">${nf(m.nota)}</span><span class="fraco">${m.posicao}º de ${ranking.length} no ranking geral</span>`}
</div>
</div>
<dl class="fichas">
<div class="cartao"><dt>Entrada / saída</dt><dd>${m.precoEntrada != null ? `${precoH(m.precoEntrada)} / ${precoH(m.precoSaida)}` : '—'}</dd><small>${SIGLA} por 1M tokens</small></div>
<div class="cartao"><dt>Contexto</dt><dd>${contexto(m.contexto)}</dd><small>tokens</small></div>
<div class="cartao"><dt>Lançamento</dt><dd>${dataBR(m.lancamento)}</dd><small>entrada no OpenRouter</small></div>
<div class="cartao"><dt>Pesos</dt><dd>${m.aberto ? 'Abertos' : m.aberto === false ? 'Fechados' : '—'}</dd><small>${m.hf ? `<a href="https://huggingface.co/${esc(m.hf)}" rel="noopener">${esc(m.hf)}</a>` : '&nbsp;'}</small></div>
${m.velocidade != null ? `<div class="cartao"><dt>Velocidade</dt><dd>${nf(m.velocidade, 0)} tok/s</dd><small>1º token em ${nf(m.ttft, 2)} s</small></div>` : ''}
</dl>
<section class="cartao" aria-labelledby="t-notas">
<div class="filtros"><h2 id="t-notas" class="oculto">Notas por fonte</h2><strong>Notas por fonte</strong><span class="contagem">percentil = % dos modelos do ranking geral que ele supera</span></div>
<div class="rolagem">
<table class="tabela">
<thead><tr><th scope="col" class="esq">Métrica</th><th scope="col">Valor</th><th scope="col">Percentil</th><th scope="col" class="esq">Fonte</th></tr></thead>
<tbody>
${linhas}
</tbody>
</table>
</div>
</section>
<p></p>
<p><a class="botao" href="/comparar.html?m=${encodeURIComponent(m.slug)}${top && top.slug !== m.slug ? ',' + encodeURIComponent(top.slug) : ''}">Comparar com outros modelos</a></p>
${links.length ? `<h2>Nas fontes</h2>\n<ul class="links">${links.map(([u, n]) => `<li><a class="botao leve" href="${esc(u)}" rel="noopener">${n}</a></li>`).join('')}</ul>` : ''}`,
  });
}
for (const m of modelos) gravarTexto(`public/modelo/${m.slug}.html`, paginaModelo(m));

// ---------- gráficos ----------
const blocoGrafico = (id, titulo, texto, { largo = false } = {}) => `<section class="cartao grafico${largo ? ' largo' : ''}" aria-labelledby="t-${id}">
<h2 id="t-${id}">${titulo}</h2>
<p>${texto}</p>
<div class="tela"><canvas id="g-${id}" role="img" aria-label="${esc(titulo)}"></canvas></div>
<details><summary>Ver os dados em tabela</summary><div class="rolagem" id="d-${id}"></div></details>
</section>`;
gravarTexto('public/graficos.html', pagina({
  titulo: 'Gráficos — qualidade × preço dos modelos de IA | RankingIA',
  descricao: 'Gráficos de qualidade contra preço, preferência humana contra preço e evolução dos modelos de IA (LLMs) no LiveBench.',
  caminho: '/graficos.html',
  versao, dados,
  scripts: ['/vendor/chart.umd.min.js', '/assets/comum.js', '/assets/graficos.js'],
  conteudo: `<div class="intro"><div><h1>Gráficos</h1><p>Passe o mouse (ou toque) num ponto para ver o modelo. Clique num ponto para abrir a página dele. O preço é a média de 3 partes de entrada para 1 de saída, por milhão de tokens, em escala logarítmica.</p></div></div>
<div class="graficos">
${blocoGrafico('nota-preco', 'Nota RankingIA × preço', 'Quanto mais para cima e para a esquerda, melhor o custo-benefício.')}
${blocoGrafico('arena-preco', 'Preferência humana (Arena) × preço', 'Elo de texto da LMArena; inclui modelos fora do ranking geral.')}
${dados.fontes.artificialanalysis?.coletadoEm ? blocoGrafico('nota-velocidade', 'Nota RankingIA × velocidade', 'Tokens por segundo medidos pela Artificial Analysis.') : ''}
${blocoGrafico('evolucao', 'Evolução no LiveBench', 'Nota geral do LiveBench 2.0 em cada release, para os 8 primeiros do ranking.', { largo: true })}
${blocoGrafico('historico', 'Evolução da Nota RankingIA', 'Nota diária dos 8 primeiros do ranking desde que o site começou a coletar.', { largo: true })}
</div>`,
}));

// ---------- comparar ----------
gravarTexto('public/comparar.html', pagina({
  titulo: 'Comparar modelos de IA lado a lado | RankingIA',
  descricao: 'Escolha até 4 modelos de IA e compare nota, benchmarks do LiveBench, Elo da LMArena, preço e contexto lado a lado.',
  caminho: '/comparar.html',
  versao, dados,
  scripts: ['/vendor/chart.umd.min.js', '/assets/comum.js', '/assets/comparar.js'],
  conteudo: `<div class="intro"><div><h1>Comparar modelos</h1><p>Escolha de 2 a 4 modelos. O endereço da página guarda a escolha, então dá para mandar o link.</p></div></div>
<section class="cartao" aria-label="Escolha dos modelos">
<div class="seletor" id="seletor">
${[1, 2, 3, 4].map((i) => `<label><span class="oculto">Modelo ${i}</span><select id="s${i}"><option value="">Modelo ${i}${i > 2 ? ' (opcional)' : ''}</option></select></label>`).join('\n')}
</div>
</section>
<p></p>
<div class="grade-2">
<section class="cartao" aria-labelledby="t-comp"><h2 id="t-comp" class="oculto">Tabela comparativa</h2><div class="rolagem" id="comparativo"><p class="fraco pad">Escolha os modelos acima.</p></div></section>
<section class="cartao grafico" aria-labelledby="t-radar"><h2 id="t-radar">Perfil por categoria</h2><p>Percentil em cada métrica (100 = melhor do ranking).</p><div class="tela"><canvas id="radar" role="img" aria-label="Radar com o percentil de cada modelo por métrica"></canvas></div></section>
</div>`,
}));

// ---------- metodologia ----------
const status = Object.entries(dados.fontes).map(([id, f]) => `<tr><td>${esc(FONTES[id].nome)}</td><td>${f.ok ? 'ok' : esc(f.erro ?? 'falhou')}</td><td>${dataHora(f.coletadoEm)}</td></tr>`).join('');
gravarTexto('public/metodologia.html', pagina({
  titulo: 'Metodologia — como a nota do RankingIA é calculada',
  descricao: 'De onde vêm os dados do RankingIA, como juntamos LiveBench, LMArena, OpenRouter e Artificial Analysis numa nota de 0 a 100 e quais são os limites.',
  caminho: '/metodologia.html',
  versao, dados,
  conteudo: `<div class="texto">
<h1>Metodologia</h1>
<p>O RankingIA não roda testes próprios. Ele junta placares públicos que medem coisas diferentes e mostra tudo num lugar só, com preço e contexto ao lado. Os dados são coletados uma vez por dia.</p>
<h2>Fontes</h2>
<ul>
<li><a href="https://livebench.ai/" rel="noopener">LiveBench</a>: benchmark objetivo, com questões novas a cada release para evitar contaminação. Usamos a nota geral do LiveBench 2.0 (com os pesos do próprio LiveBench) e cada categoria.</li>
<li><a href="https://lmarena.ai/leaderboard" rel="noopener">LMArena</a>: pessoas comparam duas respostas às cegas e votam. Vira um Elo. Usamos as arenas de texto, WebDev e visão, do dataset público <code>lmarena-ai/leaderboard-dataset</code>. Quando um modelo tem vários modos (por exemplo "High" e "Max"), fica o melhor Elo.</li>
<li><a href="https://openrouter.ai/models" rel="noopener">OpenRouter</a>: preço por milhão de tokens, janela de contexto, data de lançamento e se os pesos são abertos.</li>
<li><a href="https://artificialanalysis.ai/" rel="noopener">Artificial Analysis</a>: Intelligence Index, Humanity's Last Exam, Terminal-Bench, GPQA e contexto longo, além de preço e velocidade. A API lista cada modo de esforço como um modelo; fica o melhor modo. ${dados.fontes.artificialanalysis?.coletadoEm ? 'Em uso.' : 'Ainda não está em uso neste site; entra quando a chave da API for configurada.'}</li>
</ul>
<h2>Nota RankingIA</h2>
<ol>
<li>Entram no ranking geral os modelos com ao menos um benchmark objetivo (${dados.exigeUmaDe.map((id) => esc(met[id]?.nome ?? id)).join(' ou ')}). Os demais aparecem em "outros modelos", sem nota.</li>
<li>Para cada métrica, calculamos o <strong>percentil</strong>: a porcentagem dos modelos do ranking geral que este modelo supera (empate conta meio). Assim, Elo e porcentagem de acerto ficam na mesma escala de 0 a 100.</li>
<li>A nota é a média ponderada dos percentis que o modelo tem. Métrica que falta não conta, nem contra nem a favor; a <strong>cobertura</strong> mostra quanto do peso total o modelo tem.</li>
<li>Para quem tem pouca evidência não pular para o topo com uma métrica só, a média recebe ${nf(PESO_NEUTRO, 0)} de peso extra com percentil 50. Quem tem várias métricas quase não muda.</li>
</ol>
<table><thead><tr><th>Métrica</th><th>Peso</th><th>Fonte</th></tr></thead><tbody>
${ponderadas.map((x) => `<tr><td>${esc(x.nome)}</td><td>${nf(x.peso, x.peso % 1 ? 1 : 0)}</td><td>${esc(FONTES[x.fonte].nome)}</td></tr>`).join('')}
</tbody></table>
<p>As categorias do LiveBench${extras.length ? ' e os índices extras' : ''} aparecem nas tabelas, mas não entram duas vezes na nota.</p>
<h2>Nomes dos modelos</h2>
<p>Cada fonte escreve o nome de um jeito ("Claude Opus 5.5 (High)", "anthropic/claude-opus-5.5"). Juntamos por uma chave sem empresa, data e modo de esforço; os casos que a regra não pega ficam numa lista de apelidos revisada à mão. Se algum modelo aparecer duplicado ou trocado, <a href="https://github.com/RicardoBiazin/RankingIA/issues" rel="noopener">abra uma issue</a>.</p>
<h2>Limites</h2>
<ul>
<li>Percentil depende do grupo: quando um modelo forte entra, os outros podem cair sem ter piorado.</li>
<li>O LiveBench testa poucos modelos; quem não está lá só entra no ranking geral pela Artificial Analysis, quando ela estiver ativa.</li>
<li>Elo mede preferência, não acerto. Estilo e tamanho da resposta influenciam.</li>
<li>Preço é o do OpenRouter (o menor entre provedores); o preço direto no fabricante pode ser outro.</li>
</ul>
<h2>Situação das fontes</h2>
<table><thead><tr><th>Fonte</th><th>Última coleta</th><th>Dados de</th></tr></thead><tbody>${status}</tbody></table>
<p>Os dados de cada fonte são de seus donos e seguem os termos deles. O código do RankingIA é aberto, licença MIT, em <a href="https://github.com/RicardoBiazin/RankingIA" rel="noopener">github.com/RicardoBiazin/RankingIA</a>.</p>
</div>`,
}));

// ---------- 404 ----------
gravarTexto('public/404.html', pagina({
  titulo: 'Página não encontrada | RankingIA',
  descricao: 'Página não encontrada no RankingIA. Volte ao ranking de modelos de IA para ver notas, preços e comparações.',
  caminho: '/404.html',
  versao, dados, noindex: true,
  conteudo: '<div class="texto"><h1>Página não encontrada</h1><p>O modelo pode ter mudado de nome numa das fontes. <a href="/">Voltar ao ranking</a>.</p></div>',
}));

// ---------- arquivos de apoio ----------
const css = readFileSync(caminho('src/assets/estilo.css'), 'utf8')
  + '\n/* Larguras das barras (geradas) */\n' + Array.from({ length: 101 }, (_, i) => `.barra i.w${i}{width:${i}%}`).join('\n') + '\n';
gravarTexto('public/assets/estilo.css', css);
for (const a of ['tema.js', 'moeda.js', 'tabela.js', 'graficos.js', 'comparar.js', 'comum.js']) copyFileSync(caminho('src/assets/' + a), caminho('public/assets/' + a));
mkdirSync(caminho('public/vendor'), { recursive: true });
copyFileSync(caminho('node_modules/chart.js/dist/chart.umd.min.js'), caminho('public/vendor/chart.umd.min.js'));
gravarTexto('public/favicon.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2a78d6"/><rect x="7" y="17" width="4.5" height="8" rx="1.5" fill="#fff"/><rect x="13.75" y="8" width="4.5" height="17" rx="1.5" fill="#fff"/><rect x="20.5" y="13" width="4.5" height="12" rx="1.5" fill="#fff"/></svg>\n');
gravarTexto('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
const hoje = dados.geradoEm.slice(0, 10);
const urls = ['/', '/graficos.html', '/comparar.html', '/metodologia.html', ...modelos.map((m) => `/modelo/${m.slug}.html`)];
gravarTexto('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${SITE}${u}</loc><lastmod>${hoje}</lastmod></url>`).join('\n')}\n</urlset>\n`);

console.log(`public/: ${modelos.length} páginas de modelo, ranking com ${ranking.length}, outros ${outros.length} (v${versao})`);
