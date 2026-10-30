// Ranking: ordenar por coluna, filtrar (busca, empresa, tipo, preço), trocar de
// categoria, limitar a quantidade e escolher modelos para comparar.
(function () {
  'use strict';
  var tabelas = ['ranking', 'outros'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
  var busca = document.getElementById('busca');
  var fEmpresa = document.getElementById('f-empresa');
  var fTipo = document.getElementById('f-tipo');
  var fPreco = document.getElementById('f-preco');
  var contagem = document.getElementById('contagem');
  var fMostrar = document.getElementById('f-mostrar');

  // Ordenação: clique alterna desc/asc; vazio fica sempre no fim.
  function ordenar(tab, col, asc) {
    var ths = tab.tHead.rows[0].cells, th = ths[col];
    var texto = th.dataset.tipo === 'texto';
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
  }
  tabelas.forEach(function (tab) {
    Array.prototype.forEach.call(tab.tHead.rows[0].cells, function (th, col) {
      var botao = th.querySelector('button');
      if (!botao) return;
      botao.addEventListener('click', function () {
        var atual = th.getAttribute('aria-sort');
        ordenar(tab, col, atual ? atual === 'descending' : th.dataset.tipo === 'texto' || (col === 0 && th.textContent === '#'));
      });
    });
  });

  // Categorias: mostra as colunas da categoria, ordena pela nota dela e troca a
  // posição (#) pela posição na categoria. "Todas" volta à nota geral.
  var ranking = document.getElementById('ranking');
  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var cat = chip.dataset.cat;
      document.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      ranking.dataset.cat = cat;
      Array.prototype.forEach.call(ranking.tBodies[0].rows, function (tr) {
        var pos = cat === 'todas' ? tr.dataset.pos : tr.getAttribute('data-r-' + cat);
        tr.cells[0].textContent = pos || '—';
        tr.cells[0].dataset.v = pos || '';
      });
      var ths = ranking.tHead.rows[0].cells, alvo = 0;
      Array.prototype.forEach.call(ths, function (th, i) {
        if (cat === 'todas' ? th.classList.contains('nota-geral') : (th.classList.contains('nota-cat') && th.dataset.cats === cat)) alvo = i;
      });
      ordenar(ranking, alvo, false);
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
