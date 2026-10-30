// Página do modelo: (1) evolução da família, da primeira versão à atual, por data de
// lançamento; (2) evolução da Nota RankingIA dia a dia. As séries vêm no próprio
// canvas (data-serie), geradas pelo gerar.mjs.
(function () {
  'use strict';
  var R = window.RIA;
  var graficos = [];

  // Um eixo y só: Nota RankingIA e Índice AA (ambos 0 a 100) dividem o eixo; o Elo
  // entra no lugar deles só quando a família não tem nenhuma das duas (e aparece na dica).
  function familia() {
    var canvas = document.getElementById('g-familia');
    if (!canvas) return;
    var s = JSON.parse(canvas.dataset.serie || '[]');
    var rotulos = s.map(function (x) { return x.n; });
    var temNota = s.some(function (x) { return x.nota != null; });
    var temAA = s.some(function (x) { return x.aa != null; });
    var series = [];
    if (temNota) series.push({ label: R.t('js.familiaNota'), data: s.map(function (x) { return x.nota; }) });
    if (temAA) series.push({ label: R.t('js.familiaAA'), data: s.map(function (x) { return x.aa; }) });
    var eixo = R.t('js.familiaNota');
    if (!series.length) { series.push({ label: R.t('js.familiaElo'), data: s.map(function (x) { return x.elo; }) }); eixo = 'Elo'; }
    graficos.push(new Chart(canvas, {
      type: 'line',
      data: {
        labels: rotulos,
        datasets: series.map(function (d, i) {
          return {
            label: d.label, data: d.data, borderColor: R.serie(i), backgroundColor: R.serie(i), borderWidth: 2, spanGaps: true, tension: 0,
            pointRadius: s.map(function (x) { return x.atual ? 7 : 4; }), pointHoverRadius: 8, pointHitRadius: 10,
          };
        }),
      },
      options: {
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'index', intersect: false },
        scales: { y: { title: { display: true, text: eixo } }, x: { grid: { display: false }, ticks: { autoSkip: true, maxRotation: 30 } } },
        plugins: {
          legend: { display: series.length > 1, position: 'bottom' },
          tooltip: {
            callbacks: {
              title: function (c) { var x = s[c[0].dataIndex]; return x.n + (x.l ? ' · ' + R.dataBR(x.l) : ''); },
              label: function (c) { return c.dataset.label + ': ' + (c.raw == null ? '—' : R.nf(c.raw)); },
              afterBody: function (c) { var x = s[c[0].dataIndex]; return x.elo != null && eixo !== 'Elo' ? 'Elo Arena: ' + x.elo : ''; },
            },
          },
        },
        onClick: function (e, itens) { if (itens.length) { var x = s[itens[0].index]; if (!x.atual) location.href = R.pre + '/modelo/' + x.s + '.html'; } },
        onHover: function (e, itens) { e.native.target.style.cursor = itens.length && !s[itens[0].index].atual ? 'pointer' : 'default'; },
      },
    }));
  }

  function diario() {
    var canvas = document.getElementById('g-modelo');
    if (!canvas) return;
    var serie = JSON.parse(canvas.dataset.serie || '{"dias":[]}');
    if (serie.dias.length < 2) return;
    graficos.push(new Chart(canvas, {
      type: 'line',
      data: {
        labels: serie.dias.map(R.dataBR),
        datasets: [{ label: R.t('js.notaRankingIA'), data: serie.nota, borderColor: R.serie(0), backgroundColor: R.serie(0), borderWidth: 2, pointRadius: 3, spanGaps: true, tension: 0 }],
      },
      options: {
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'index', intersect: false },
        scales: { y: { title: { display: true, text: R.t('js.notaRankingIA') } }, x: { grid: { display: false } } },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: function (c) { var p = serie.pos[c.dataIndex]; return R.nf(c.raw) + (p ? ' · ' + R.posicao(p) : ''); } } },
        },
      },
    }));
  }

  function desenhar() {
    graficos.forEach(function (g) { g.destroy(); });
    graficos = [];
    R.aplicarTema();
    familia();
    diario();
  }
  desenhar();
  document.addEventListener('tema', desenhar);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', desenhar);
})();
