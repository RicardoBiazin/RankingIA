// Câmbio para mostrar preços em real e euro: cotação de referência do Banco Central
// Europeu, pela API pública do Frankfurter (sem chave). Os preços das fontes são em US$.

import { buscar } from '../util.mjs';

export const ID = 'cambio';
export const MOEDAS = ['BRL', 'EUR'];

export async function coletar() {
  const j = await (await buscar(`https://api.frankfurter.dev/v1/latest?base=USD&symbols=${MOEDAS.join(',')}`)).json();
  const taxas = {};
  for (const m of MOEDAS) {
    const v = Number(j.rates?.[m]);
    if (!(v > 0)) throw new Error(`câmbio sem ${m}`);
    taxas[m] = v;
  }
  return { data: j.date, base: 'USD', taxas };
}
