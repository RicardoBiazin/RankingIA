// Visual Apple: busca, empresa, aberto/fechado, quantidade e categoria (reordena) no ranking.
// Sem JS a página mostra tudo; aqui só se revelam os controles e se reaplica o filtro.
(function () {
  'use strict';
  var lista = document.getElementById('lista');
  if (!lista) return;

  var linhas = [].slice.call(lista.querySelectorAll('.lin'));
  var outros = [].slice.call(document.querySelectorAll('#outros-lista li'));
  var busca = document.getElementById('busca');
  var empresa = document.getElementById('empresa');
  var segCat = document.getElementById('seg-cat');
  var segTipo = document.getElementById('seg-tipo');
  var segLim = document.getElementById('seg-lim');
  var contagem = document.getElementById('contagem');
  var total = linhas.length;

  var estado = { cat: '', q: '', emp: '', tipo: '', lim: 0 };

  // Guarda as notas por categoria de cada linha (lidas do HTML já pronto).
  linhas.forEach(function (li, i) {
    li._i = i;
    li._num = li.querySelector('.num');
    li._barra = li.querySelector('.barra');
    li._pos = li.querySelector('.l-pos');
    li._geralTxt = li._num.textContent;
    li._geralPos = li._pos.textContent;
    li._geral = parseFloat(li._barra.getAttribute('data-geral')) || 0;
    li._chips = {};
    [].forEach.call(li.querySelectorAll('.cats-grade li'), function (c) {
      var v = c.getAttribute('data-v');
      li._chips[c.getAttribute('data-c')] = {
        el: c,
        v: v === '' ? null : parseFloat(v),
        txt: c.querySelector('b').textContent,
        pos: c.getAttribute('data-p')
      };
    });
  });

  function passa(el) {
    if (estado.q && (el.getAttribute('data-busca') || '').toLowerCase().indexOf(estado.q) < 0) return false;
    if (estado.emp && el.getAttribute('data-emp') !== estado.emp) return false;
    if (estado.tipo && el.getAttribute('data-aberto') !== estado.tipo) return false;
    return true;
  }

  function valorCat(li) {
    var c = li._chips[estado.cat];
    return c && c.v != null ? c.v : -1;
  }

  function aplicar() {
    var ordem = linhas.slice();
    ordem.sort(function (a, b) {
      if (estado.cat) {
        var d = valorCat(b) - valorCat(a);
        if (d !== 0) return d;
      }
      return a._i - b._i;
    });

    var vistos = 0;
    ordem.forEach(function (li) {
      lista.appendChild(li);
      var c = estado.cat ? li._chips[estado.cat] : null;
      if (c) {
        li._num.textContent = c.txt;
        li._barra.value = c.v != null ? c.v : 0;
        li._pos.textContent = c.pos || '—';
      } else {
        li._num.textContent = li._geralTxt;
        li._barra.value = li._geral;
        li._pos.textContent = li._geralPos;
      }
      Object.keys(li._chips).forEach(function (k) {
        li._chips[k].el.classList.toggle('sel', k === estado.cat);
      });
      var ok = passa(li);
      if (ok) vistos++;
      li.hidden = !ok || (estado.lim > 0 && vistos > estado.lim);
    });

    outros.forEach(function (li) { li.hidden = !passa(li); });
    if (contagem) {
      var mostrados = linhas.filter(function (li) { return !li.hidden; }).length;
      contagem.textContent = mostrados + ' / ' + total;
    }
  }

  function segmento(grupo, atributo, aoEscolher) {
    if (!grupo) return;
    grupo.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b || !grupo.contains(b)) return;
      [].forEach.call(grupo.querySelectorAll('button'), function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      aoEscolher(b.getAttribute(atributo));
      if (grupo === segCat && b.scrollIntoView) {
        try { b.scrollIntoView({ block: 'nearest', inline: 'center' }); } catch (err) { /* navegador antigo */ }
      }
    });
  }

  segmento(segCat, 'data-cat', function (v) { estado.cat = v; aplicar(); });
  segmento(segTipo, 'data-tipo', function (v) { estado.tipo = v; aplicar(); });
  segmento(segLim, 'data-lim', function (v) { estado.lim = parseInt(v, 10) || 0; aplicar(); });

  if (busca) busca.addEventListener('input', function () { estado.q = busca.value.trim().toLowerCase(); aplicar(); });
  if (empresa) empresa.addEventListener('change', function () { estado.emp = empresa.value; aplicar(); });

  // Atalho "/" foca a busca, como no Spotlight.
  document.addEventListener('keydown', function (e) {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey || !busca) return;
    var t = e.target && e.target.tagName;
    if (t === 'INPUT' || t === 'SELECT' || t === 'TEXTAREA') return;
    e.preventDefault();
    busca.focus();
  });

  // Seletor de idioma: fecha ao clicar fora ou com Esc.
  var idioma = document.querySelector('.idioma');
  if (idioma) {
    document.addEventListener('click', function (e) { if (!idioma.contains(e.target)) idioma.removeAttribute('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') idioma.removeAttribute('open'); });
  }

  // Sombra no fim da barra de categorias enquanto houver mais itens a rolar.
  function indicarRolagem() {
    if (!segCat) return;
    var resta = segCat.scrollWidth - segCat.clientWidth - Math.abs(segCat.scrollLeft);
    segCat.classList.toggle('mais', resta > 4);
  }
  if (segCat) {
    segCat.addEventListener('scroll', indicarRolagem);
    window.addEventListener('resize', indicarRolagem);
  }

  // Revela os controles (escondidos sem JS).
  [].forEach.call(document.querySelectorAll('.js-so'), function (el) { el.hidden = false; });
  aplicar();
  indicarRolagem();
})();
