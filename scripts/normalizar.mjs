// Junta as fontes brutas num registro por modelo, calcula percentis, a Nota RankingIA
// e a cobertura. Grava dados/modelos.json e o snapshot do dia em dados/historico/.
// Uso: node scripts/normalizar.mjs

import { chave, empresaPorNome, gravarJSON, lerJSON } from './util.mjs';
import { METRICAS, CATEGORIAS_LB, EXIGE_UMA_DE, PESO_NEUTRO } from '../src/pesos.mjs';

const aliases = lerJSON('dados/aliases.json', {});
const k = (origem) => { const c = chave(origem); return aliases[c] ?? c; };
const status = lerJSON('dados/status.json', {});
const or = lerJSON('dados/brutos/openrouter.json');
const lb = lerJSON('dados/brutos/livebench.json');
const arena = lerJSON('dados/brutos/lmarena.json');
const aa = lerJSON('dados/brutos/artificialanalysis.json');
const cambio = lerJSON('dados/brutos/cambio.json');

const modelos = new Map();
const pegar = (c) => {
  if (!modelos.has(c)) modelos.set(c, { chave: c, metricas: {}, origens: {} });
  return modelos.get(c);
};
const tirarModo = (nome) => nome.replace(/\s*\([^)]*\)\s*/g, ' ').trim();

// Fontes de qualidade: definem quem entra no ranking.
const metricasLB = [];
if (lb) {
  for (const cat of lb.categorias) {
    const c = CATEGORIAS_LB[cat] ?? { id: 'lb_' + cat.toLowerCase().replace(/\W+/g, '_'), nome: cat };
    metricasLB.push({ id: c.id, nome: c.nome, curto: c.nome, fonte: 'livebench', peso: 0, unidade: '%', categoria: true, desc: `Categoria "${cat}" do LiveBench 2.0${lb.pesos[cat] ? ` (peso ${lb.pesos[cat]} na nota geral do LiveBench)` : ''}.` });
  }
  for (const m of lb.modelos) {
    const r = pegar(k(m.origem));
    // Duas linhas do LiveBench na mesma chave: fica a de maior nota geral.
    if (r.origens.livebench && (r.metricas.lb_geral ?? -1) >= (m.geral ?? -1)) continue;
    r.origens.livebench = m.origem;
    r.nomeLB = m.origem;
    if (m.geral != null) r.metricas.lb_geral = m.geral;
    for (const [cat, v] of Object.entries(m.categorias)) r.metricas[(CATEGORIAS_LB[cat]?.id) ?? 'lb_' + cat.toLowerCase().replace(/\W+/g, '_')] = v;
  }
}
if (arena) {
  for (const [nome, a] of Object.entries(arena.arenas)) {
    for (const m of a.modelos) {
      const r = pegar(k(m.origem));
      const id = 'arena_' + nome;
      if ((r.metricas[id] ?? -Infinity) >= m.elo) continue;
      r.metricas[id] = m.elo;
      r.origens.lmarena = r.origens.lmarena ?? m.origem;
      r.nomeArena = r.nomeArena ?? tirarModo(m.origem);
      r.empresaArena = r.empresaArena ?? m.empresa;
      if (m.aberto != null) r.abertoArena = m.aberto;
    }
  }
}
if (aa) {
  for (const m of aa.modelos) {
    const r = pegar(k(m.nome ?? m.origem)); // o slug da AA troca ponto por hífen; o nome não
    if (r.origens.artificialanalysis) continue;
    r.origens.artificialanalysis = m.origem;
    r.aa = m;
    for (const [id, campo] of [['aa_inteligencia', 'inteligencia'], ['aa_hle', 'hle'], ['aa_terminal', 'terminal'], ['aa_gpqa', 'gpqa'], ['aa_contexto', 'contextoLongo']]) {
      if (m[campo] != null) r.metricas[id] = m[campo];
    }
  }
}

// Só entra quem tem ao menos uma métrica de qualidade.
for (const [c, r] of modelos) if (!Object.keys(r.metricas).length) modelos.delete(c);

// OpenRouter só completa preço, contexto, lançamento e pesos abertos.
const porChaveOR = new Map();
for (const m of or?.modelos ?? []) { const c = k(m.origem); if (!porChaveOR.has(c)) porChaveOR.set(c, m); }

