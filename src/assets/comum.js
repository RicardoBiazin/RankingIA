// Comum às páginas com gráfico: carrega /dados/ranking.json, lê as cores do tema
// e formata números. Expõe window.RIA.
(function () {
  'use strict';
  var cache = null;
  function carregar() {
    if (!cache) cache = fetch('/dados/ranking.json').then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
    return cache;
  }
  function cor(nome) { return getComputedStyle(document.documentElement).getPropertyValue(nome).trim(); }
  function serie(i) { return cor('--serie-' + ((i % 8) + 1)); }
  function nf(v, casas) {
    if (v == null) return '—';
    return Number(v).toLocaleString('pt-BR', { minimumFractionDigits: casas == null ? 1 : casas, maximumFractionDigits: casas == null ? 1 : casas });
  }
  function preco(usd) { return window.MOEDA.preco(usd); } // converte para a moeda escolhida
  function precoMedio(m) { return m.pi == null || m.po == null ? null : (3 * m.pi + m.po) / 4; }
  function contexto(n) { return n == null ? '—' : n >= 1e6 ? nf(n / 1e6, n % 1e6 ? 1 : 0) + ' M' : Math.round(n / 1000) + ' mil'; }
  function dataBR(iso) { return iso ? iso.slice(8, 10) + '/' + iso.slice(5, 7) + '/' + iso.slice(0, 4) : '—'; }
  function el(tag, attrs, filhos) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { if (k === 'text') e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (filhos || []).forEach(function (f) { if (f != null) e.appendChild(typeof f === 'string' ? document.createTextNode(f) : f); });
    return e;
  }
  // Tabela simples para a visão "ver os dados".
  function tabela(cab, linhas) {
    return el('table', { class: 'tabela' }, [
      el('thead', null, [el('tr', null, cab.map(function (c, i) { return el('th', { scope: 'col', class: i ? '' : 'esq', text: c }); }))]),
      el('tbody', null, linhas.map(function (l) { return el('tr', null, l.map(function (c, i) { return el('td', { class: i ? '' : 'esq', text: String(c) }); })); })),
    ]);
  }
  // Padrão visual dos gráficos, relido a cada troca de tema.
  function aplicarTema() {
    if (!window.Chart) return;
    Chart.defaults.color = cor('--texto-2');
    Chart.defaults.borderColor = cor('--grade');
    Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
    Chart.defaults.plugins.tooltip.backgroundColor = cor('--texto');
    Chart.defaults.plugins.tooltip.titleColor = cor('--fundo');
    Chart.defaults.plugins.tooltip.bodyColor = cor('--fundo');
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
  }
  window.RIA = { carregar: carregar, cor: cor, serie: serie, nf: nf, preco: preco, precoMedio: precoMedio, contexto: contexto, dataBR: dataBR, el: el, tabela: tabela, aplicarTema: aplicarTema };
})();
