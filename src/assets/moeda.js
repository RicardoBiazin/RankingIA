// Moeda dos preços. As cotações (US$ 1 = x) vêm no <html data-cambio='{"BRL":5.35,...}'>;
// a escolha fica só neste navegador. Elementos com data-usd são reformatados,
// .sigla-moeda recebe o símbolo e option[data-usd-rotulo] troca o texto do filtro.
// Outras telas ouvem o evento "moeda".
(function () {
  'use strict';
  var raiz = document.documentElement;
  var taxas = { USD: 1 };
  try { var c = JSON.parse(raiz.dataset.cambio || '{}'); Object.keys(c).forEach(function (k) { if (Number(c[k]) > 0) taxas[k] = Number(c[k]); }); } catch (e) { /* sem câmbio: só US$ */ }
  var atual = 'USD';
  try { var salva = localStorage.getItem('moeda'); if (taxas[salva]) atual = salva; } catch (e) { /* sem storage */ }

  // Mesmas casas do gerar.mjs (src/moedas.mjs): coluna estreita.
  function casas(v) { return v >= 100 ? 0 : v >= 0.1 ? 2 : 3; }
  function converter(usd) { return usd == null ? null : usd * taxas[atual]; }
  function formatar(v) {
    if (v == null) return '—';
    if (v === 0) return 'grátis';
    var n = casas(v);
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: atual, minimumFractionDigits: n, maximumFractionDigits: n }).format(v);
  }
  function sigla() {
    var p = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: atual }).formatToParts(1).filter(function (x) { return x.type === 'currency'; })[0];
    return p ? p.value : atual;
  }
  function aplicar() {
    document.querySelectorAll('[data-usd]').forEach(function (el) {
      el.textContent = el.dataset.usd === '' ? '—' : formatar(converter(Number(el.dataset.usd)));
    });
    document.querySelectorAll('.sigla-moeda').forEach(function (el) { el.textContent = sigla(); });
    document.querySelectorAll('option[data-usd-rotulo]').forEach(function (op) {
      op.textContent = 'até ' + formatar(converter(Number(op.dataset.usdRotulo))) + ' / 1M';
    });
  }

  window.MOEDA = {
    atual: function () { return atual; },
    sigla: sigla,
    converter: converter,
    formatar: formatar,
    preco: function (usd) { return usd == null ? '—' : formatar(converter(usd)); },
  };

  document.addEventListener('DOMContentLoaded', function () {
    var sel = document.getElementById('moeda');
    if (sel) {
      Array.prototype.slice.call(sel.options).forEach(function (op) { if (!taxas[op.value]) op.remove(); });
      sel.hidden = sel.options.length < 2;
      sel.value = atual;
      // Fechado mostra só o símbolo (cabeçalho estreito); aberto mostra o nome da moeda.
      var longo = function () { Array.prototype.forEach.call(sel.options, function (op) { op.textContent = op.dataset.longo; }); };
      var curto = function () { Array.prototype.forEach.call(sel.options, function (op) { op.textContent = op.dataset.curto; }); };
      sel.addEventListener('pointerdown', longo);
      sel.addEventListener('focus', longo);
      sel.addEventListener('keydown', longo);
      sel.addEventListener('blur', curto);
      sel.addEventListener('change', function () {
        atual = taxas[sel.value] ? sel.value : 'USD';
        try { localStorage.setItem('moeda', atual); } catch (e) { /* sem storage */ }
        curto();
        aplicar();
        document.dispatchEvent(new CustomEvent('moeda'));
      });
    }
    aplicar();
  });
})();
