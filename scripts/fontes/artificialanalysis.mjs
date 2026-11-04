// Artificial Analysis: Intelligence Index, preço e velocidade. Endpoint grátis da API
// V2 (/api/v2/language/models/free), com chave (AA_API_KEY); citação obrigatória no
// site. Sem chave a fonte é pulada. O endpoint grátis não traz os benchmarks
// avulsos (HLE, Terminal-Bench, GPQA, contexto longo); o legado /api/v2/data/* saiu
// do ar em 04/11/2026.
// A API lista cada modo ("(Max)", "(Xhigh)") como um modelo; fica o melhor por chave.

import { buscar, chave, empresa } from '../util.mjs';

export const ID = 'artificialanalysis';
export const PRECISA_CHAVE = 'AA_API_KEY';
const URL_API = 'https://artificialanalysis.ai/api/v2/language/models/free';

const num = (v) => (v == null || v === '' || !Number.isFinite(Number(v)) ? null : Number(v));

export function converter(j) {
  const porChave = new Map();
  for (const m of j.data ?? []) {
    const e = m.evaluations ?? {};
    const p = m.performance ?? {};
    const x = {
      origem: m.slug ?? m.id,
      chave: chave(m.name ?? m.slug),
      nome: String(m.name ?? m.slug).replace(/\s*\([^)]*\)\s*/g, ' ').trim(),
      empresa: empresa(m.model_creator?.name ?? m.model_creator?.slug),
      lancamento: m.release_date ?? null,
      inteligencia: num(e.artificial_analysis_intelligence_index),
      precoEntrada: num(m.pricing?.price_1m_input_tokens),
      precoSaida: num(m.pricing?.price_1m_output_tokens),
      velocidade: num(p.median_output_tokens_per_second),
      ttft: num(p.median_time_to_first_token_seconds),
    };
    const atual = porChave.get(x.chave);
    if (!atual || (x.inteligencia ?? -1) > (atual.inteligencia ?? -1)) porChave.set(x.chave, x);
  }
  return [...porChave.values()];
}

// Paginado (200 por página); o limite grátis é de 100 pedidos por dia.
export async function coletar() {
  const data = [];
  for (let pagina = 1; pagina <= 50; pagina++) {
    const r = await buscar(`${URL_API}?page=${pagina}`, { headers: { 'x-api-key': process.env.AA_API_KEY } });
    const j = await r.json();
    data.push(...(j.data ?? []));
    if (!j.pagination?.has_more) break;
  }
  const modelos = converter({ data });
  if (modelos.length < 10) throw new Error(`Artificial Analysis devolveu só ${modelos.length} modelos`);
  return { modelos };
}
