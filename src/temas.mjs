// Visuais do site: o Padrão (raiz) e três alternativos (Instagram, Lens, Apple) só para a página
// inicial (o ranking), em /instagram/, /lens/ e /apple/ (e /en/instagram/ etc. nos outros idiomas).
// As demais páginas (modelo, gráficos, comparar, metodologia) são as do Padrão. O seletor fica no
// cabeçalho de todas as páginas; a escolha fica só neste navegador (assets/visual.js).

export const TEMAS = [
  { id: 'padrao', nome: null }, // nome vem da tradução (visual.padrao)
  { id: 'instagram', nome: 'Instagram' },
  { id: 'lens', nome: 'Lens' },
  { id: 'apple', nome: 'Apple' },
];
export const TEMAS_ALTERNATIVOS = TEMAS.filter((x) => x.id !== 'padrao');

/**
 * Endereço do visual `id` no idioma. `rel`: página atual do Padrão ('/', '/graficos.html'...);
 * o Padrão fica na mesma página, os alternativos só existem na inicial.
 */
export function urlTema(idioma, id, rel = '/') {
  const pre = idioma.pasta ? '/' + idioma.pasta : '';
  return id === 'padrao' ? `${pre}${rel}` : `${pre}/${id}/`;
}

/** Menu "Visual: Padrão · Instagram · Lens · Apple". */
export function seletorVisual(idioma, t, atual = 'padrao', rel = '/') {
  const nome = (x) => (x.nome ?? t('visual.padrao'));
  return `<nav class="visuais" aria-label="${t('visual.titulo').replace(/"/g, '&quot;')}" data-atual="${atual}"><span class="rotulo-visual">${t('visual.rotulo')}</span>${TEMAS.map((x) =>
    `<a href="${urlTema(idioma, x.id, rel)}" data-visual="${x.id}"${x.id === atual ? ' aria-current="true"' : ''}>${nome(x)}</a>`).join('')}</nav>`;
}
