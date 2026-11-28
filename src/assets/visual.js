// Visual do site: guarda a escolha do menu "Visual" e, na página inicial do Padrão, leva o
// visitante ao visual que ele escolheu da última vez. Sem JS, o menu funciona como links comuns.
(function () {
  var CHAVE = 'visual';
  var menu = document.querySelector('.visuais');
  if (!menu) return;
  var atual = menu.getAttribute('data-atual') || 'padrao';

  [].forEach.call(menu.querySelectorAll('a[data-visual]'), function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem(CHAVE, a.getAttribute('data-visual')); } catch (e) { /* sem storage */ }
    });
  });

  // Nas páginas do Padrão vestidas por um skin (visual-cedo.js), o menu marca o visual escolhido.
  var vestido = document.documentElement.getAttribute('data-visual');
  if (atual === 'padrao' && vestido) {
    [].forEach.call(menu.querySelectorAll('a[data-visual]'), function (a) {
      if (a.getAttribute('data-visual') === vestido) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }

  // Só a página inicial do Padrão redireciona; os outros visuais já são a escolha.
  if (atual !== 'padrao' || !document.body.hasAttribute('data-inicio')) return;
  var salvo = null;
  try { salvo = localStorage.getItem(CHAVE); } catch (e) { /* sem storage */ }
  if (!salvo || salvo === 'padrao' || !/^[a-z]+$/.test(salvo)) return;
  var alvo = menu.querySelector('a[data-visual="' + salvo + '"]');
  if (alvo) location.replace(alvo.getAttribute('href'));
})();
