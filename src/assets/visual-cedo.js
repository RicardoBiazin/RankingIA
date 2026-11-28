// Visual escolhido nas páginas do Padrão que não são a inicial (modelo, gráficos, comparar, metodologia):
// marca o <html> com data-visual e liga o skin do visual (/<id>/skin.css) antes de a página aparecer.
// Roda no <head>, por isso fica separado de visual.js. Sem JS ou sem escolha salva, a página é o Padrão.
(function () {
  var VISUAIS = ['instagram', 'lens', 'apple']; // conferido contra src/temas.mjs pelo testar
  var salvo = null;
  try { salvo = localStorage.getItem('visual'); } catch (e) { /* sem storage */ }
  if (VISUAIS.indexOf(salvo) < 0) return;
  var versao = ((document.currentScript && document.currentScript.src.match(/[?&]v=([\w.-]+)/)) || [])[1] || '';
  document.documentElement.setAttribute('data-visual', salvo);
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/' + salvo + '/skin.css' + (versao ? '?v=' + versao : '');
  document.head.appendChild(link);
})();
