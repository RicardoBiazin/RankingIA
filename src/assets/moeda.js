// Moeda dos preços: US$ (original das fontes), R$ ou €. As cotações vêm no <html>
// (data-cambio-brl, data-cambio-eur). A escolha fica só neste navegador.
// Elementos com data-usd são reformatados; .sigla-moeda recebe a sigla; data-usd-rotulo
// troca o texto de <option>. Outras telas ouvem o evento "moeda".
(function () {
  'use strict';
  var raiz = document.documentElement;
  var taxas = { USD: 1 };
  if (Number(raiz.dataset.cambioBrl) > 0) taxas.BRL = Number(raiz.dataset.cambioBrl);
  if (Number(raiz.dataset.cambioEur) > 0) taxas.EUR = Number(raiz.dataset.cambioEur);
  var SIMBOLO = { USD: '$', BRL: 'R$ ', EUR: '€ ' };
  var SIGLA = { USD: 'US$', BRL: 'R$', EUR: '€' };
  var atual = 'USD';
  try { var salva = localStorage.getItem('moeda'); if (taxas[salva]) atual = salva; } catch (e) { /* sem storage */ }

  function converter(usd) { return usd == null ? null : usd * taxas[atual]; }
  function formatar(v) {
    if (v == null) return '—';
    if (v === 0) return 'grátis';
    var casas = v < 0.1 ? 3 : 2;
    return SIMBOLO[atual] + Number(v).toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
  }
  function aplicar() {
    document.querySelectorAll('[data-usd]').forEach(function (el) {
      el.textContent = el.dataset.usd === '' ? '—' : formatar(converter(Number(el.dataset.usd)));
    });
    document.querySelectorAll('.sigla-moeda').forEach(function (el) { el.textContent = SIGLA[atual]; });
    document.querySelectorAll('option[data-usd-rotulo]').forEach(function (op) {
      op.textContent = 'até ' + formatar(converter(Number(op.dataset.usdRotulo))).replace(/,00$/, '') + ' / 1M';
    });
    var sel = document.getElementById('moeda');
    if (sel) sel.value = atual;
  }

  window.MOEDA = {
    atual: function () { return atual; },
    sigla: function () { return SIGLA[atual]; },
    converter: converter,
    formatar: formatar,
    preco: function (usd) { return usd == null ? '—' : formatar(converter(usd)); },
  };

  document.addEventListener('DOMContentLoaded', function () {
    var sel = document.getElementById('moeda');
    if (sel) {
      Array.prototype.slice.call(sel.options).forEach(function (op) { if (!taxas[op.value]) op.remove(); });
      sel.hidden = sel.options.length < 2;
      sel.addEventListener('change', function () {
        atual = taxas[sel.value] ? sel.value : 'USD';
        try { localStorage.setItem('moeda', atual); } catch (e) { /* sem storage */ }
        aplicar();
        document.dispatchEvent(new CustomEvent('moeda'));
      });
    }
    aplicar();
  });
})();
