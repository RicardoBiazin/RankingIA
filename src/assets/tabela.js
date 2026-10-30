// Ranking: ordenar por coluna, filtrar (busca, empresa, tipo, preço), mostrar
// categorias e escolher modelos para comparar.
(function () {
  'use strict';
  var tabelas = ['ranking', 'outros'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
  var busca = document.getElementById('busca');
  var fEmpresa = document.getElementById('f-empresa');
  var fTipo = document.getElementById('f-tipo');
  var fPreco = document.getElementById('f-preco');
  var fCat = document.getElementById('f-cat');
  var contagem = document.getElementById('contagem');
  var fMostrar = document.getElementById('f-mostrar');

  // Ordenação: clique alterna desc/asc; vazio fica sempre no fim.
  tabelas.forEach(function (tab) {
    var ths = tab.tHead.rows[0].cells;
    Array.prototype.forEach.call(ths, function (th, col) {
      var botao = th.querySelector('button');
      if (!botao) return;
      botao.addEventListener('click', function () {
        var texto = th.dataset.tipo === 'texto';
        var atual = th.getAttribute('aria-sort');
        var asc = atual ? atual === 'descending' : texto || col === 0 && th.textContent === '#';
        Array.prototype.forEach.call(ths, function (o) { o.removeAttribute('aria-sort'); });
        th.setAttribute('aria-sort', asc ? 'ascending' : 'descending');
        var corpo = tab.tBodies[0];
        var linhas = Array.prototype.slice.call(corpo.rows);
        linhas.sort(function (a, b) {
          var va = a.cells[col].dataset.v, vb = b.cells[col].dataset.v;
          if (va === '' || va == null) return (vb === '' || vb == null) ? 0 : 1;
          if (vb === '' || vb == null) return -1;
          var r = texto || isNaN(va) || isNaN(vb) ? va.localeCompare(vb, 'pt-BR') : Number(va) - Number(vb);
          return asc ? r : -r;
        });
        linhas.forEach(function (l) { corpo.appendChild(l); });
        filtrar(); // o limite vale para as primeiras na nova ordem
      });
    });
  });

  function filtrar() {
    var q = (busca.value || '').trim().toLowerCase();
    var emp = fEmpresa.value, tipo = fTipo.value, pmax = fPreco.value ? Number(fPreco.value) : null;
    var limite = fMostrar.value ? Number(fMostrar.value) : Infinity;
    tabelas.forEach(function (tab, i) {
      // Filtro primeiro; depois só as `limite` primeiras na ordem atual ficam visíveis.
      var achados = 0, total = 0;
      Array.prototype.forEach.call(tab.tBodies[0].rows, function (tr) {
        var d = tr.dataset;
        var ok = (!q || d.busca.indexOf(q) >= 0) && (!emp || d.empresa === emp) && (!tipo || d.aberto === tipo)
          && (pmax == null || (d.preco !== '' && Number(d.preco) <= pmax));
        total++;
        if (ok) achados++;
        tr.hidden = !ok || achados > limite;
      });
      var mostrados = Math.min(achados, limite);
      var txt = (mostrados < achados ? mostrados + ' de ' : '') + achados + (achados === 1 ? ' modelo' : ' modelos') + (achados < total ? ' (de ' + total + ')' : '');
      var alvo = i === 0 ? contagem : document.getElementById('contagem-outros');
      if (alvo) alvo.textContent = txt;
    });
  }
  [busca, fEmpresa, fTipo, fPreco, fMostrar].forEach(function (el) { el.addEventListener('input', filtrar); });
  fCat.addEventListener('change', function () { tabelas[0].classList.toggle('com-cat', fCat.checked); });
  filtrar();

  // Comparar: até 4 modelos.
  var barra = document.getElementById('comparar-barra');
  var nTxt = document.getElementById('comparar-n');
  var ir = document.getElementById('comparar-ir');
  var escolhidos = [];
  function atualizar() {
    barra.hidden = escolhidos.length === 0;
    nTxt.textContent = escolhidos.length + (escolhidos.length === 1 ? ' modelo' : ' modelos') + (escolhidos.length < 2 ? ' (escolha mais um)' : '');
    ir.href = '/comparar.html?m=' + escolhidos.map(encodeURIComponent).join(',');
    document.querySelectorAll('input.sel').forEach(function (c) {
      c.checked = escolhidos.indexOf(c.value) >= 0;
      c.disabled = !c.checked && escolhidos.length >= 4;
    });
  }
  document.addEventListener('change', function (e) {
    var c = e.target;
    if (!c.classList || !c.classList.contains('sel')) return;
    var i = escolhidos.indexOf(c.value);
    if (c.checked && i < 0) escolhidos.push(c.value);
    if (!c.checked && i >= 0) escolhidos.splice(i, 1);
    atualizar();
  });
  document.getElementById('comparar-limpar').addEventListener('click', function () { escolhidos = []; atualizar(); });
  atualizar();
})();
