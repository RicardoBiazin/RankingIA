// Tema claro/escuro: segue o sistema; o botão fixa a escolha (guardada só neste navegador).
(function () {
  var raiz = document.documentElement;
  try { var salvo = localStorage.getItem('tema'); if (salvo === 'light' || salvo === 'dark') raiz.dataset.theme = salvo; } catch (e) { /* sem storage */ }
  document.addEventListener('DOMContentLoaded', function () {
    var botao = document.getElementById('tema');
    if (!botao) return;
    botao.addEventListener('click', function () {
      var escuro = raiz.dataset.theme ? raiz.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      raiz.dataset.theme = escuro ? 'light' : 'dark';
      try { localStorage.setItem('tema', raiz.dataset.theme); } catch (e) { /* sem storage */ }
      document.dispatchEvent(new CustomEvent('tema'));
    });
  });
})();
