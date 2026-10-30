// Página do modelo: gráfico da evolução da Nota RankingIA dia a dia (posição na dica).
// A série vem no próprio canvas (data-serie), gerada pelo gerar.mjs.
(function () {
  'use strict';
  var R = window.RIA;
  var canvas = document.getElementById('g-modelo');
  if (!canvas) return;
  var serie = JSON.parse(canvas.dataset.serie || '{"dias":[]}');
  if (serie.dias.length < 2) return; // a página já traz o aviso no lugar do gráfico
  var grafico = null;
  function desenhar() {
    if (grafico) grafico.destroy();
    R.aplicarTema();
    grafico = new Chart(canvas, {
      type: 'line',
      data: {
        labels: serie.dias.map(R.dataBR),
        datasets: [{ label: 'Nota RankingIA', data: serie.nota, borderColor: R.serie(0), backgroundColor: R.serie(0), borderWidth: 2, pointRadius: 3, spanGaps: true, tension: 0 }],
      },
      options: {
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'index', intersect: false },
        scales: { y: { title: { display: true, text: 'Nota RankingIA' } }, x: { grid: { display: false } } },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: function (c) { var p = serie.pos[c.dataIndex]; return 'Nota ' + R.nf(c.raw) + (p ? ' · ' + p + 'º lugar' : ''); } } },
        },
      },
    });
  }
  desenhar();
  document.addEventListener('tema', desenhar);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', desenhar);
})();
