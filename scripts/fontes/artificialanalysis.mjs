// Artificial Analysis: Intelligence Index, benchmarks (HLE, Terminal-Bench, GPQA,
// contexto longo), preço e velocidade. API grátis com chave (AA_API_KEY); citação
// obrigatória no site. Sem chave a fonte é pulada.
// A API lista cada modo ("(Max)", "(Xhigh)") como um modelo; fica o melhor por chave.

import { buscar, chave, empresa } from '../util.mjs';

export const ID = 'artificialanalysis';
export const PRECISA_CHAVE = 'AA_API_KEY';

const num = (v) => (v == null || v === '' || !Number.isFinite(Number(v)) ? null : Number(v));
const pct = (v) => (num(v) == null ? null : +(Number(v) * 100).toFixed(1)); // a API dá 0..1

export function converter(j) {
  const porChave = new Map();
  for (const m of j.data ?? []) {
    const e = m.evaluations ?? {};
    const x = {
      origem: m.slug ?? m.id,
      chave: chave(m.name ?? m.slug),
      nome: String(m.name ?? m.slug).replace(/\s*\([^)]*\)\s*/g, ' ').trim(),
      empresa: empresa(m.model_creator?.name ?? m.model_creator?.slug),
      lancamento: m.release_date ?? null,
      inteligencia: num(e.artificial_analysis_intelligence_index),
      hle: pct(e.hle),
      terminal: pct(e.terminalbench_v4_0),
      gpqa: pct(e.gpqa),
      contextoLongo: pct(e.lcr),
      precoEntrada: num(m.pricing?.price_1m_input_tokens),
      precoSaida: num(m.pricing?.price_1m_output_tokens),
      velocidade: num(m.median_output_tokens_per_second),
      ttft: num(m.median_time_to_first_token_seconds),
    };
    const atual = porChave.get(x.chave);
    const forca = (y) => [y.inteligencia ?? -1, y.hle ?? -1];
    if (!atual || forca(x)[0] > forca(atual)[0] || (forca(x)[0] === forca(atual)[0] && forca(x)[1] > forca(atual)[1])) porChave.set(x.chave, x);
  }
  return [...porChave.values()];
}

export async function coletar() {
  const r = await buscar('https://artificialanalysis.ai/api/v2/data/llms/models', { headers: { 'x-api-key': process.env.AA_API_KEY } });
  const modelos = converter(await r.json());
  if (modelos.length < 10) throw new Error(`Artificial Analysis devolveu só ${modelos.length} modelos`);
  return { modelos };
}
