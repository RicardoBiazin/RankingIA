// Visual Lens: busca, chips de categoria/tipo, filtro por empresa e menu de idiomas.
// Sem JS a página mostra tudo (a busca e os chips só aparecem com a classe "js").
(function () {
  'use strict';
  var raiz = document.documentElement;
  raiz.className += ' js';

  // ---- menu de idiomas: fecha ao clicar fora ou com Esc
  var idiomas = document.querySelector('.idiomas');
  if (idiomas) {
    document.addEventListener('click', function (e) { if (idiomas.open && !idiomas.contains(e.target)) idiomas.open = false; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && idiomas.open) { idiomas.open = false; idiomas.querySelector('summary').focus(); } });
  }

  var lista = document.getElementById('mosaico');
  if (!lista) return;
  var cartoes = [].slice.call(lista.children);
  var outros = [].slice.call(document.querySelectorAll('#outros-lista > li'));
  var campo = document.getElementById('q');
  var limpar = document.getElementById('q-limpar');
  var selEmpresa = document.getElementById('f-empresa');
  var chipsCat = [].slice.call(document.querySelectorAll('.chip[data-cat]'));
  var chipsTipo = [].slice.call(document.querySelectorAll('.chip[data-tipo]'));
  var contagem = document.getElementById('contagem');
  var vazio = document.getElementById('vazio');
  var melhor = document.getElementById('melhor');
  var detOutros = document.getElementById('outros-det');
  var nOutros = document.getElementById('outros-n');
  var total = cartoes.length;

  // Guarda de cada cartão: nota geral e as notas por categoria (lidas do HTML).
  cartoes.forEach(function (c) {
    var v = c.querySelector('.nota-v');
    var dot = c.querySelector('.nota .dot');
    var pos = c.querySelector('.pos');
    c._geral = { txt: v.textContent, cls: dot.className, pos: pos ? pos.textContent : '' };
    c._cats = {};
    [].forEach.call(c.querySelectorAll('.cats li'), function (li) {
      c._cats[li.getAttribute('data-cat')] = {
        li: li,
        nota: li.getAttribute('data-nota') === '' ? null : Number(li.getAttribute('data-nota')),
        pos: li.getAttribute('data-pos'),
        txt: li.querySelector('b').textContent,
        cls: li.querySelector('.dot').className
      };
    });
    c._pos = Number(c.getAttribute('data-pos'));
  });

  var estado = { q: '', cat: 'todas', tipo: '', emp: '' };

  function passa(el) {
    if (estado.tipo !== '' && el.getAttribute('data-aberto') !== estado.tipo) return false;
    if (estado.emp !== '' && el.getAttribute('data-empresa') !== estado.emp) return false;
    if (estado.q !== '') {
      var b = (el.getAttribute('data-busca') || '').toLowerCase();
      var termos = estado.q.split(/\s+/);
      for (var i = 0; i < termos.length; i++) if (b.indexOf(termos[i]) === -1) return false;
    }
    return true;
  }

  function ordenar() {
    var cat = estado.cat;
    var copia = cartoes.slice();
    copia.sort(function (a, b) {
      if (cat === 'todas') return a._pos - b._pos;
      var x = a._cats[cat], y = b._cats[cat];
      var nx = x && x.nota != null ? x.nota : -1, ny = y && y.nota != null ? y.nota : -1;
      return ny - nx || a._pos - b._pos;
    });
    copia.forEach(function (c) { lista.appendChild(c); });
  }

  function pintarNotas() {
    var cat = estado.cat;
    var rot = '';
    if (cat !== 'todas') {
      var chip = chipsCat.filter(function (x) { return x.getAttribute('data-cat') === cat; })[0];
      rot = chip ? chip.getAttribute('data-rot') || '' : '';
    }
    cartoes.forEach(function (c) {
      var v = c.querySelector('.nota-v'), dot = c.querySelector('.nota .dot'), r = c.querySelector('.nota-r'), pos = c.querySelector('.pos');
      var fonte = cat === 'todas' ? c._geral : c._cats[cat] || { txt: '—', cls: 'dot n-nd', pos: '' };
      v.textContent = fonte.txt;
      dot.className = fonte.cls;
      r.textContent = rot;
      if (pos) pos.textContent = cat === 'todas' ? c._geral.pos : (fonte.pos ? '#' + fonte.pos : '—');
      for (var k in c._cats) if (Object.prototype.hasOwnProperty.call(c._cats, k)) c._cats[k].li.className = k === cat ? 'sel' : '';
    });
  }

  function aplicar() {
    var n = 0, i;
    for (i = 0; i < cartoes.length; i++) { var ok = passa(cartoes[i]); cartoes[i].hidden = !ok; if (ok) n++; }
    var no = 0;
    for (i = 0; i < outros.length; i++) { var oko = passa(outros[i]); outros[i].hidden = !oko; if (oko) no++; }
    var filtrando = estado.q !== '' || estado.tipo !== '' || estado.emp !== '' || estado.cat !== 'todas';
    contagem.textContent = filtrando ? n + ' / ' + total : '';
    nOutros.textContent = no;
    if (melhor) melhor.hidden = filtrando;
    vazio.hidden = !(n === 0 && no === 0);
    if (n === 0 && no > 0 && detOutros) detOutros.open = true;
    limpar.hidden = estado.q === '';
  }

  function marcar(chips, attr, valor) {
    chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute(attr) === valor ? 'true' : 'false'); });
  }

  campo.addEventListener('input', function () { estado.q = campo.value.toLowerCase().replace(/^\s+|\s+$/g, ''); aplicar(); });
  campo.addEventListener('keydown', function (e) { if (e.key === 'Escape' && campo.value) { campo.value = ''; estado.q = ''; aplicar(); } });
  document.getElementById('busca').addEventListener('submit', function (e) { e.preventDefault(); });
  limpar.addEventListener('click', function () { campo.value = ''; estado.q = ''; aplicar(); campo.focus(); });

  chipsCat.forEach(function (c) {
    c.addEventListener('click', function () {
      var v = c.getAttribute('data-cat');
      estado.cat = v;
      marcar(chipsCat, 'data-cat', v);
      ordenar();
      pintarNotas();
      aplicar();
      try { c.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } catch (e) { /* navegador antigo */ }
    });
  });
  chipsTipo.forEach(function (c) {
    c.addEventListener('click', function () {
      var v = c.getAttribute('data-tipo');
      estado.tipo = v;
      marcar(chipsTipo, 'data-tipo', v);
      aplicar();
    });
  });
  selEmpresa.addEventListener('change', function () { estado.emp = selEmpresa.value; aplicar(); });

  function tudo() {
    campo.value = ''; selEmpresa.value = '';
    estado = { q: '', cat: 'todas', tipo: '', emp: '' };
    marcar(chipsCat, 'data-cat', 'todas'); marcar(chipsTipo, 'data-tipo', '');
    ordenar(); pintarNotas(); aplicar();
  }
  document.getElementById('vazio-limpar').addEventListener('click', tudo);

  aplicar();
})();