const lista = [...modelos.values()].map((r) => {
  const o = porChaveOR.get(r.chave);
  if (o) r.origens.openrouter = o.origem;
  return {
    chave: r.chave,
    slug: r.chave.replace(/\+/g, '-plus'),
    nome: o?.nome ?? r.aa?.nome ?? r.nomeArena ?? r.nomeLB ?? r.chave,
    empresa: o?.empresa ?? r.aa?.empresa ?? r.empresaArena ?? empresaPorNome(r.chave),
    aberto: o ? (o.aberto || r.abertoArena === true) : (r.abertoArena ?? null),
    hf: o?.hf ?? null,
    lancamento: o?.lancamento ?? r.aa?.lancamento ?? null,
    contexto: o?.contexto ?? null,
    precoEntrada: o?.precoEntrada ?? r.aa?.precoEntrada ?? null,
    precoSaida: o?.precoSaida ?? r.aa?.precoSaida ?? null,
    velocidade: r.aa?.velocidade ?? null,
    ttft: r.aa?.ttft ?? null,
    metricas: r.metricas,
    origens: r.origens,
  };
});

// Percentil = % dos modelos do ranking geral que o modelo supera nessa métrica
// (empate conta meio). Todos, inclusive os de fora, são medidos contra esse grupo.
const todas = [...METRICAS, ...metricasLB];
const disponiveis = todas.filter((m) => lista.some((x) => x.metricas[m.id] != null));
for (const x of lista) x.parcial = !EXIGE_UMA_DE.some((id) => x.metricas[id] != null);
const grupo = lista.filter((x) => !x.parcial);
for (const met of disponiveis) {
  const pop = grupo.filter((x) => x.metricas[met.id] != null);
  for (const x of lista) {
    const v = x.metricas[met.id];
    if (v == null) continue;
    const outros = pop.filter((y) => y !== x);
    if (!outros.length) continue;
    const abaixo = outros.filter((y) => y.metricas[met.id] < v).length;
    const iguais = outros.filter((y) => y.metricas[met.id] === v).length;
    (x.percentis ??= {})[met.id] = +((abaixo + iguais / 2) / outros.length * 100).toFixed(1);
  }
}

const pesoTotal = disponiveis.reduce((s, m) => s + m.peso, 0);
for (const x of lista) {
  x.percentis ??= {};
  let soma = 0, peso = 0;
  for (const m of disponiveis) if (m.peso > 0 && x.percentis[m.id] != null) { soma += m.peso * x.percentis[m.id]; peso += m.peso; }
  // Encolhe para 50 quem tem pouca evidência: PESO_NEUTRO de peso extra com percentil 50.
  x.nota = !x.parcial && peso ? +((soma + PESO_NEUTRO * 50) / (peso + PESO_NEUTRO)).toFixed(1) : null;
  x.cobertura = pesoTotal ? +(peso / pesoTotal).toFixed(2) : 0;
}
lista.sort((a, b) => (a.parcial - b.parcial) || ((b.nota ?? -1) - (a.nota ?? -1))
  || ((b.metricas.arena_texto ?? -1) - (a.metricas.arena_texto ?? -1)) || a.nome.localeCompare(b.nome));
let pos = 0;
for (const x of lista) x.posicao = x.parcial ? null : ++pos;

// Candidatos a alias: chave de qualidade sem par no OpenRouter, mas parecida com uma de lá.
const chavesOR = [...porChaveOR.keys()];
const candidatos = lista.filter((x) => !x.origens.openrouter).map((x) => ({
  chave: x.chave,
  parecidas: chavesOR.filter((c) => c.startsWith(x.chave + '-') || x.chave.startsWith(c + '-') || c.replace(/^[a-z]+-/, '') === x.chave || x.chave.replace(/^[a-z]+-/, '') === c),
})).filter((x) => x.parecidas.length);

const hoje = new Date().toISOString().slice(0, 10);
const fontes = {};
for (const [id, s] of Object.entries(status)) fontes[id] = { ok: s.ok, coletadoEm: s.coletadoEm ?? null, erro: s.ok ? null : s.erro ?? null };
if (lb) fontes.livebench.release = lb.release;
if (arena) fontes.lmarena.datas = Object.fromEntries(Object.entries(arena.arenas).map(([n, a]) => [n, a.data]));

gravarJSON('dados/modelos.json', {
  geradoEm: new Date().toISOString(),
  fontes,
  metricas: disponiveis,
  exigeUmaDe: EXIGE_UMA_DE,
  cambio: cambio ? { data: cambio.data, taxas: cambio.taxas } : null,
  modelos: lista,
});
gravarJSON('dados/candidatos-alias.json', candidatos);
gravarJSON(`dados/historico/${hoje}.json`, Object.fromEntries(lista.filter((x) => !x.parcial).map((x) => [x.chave, [x.nota, x.posicao]])), true);

console.log(`${lista.length} modelos (${pos} no ranking, ${lista.length - pos} parciais), ${disponiveis.length} métricas, ${candidatos.length} candidatos a alias`);
