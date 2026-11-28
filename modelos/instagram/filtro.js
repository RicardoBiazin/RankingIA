// Visual "Instagram": busca, stories (empresa), tipo, abas Ranking / Por categoria, favoritos (curtir)
// e seletor de idioma. Sem este arquivo a página mostra todos os modelos em ordem de ranking.
(function () {
  'use strict';
  var doc = document;
  doc.documentElement.classList.add('js');
  var T = window.T || {};
  var CHAVE = 'rk-instagram-fav';

  function all(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function ler() { try { var v = JSON.parse(localStorage.getItem(CHAVE) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function guardar(v) { try { localStorage.setItem(CHAVE, JSON.stringify(v)); } catch (e) { /* sem armazenamento */ } }
  function modelo(txt, vars) { return (txt || '').replace(/\{(\w+)\}/g, function (_, k) { return vars[k]; }); }
  function contar(a, b) { return a === b ? modelo(T['js.n'] || '{n}', { n: a }) : modelo(T['js.parcial'] || '{a}/{b}', { a: a, b: b }); }

  function iniciar() {
    var feed = doc.getElementById('feed');
    if (!feed) return;
    var posts = all('.post', feed);
    var outros = all('.outro');
    var estado = { q: '', emp: '', tipo: '', fav: false, cat: '' };
    var favoritos = ler();

    // Controles que só funcionam com JS ficam escondidos no HTML.
    ['busca-form', 'stories-faixa', 'abas-faixa'].forEach(function (id) { var el = doc.getElementById(id); if (el) el.hidden = false; });
    all('.curtir').forEach(function (b) { b.hidden = false; });

    // Notas por categoria de cada cartão (lidas do HTML já pronto).
    posts.forEach(function (p) {
      var cats = {};
      all('.cat-linha', p).forEach(function (l) {
        var n = l.getAttribute('data-n');
        cats[l.getAttribute('data-cat')] = { n: n === '' ? null : parseFloat(n), p: l.getAttribute('data-p'), txt: l.querySelector('.cat-nota').textContent, linha: l };
      });
      p.rk = { cats: cats, pos: parseInt(p.getAttribute('data-pos'), 10), slug: p.getAttribute('data-slug'), nota: p.querySelector('.nota-v'), rot: p.querySelector('.nota-rot'), posEl: p.querySelector('.pos') };
    });

    var contagem = doc.getElementById('contagem');
    var outrosN = doc.getElementById('outros-n');
    var chipsBox = doc.getElementById('chips');
    var chips = all('.chip');
    var abas = all('.aba');
    var stories = all('.story');
    var favFiltro = doc.getElementById('fav-filtro');
    var favN = doc.getElementById('fav-n');

    function ehFav(slug) { return favoritos.indexOf(slug) !== -1; }

    function ordenar() {
      var cat = estado.cat;
      var lista = posts.slice().sort(function (a, b) {
        if (cat) {
          var na = a.rk.cats[cat] ? a.rk.cats[cat].n : null;
          var nb = b.rk.cats[cat] ? b.rk.cats[cat].n : null;
          if (na == null && nb != null) return 1;
          if (nb == null && na != null) return -1;
          if (na != null && nb != null && na !== nb) return nb - na;
        }
        return a.rk.pos - b.rk.pos;
      });
      var frag = doc.createDocumentFragment();
      lista.forEach(function (p) { frag.appendChild(p); });
      feed.appendChild(frag);
      var nomeCat = '';
      if (cat) { var c = doc.querySelector('.chip[data-cat="' + cat + '"]'); nomeCat = c ? c.textContent : ''; }
      posts.forEach(function (p) {
        var r = p.rk;
        var c = cat ? r.cats[cat] : null;
        r.nota.textContent = c ? c.txt : r.nota.getAttribute('data-geral');
        r.rot.textContent = cat ? nomeCat : r.rot.getAttribute('data-geral');
        r.posEl.textContent = c ? (c.p ? '#' + c.p : '—') : r.posEl.getAttribute('data-geral');
        Object.keys(r.cats).forEach(function (id) { r.cats[id].linha.classList.toggle('sel', id === cat); });
      });
    }

    function aplicar() {
      var q = estado.q;
      var visiveis = 0;
      posts.forEach(function (p) {
        var ok = (!q || (p.getAttribute('data-busca') || '').indexOf(q) !== -1) &&
          (!estado.emp || p.getAttribute('data-emp') === estado.emp) &&
          (!estado.tipo || p.getAttribute('data-aberto') === estado.tipo) &&
          (!estado.fav || ehFav(p.rk.slug));
        p.hidden = !ok;
        if (ok) visiveis++;
      });
      var vo = 0;
      outros.forEach(function (o) {
        var ok = (!q || (o.getAttribute('data-busca') || '').indexOf(q) !== -1) &&
          (!estado.emp || o.getAttribute('data-emp') === estado.emp) &&
          (!estado.tipo || o.getAttribute('data-aberto') === estado.tipo);
        o.hidden = !ok;
        if (ok) vo++;
      });
      contagem.textContent = contar(visiveis, posts.length);
      if (outrosN) outrosN.textContent = String(vo);
      stories.forEach(function (s) { s.setAttribute('aria-pressed', s.getAttribute('data-emp') === estado.emp ? 'true' : 'false'); });
    }

    function atualizarFav() {
      favN.textContent = String(favoritos.filter(function (s) { return posts.some(function (p) { return p.rk.slug === s; }); }).length);
      posts.forEach(function (p) {
        var b = p.querySelector('.curtir');
        if (b) b.setAttribute('aria-pressed', ehFav(p.rk.slug) ? 'true' : 'false');
      });
    }

    // busca
    var campo = doc.getElementById('busca');
    var form = doc.getElementById('busca-form');
    campo.addEventListener('input', function () { estado.q = campo.value.toLowerCase().trim(); aplicar(); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });

    // stories (empresa)
    stories.forEach(function (s) {
      s.addEventListener('click', function () {
        var v = s.getAttribute('data-emp');
        estado.emp = (v && estado.emp === v) ? '' : v;
        aplicar();
      });
    });

    // tipo
    doc.getElementById('f-tipo').addEventListener('change', function (e) { estado.tipo = e.target.value; aplicar(); });

    // favoritos
    favFiltro.addEventListener('click', function () {
      estado.fav = !estado.fav;
      favFiltro.setAttribute('aria-pressed', estado.fav ? 'true' : 'false');
      aplicar();
    });
    feed.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.curtir') : null;
      if (!b) return;
      var slug = b.parentNode.parentNode.getAttribute('data-slug');
      var i = favoritos.indexOf(slug);
      if (i === -1) favoritos.push(slug); else favoritos.splice(i, 1);
      guardar(favoritos);
      atualizarFav();
      if (estado.fav) aplicar();
    });

    // abas e categorias
    function escolherCat(id) {
      estado.cat = id;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-cat') === id ? 'true' : 'false'); });
      ordenar();
    }
    abas.forEach(function (a) {
      a.addEventListener('click', function () {
        var porCat = a.getAttribute('data-aba') === 'cat';
        abas.forEach(function (x) { x.setAttribute('aria-pressed', x === a ? 'true' : 'false'); });
        chipsBox.hidden = !porCat;
        escolherCat(porCat ? (estado.cat || (chips[0] ? chips[0].getAttribute('data-cat') : '')) : '');
      });
    });
    chips.forEach(function (c) { c.addEventListener('click', function () { escolherCat(c.getAttribute('data-cat')); }); });

    // idioma: fecha ao clicar fora ou com Esc
    var idioma = doc.getElementById('idioma');
    if (idioma) {
      doc.addEventListener('click', function (e) { if (idioma.open && !idioma.contains(e.target)) idioma.open = false; });
      doc.addEventListener('keydown', function (e) { if ((e.key === 'Escape' || e.key === 'Esc') && idioma.open) { idioma.open = false; idioma.querySelector('summary').focus(); } });
    }

    atualizarFav();
    aplicar();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
