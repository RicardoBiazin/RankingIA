// Moedas oferecidas no seletor: as 10 mais negociadas no mundo com o real no lugar
// do dólar de Singapura. Os preços das fontes são em US$; o câmbio vem do BCE.
export const MOEDAS = [
  { codigo: 'USD', simbolo: 'US$', nome: 'Dólar americano' },
  { codigo: 'BRL', simbolo: 'R$', nome: 'Real brasileiro' },
  { codigo: 'EUR', simbolo: '€', nome: 'Euro' },
  { codigo: 'JPY', simbolo: 'JP¥', nome: 'Iene japonês' },
  { codigo: 'GBP', simbolo: '£', nome: 'Libra esterlina' },
  { codigo: 'CNY', simbolo: 'CN¥', nome: 'Yuan chinês' },
  { codigo: 'AUD', simbolo: 'AU$', nome: 'Dólar australiano' },
  { codigo: 'CAD', simbolo: 'CA$', nome: 'Dólar canadense' },
  { codigo: 'CHF', simbolo: 'CHF', nome: 'Franco suíço' },
  { codigo: 'HKD', simbolo: 'HK$', nome: 'Dólar de Hong Kong' },
];

// Casas decimais por tamanho do valor, para a coluna não alargar: 107 em vez de 107,03.
export const casas = (v) => (v >= 100 ? 0 : v >= 0.1 ? 2 : 3);

export function formatar(v, moeda = 'USD') {
  if (v == null) return '—';
  if (v === 0) return 'grátis';
  const c = casas(v);
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: moeda, minimumFractionDigits: c, maximumFractionDigits: c }).format(v);
}
