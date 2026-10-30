// LiveBench 2.0: notas por categoria do último release e a nota geral de todos os
// releases (para o gráfico de evolução). A lista de releases sai do bundle do site.

import { buscar, chave, lerCSV } from '../util.mjs';

export const ID = 'livebench';
const BASE = 'https://livebench.ai';

async function releases() {
  const html = await (await buscar(BASE + '/')).text();
  const js = html.match(/src="\.?\/?(static\/js\/main\.[^"]+\.js)"/)?.[1];
  if (!js) throw new Error('LiveBench: bundle não encontrado');
  const codigo = await (await buscar(`${BASE}/${js}`)).text();
  // O maior vetor de datas AAAAMMDD é a lista de releases do 2.0.
  const listas = [...codigo.matchAll(/\[((?:"20\d{6}",?){2,})\]/g)].map((m) => JSON.parse(`[${m[1]}]`));
  const lista = listas.sort((a, b) => b.length - a.length)[0];
  if (!lista?.length) throw new Error('LiveBench: lista de releases não encontrada');
  return [...new Set(lista)].sort();
}

// Nota geral = média ponderada das categorias (pesos do próprio LiveBench);
// cada categoria = média das suas colunas. Sem todas as categorias, sem nota geral.
export function notas(linhas, categorias) {
  const pesos = categorias._overall_weights ?? {};
  const cats = Object.entries(categorias).filter(([k]) => !k.startsWith('_'));
  return linhas.map((l) => {
    const porCat = {};
    for (const [cat, cols] of cats) {
      const v = cols.map((c) => l[c]).filter((x) => x != null && x !== '').map(Number).filter(Number.isFinite);
      if (v.length === cols.length) porCat[cat] = +(v.reduce((a, b) => a + b, 0) / v.length).toFixed(2);
    }
    let soma = 0, peso = 0;
    for (const [cat] of cats) if (cat in porCat) { const w = pesos[cat] ?? 1; soma += w * porCat[cat]; peso += w; }
    const completo = Object.keys(porCat).length === cats.length;
    return { origem: l.model, chave: chave(l.model), geral: completo ? +(soma / peso).toFixed(2) : null, categorias: porCat };
  });
}

export async function coletar() {
  const lista = await releases();
  const historico = [];
  let ultimo = null;
  for (const r of lista) {
    try {
      const [tab, cat] = await Promise.all([
        buscar(`${BASE}/data/${r}/table.csv`).then((x) => x.text()),
        buscar(`${BASE}/data/${r}/categories.json`).then((x) => x.json()),
      ]);
      const ns = notas(lerCSV(tab), cat);
      const data = `${r.slice(0, 4)}-${r.slice(4, 6)}-${r.slice(6, 8)}`;
      historico.push({ data, modelos: Object.fromEntries(ns.filter((n) => n.geral != null).map((n) => [n.chave, n.geral])) });
      ultimo = { release: data, categorias: Object.keys(cat).filter((k) => !k.startsWith('_')), pesos: cat._overall_weights ?? {}, modelos: ns };
    } catch (e) {
      console.warn(`  LiveBench ${r}: ${e.message}`);
    }
  }
  if (!ultimo || ultimo.modelos.length < 5) throw new Error('LiveBench: último release sem dados');
  return { ...ultimo, historico };
}
