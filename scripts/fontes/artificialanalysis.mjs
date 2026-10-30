// Artificial Analysis: índices de inteligência, código e matemática, preço e
// velocidade. API grátis com chave (AA_API_KEY); citação obrigatória no site.
// Sem chave a fonte é pulada.

import { buscar, chave, empresa } from '../util.mjs';

export const ID = 'artificialanalysis';
export const PRECISA_CHAVE = 'AA_API_KEY';

const num = (v) => (v == null || v === '' || !Number.isFinite(Number(v)) ? null : Number(v));

export function converter(j) {
  return (j.data ?? []).map((m) => ({
    origem: m.slug ?? m.id,
    chave: chave(m.slug ?? m.name),
    nome: m.name,
    empresa: empresa(m.model_creator?.name ?? m.model_creator?.slug),
    inteligencia: num(m.evaluations?.artificial_analysis_intelligence_index),
    codigo: num(m.evaluations?.artificial_analysis_coding_index),
    matematica: num(m.evaluations?.artificial_analysis_math_index),
    precoEntrada: num(m.pricing?.price_1m_input_tokens),
    precoSaida: num(m.pricing?.price_1m_output_tokens),
    velocidade: num(m.median_output_tokens_per_second),
    ttft: num(m.median_time_to_first_token_seconds),
  }));
}

export async function coletar() {
  const r = await buscar('https://artificialanalysis.ai/api/v2/data/llms/models', { headers: { 'x-api-key': process.env.AA_API_KEY } });
  const modelos = converter(await r.json());
  if (modelos.length < 10) throw new Error(`Artificial Analysis devolveu só ${modelos.length} modelos`);
  return { modelos };
}
