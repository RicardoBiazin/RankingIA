// Comum às páginas com gráfico: carrega /dados/ranking.json, lê as cores do tema,
// traduz (window.T, de /assets/t-<idioma>.js) e formata no idioma. Expõe window.RIA.
(function () {
  'use strict';
  var cache = null;
  var LOC = (window.IDIOMA && window.IDIOMA.locale) || 'pt-BR';
  var PRE = (window.IDIOMA && window.IDIOMA.pre) || '';
  function t(chave, vars) {
    var s = (window.T && window.T[chave]) || chave;
    return s.replace(/\{(\w+)\}/g, function (_, k) { return vars && k in vars ? vars[k] : '{' + k + '}'; });
  }
  function tem(chave) { return !!(window.T && window.T[chave]); }
  // Nome e rótulo curto da métrica no idioma (as categorias do LiveBench usam 'met.lb').
  function nomeMet(x) {
    if (/^lb_/.test(x.id) && x.id !== 'lb_geral') return t('met.lb', { c: tem('lb.' + x.id) ? t('lb.' + x.id) : x.nome });
    return tem('met.' + x.id) ? t('met.' + x.id) : x.nome;
  }
  function curtoMet(x) {
    if (/^lb_/.test(x.id) && x.id !== 'lb_geral') return t('met.lb.curto', { c: tem('lb.' + x.id) ? t('lb.' + x.id) : x.curto });
    return tem('met.' + x.id + '.curto') ? t('met.' + x.id + '.curto') : x.curto;
  }
  function carregar() {
    if (!cache) cache = fetch('/dados/ranking.json').then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
    return cache;
  }
  function cor(nome) { return getComputedStyle(document.documentElement).getPropertyValue(nome).trim(); }
  function serie(i) { return cor('--serie-' + ((i % 8) + 1)); }
  function nf(v, casas) {
    if (v == null) return '—';
    return Number(v).toLocaleString(LOC, { minimumFractionDigits: casas == null ? 1 : casas, maximumFractionDigits: casas == null ? 1 : casas });
  }
  function preco(usd) { return window.MOEDA.preco(usd); } // converte para a moeda escolhida
  function precoMedio(m) { return m.pi == null || m.po == null ? null : (3 * m.pi + m.po) / 4; }
  function contexto(n) { return n == null ? '—' : n >= 1e6 ? t('ctx.mi', { n: nf(n / 1e6, n % 1e6 ? 1 : 0) }) : t('ctx.mil', { n: Math.round(n / 1000) }); }
  function dataBR(iso) { return iso ? new Date(iso.slice(0, 10) + 'T12:00:00Z').toLocaleDateString(LOC, { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }) : '—'; }
  function posicao(n) { return n == null ? '—' : t('pos', { n: n }); }
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
  window.RIA = { t: t, pre: PRE, loc: LOC, nomeMet: nomeMet, curtoMet: curtoMet, posicao: posicao, carregar: carregar, cor: cor, serie: serie, nf: nf, preco: preco, precoMedio: precoMedio, contexto: contexto, dataBR: dataBR, el: el, tabela: tabela, aplicarTema: aplicarTema };
})();
