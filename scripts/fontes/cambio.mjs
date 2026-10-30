// Câmbio para mostrar preços em outras moedas: cotação de referência do Banco Central
// Europeu, pela API pública do Frankfurter (sem chave). Os preços das fontes são em US$.

import { buscar } from '../util.mjs';
import { MOEDAS } from '../../src/moedas.mjs';

export const ID = 'cambio';
const CODIGOS = MOEDAS.map((m) => m.codigo).filter((c) => c !== 'USD');

export async function coletar() {
  const j = await (await buscar(`https://api.frankfurter.dev/v1/latest?base=USD&symbols=${CODIGOS.join(',')}`)).json();
  const taxas = {};
  for (const m of CODIGOS) {
    const v = Number(j.rates?.[m]);
    if (!(v > 0)) throw new Error(`câmbio sem ${m}`);
    taxas[m] = v;
  }
  return { data: j.date, base: 'USD', taxas };
}
