// OpenRouter: preço, contexto, data de lançamento e pesos abertos. API pública, sem chave.

import { buscar, chave, empresa } from '../util.mjs';

export const ID = 'openrouter';

export async function coletar() {
  const j = await (await buscar('https://openrouter.ai/api/v1/models')).json();
  const modelos = [];
  for (const m of j.data) {
    if (m.id.includes(':')) continue; // variantes :free, :extended etc.
    const entrada = Number(m.pricing?.prompt), saida = Number(m.pricing?.completion);
    if (!(entrada >= 0) || !(saida >= 0)) continue; // roteadores com preço -1
    modelos.push({
      origem: m.id,
      chave: chave(m.id),
      nome: m.name.replace(/^[^:]{1,40}:\s+/, ''),
      empresa: empresa(m.id.split('/')[0]),
      precoEntrada: +(entrada * 1e6).toFixed(4),
      precoSaida: +(saida * 1e6).toFixed(4),
      contexto: m.context_length ?? null,
      lancamento: m.created ? new Date(m.created * 1000).toISOString().slice(0, 10) : null,
      aberto: Boolean(m.hugging_face_id),
      hf: m.hugging_face_id || null,
    });
  }
  if (modelos.length < 50) throw new Error(`OpenRouter devolveu só ${modelos.length} modelos`);
  return { modelos };
}
