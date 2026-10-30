// Página de gráficos: dispersões de qualidade × preço/velocidade e linhas de evolução.
(function () {
  'use strict';
  var R = window.RIA;
  var graficos = [];
  var MARCAS = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100];

  function dispersao(id, pontosPorSerie, eixoX, eixoY, logX) {
    var canvas = document.getElementById('g-' + id);
    if (!canvas) return;
    graficos.push(new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: pontosPorSerie.map(function (s, i) {
          return {
            label: s.nome, data: s.pontos, backgroundColor: R.serie(i), borderColor: R.cor('--superficie'),
            borderWidth: 2, pointRadius: 5, pointHoverRadius: 8, pointHitRadius: 10,
          };
        }),
      },
      options: {
        maintainAspectRatio: false,
        animation: false,
        scales: {
          x: { type: logX ? 'logarithmic' : 'linear', title: { display: true, text: eixoX }, grid: { display: false },
            ticks: logX ? { autoSkip: false, maxRotation: 0, callback: function (v) { return MARCAS.indexOf(Number(v.toPrecision(3))) >= 0 ? MOEDA.formatar(v).replace(/,?0+$/, '') : ''; } } : {} },
          y: { title: { display: true, text: eixoY } },
        },
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { callbacks: { label: function (c) { return c.raw.nome + ' · ' + c.raw.rotulo; } } },
        },
        onClick: function (e, itens) { if (itens.length) location.href = R.pre + '/modelo/' + itens[0].element.$context.raw.slug + '.html'; },
        onHover: function (e, itens) { e.native.target.style.cursor = itens.length ? 'pointer' : 'default'; },
      },
    }));
  }

  function linhas(id, datas, series, eixoY, vazio) {
    var canvas = document.getElementById('g-' + id);
    if (!canvas) return;
    if (datas.length < 2) {
      canvas.parentNode.replaceWith(R.el('p', { class: 'fraco', text: vazio }));
      return;
    }
    graficos.push(new Chart(canvas, {
      type: 'line',
      data: {
        labels: datas.map(R.dataBR),
        datasets: series.map(function (s, i) {
          return { label: s.nome, data: s.valores, borderColor: R.serie(i), backgroundColor: R.serie(i), borderWidth: 2, pointRadius: 4, spanGaps: true, tension: 0 };
        }),
      },
      options: {
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'index', intersect: false },
        scales: { y: { title: { display: true, text: eixoY } }, x: { grid: { display: false } } },
        plugins: { legend: { position: 'bottom' }, tooltip: { callbacks: { label: function (c) { return c.dataset.label + ': ' + R.nf(c.raw); } } } },
      },
    }));
  }

  function desenhar(d) {
    graficos.forEach(function (g) { g.destroy(); });
    graficos = [];
    R.aplicarTema();
    var ranking = d.modelos.filter(function (m) { return m.pos != null; });

    // 1. Nota × preço (abertos e fechados).
    var np = ranking.filter(function (m) { return R.precoMedio(m) > 0; });
    var ponto = function (m, y, rotulo) { return { x: MOEDA.converter(R.precoMedio(m)), y: y, nome: m.n, slug: m.s, rotulo: rotulo }; };
    dispersao('nota-preco', [
      { nome: R.t('js.pesosFechados'), pontos: np.filter(function (m) { return !m.a; }).map(function (m) { return ponto(m, m.nota, R.t('js.nota', { n: R.nf(m.nota) }) + ' · ' + R.preco(R.precoMedio(m)) + '/1M'); }) },
      { nome: R.t('js.pesosAbertos'), pontos: np.filter(function (m) { return m.a; }).map(function (m) { return ponto(m, m.nota, R.t('js.nota', { n: R.nf(m.nota) }) + ' · ' + R.preco(R.precoMedio(m)) + '/1M'); }) },
    ], R.t('js.precoMedio', { s: MOEDA.sigla() }), R.t('js.notaRankingIA'), true);
    dados('nota-preco', [R.t('js.modelo'), R.t('th.nota'), R.t('js.precoMedioCurto')], np.map(function (m) { return [m.n, R.nf(m.nota), R.preco(R.precoMedio(m))]; }));

    // 2. Arena × preço (inclui quem está fora do ranking).
    var ap = d.modelos.filter(function (m) { return m.m.arena_texto != null && R.precoMedio(m) > 0; });
    dispersao('arena-preco', [
      { nome: R.t('js.pesosFechados'), pontos: ap.filter(function (m) { return !m.a; }).map(function (m) { return ponto(m, m.m.arena_texto, 'Elo ' + m.m.arena_texto + ' · ' + R.preco(R.precoMedio(m)) + '/1M'); }) },
      { nome: R.t('js.pesosAbertos'), pontos: ap.filter(function (m) { return m.a; }).map(function (m) { return ponto(m, m.m.arena_texto, 'Elo ' + m.m.arena_texto + ' · ' + R.preco(R.precoMedio(m)) + '/1M'); }) },
    ], R.t('js.precoMedio', { s: MOEDA.sigla() }), R.t('js.eloTexto'), true);
    dados('arena-preco', [R.t('js.modelo'), 'Elo', R.t('js.precoMedioCurto')], ap.sort(function (a, b) { return b.m.arena_texto - a.m.arena_texto; }).map(function (m) { return [m.n, m.m.arena_texto, R.preco(R.precoMedio(m))]; }));

    // 3. Nota × velocidade (só com Artificial Analysis).
    var nv = ranking.filter(function (m) { return m.v != null; });
    if (document.getElementById('g-nota-velocidade')) {
      dispersao('nota-velocidade', [{ nome: R.t('js.modelos'), pontos: nv.map(function (m) { return { x: m.v, y: m.nota, nome: m.n, slug: m.s, rotulo: R.nf(m.v, 0) + ' tok/s' }; }) }], R.t('js.tokSeg'), R.t('js.notaRankingIA'), false);
      dados('nota-velocidade', [R.t('js.modelo'), R.t('th.nota'), 'tok/s'], nv.map(function (m) { return [m.n, R.nf(m.nota), R.nf(m.v, 0)]; }));
    }

    // 4. Evolução das IAs: modelos por data de lançamento e a fronteira (melhor nota até a data).
    var comData = ranking.filter(function (m) { return m.l; }).sort(function (a, b) { return a.l < b.l ? -1 : 1; });
    var fronteira = function (aberto) {
      var melhor = -1, pts = [];
      comData.filter(function (m) { return !!m.a === aberto; }).forEach(function (m) {
        if (m.nota > melhor) { melhor = m.nota; pts.push({ x: Date.parse(m.l), y: m.nota, nome: m.n, slug: m.s, rotulo: R.t('js.recorde', { d: R.dataBR(m.l) }) }); }
      });
      if (pts.length) pts.push({ x: Date.now(), y: melhor, nome: pts[pts.length - 1].nome, slug: pts[pts.length - 1].slug, rotulo: R.t('js.melhorHoje') });
      return pts;
    };
    var canvasF = document.getElementById('g-fronteira');
    if (canvasF && comData.length) {
      var pontoF = function (m) { return { x: Date.parse(m.l), y: m.nota, nome: m.n, slug: m.s, rotulo: R.t('js.nota', { n: R.nf(m.nota) }) + ' · ' + R.t('js.lancadoEm', { d: R.dataBR(m.l) }) }; };
      var mes = function (v) { return new Date(v).toLocaleDateString(R.loc, { month: 'short', year: 'numeric', timeZone: 'UTC' }); };
      graficos.push(new Chart(canvasF, {
        type: 'scatter',
        data: {
          datasets: [
            { type: 'line', label: R.t('js.melhorFechado'), data: fronteira(false), borderColor: R.serie(0), backgroundColor: R.serie(0), borderWidth: 2, pointRadius: 0, pointHitRadius: 8, stepped: 'before' },
            { type: 'line', label: R.t('js.melhorAberto'), data: fronteira(true), borderColor: R.serie(1), backgroundColor: R.serie(1), borderWidth: 2, pointRadius: 0, pointHitRadius: 8, stepped: 'before' },
            { label: R.t('js.modelosFechados'), data: comData.filter(function (m) { return !m.a; }).map(pontoF), backgroundColor: R.serie(0) + '59', borderWidth: 0, pointRadius: 3.5, pointHoverRadius: 6 },
            { label: R.t('js.modelosAbertos'), data: comData.filter(function (m) { return m.a; }).map(pontoF), backgroundColor: R.serie(1) + '59', borderWidth: 0, pointRadius: 3.5, pointHoverRadius: 6 },
          ],
        },
        options: {
          maintainAspectRatio: false,
          animation: false,
          scales: {
            x: { type: 'linear', grid: { display: false }, ticks: { callback: mes, maxTicksLimit: 10 } },
            y: { title: { display: true, text: R.t('js.notaRankingIA') }, min: 0, max: 100 },
          },
          plugins: {
            legend: { position: 'bottom' },
            tooltip: { callbacks: { label: function (c) { return c.raw.nome + ' · ' + c.raw.rotulo; } } },
          },
          onClick: function (e, itens) { if (itens.length) location.href = R.pre + '/modelo/' + itens[0].element.$context.raw.slug + '.html'; },
          onHover: function (e, itens) { e.native.target.style.cursor = itens.length ? 'pointer' : 'default'; },
        },
      }));
      dados('fronteira', [R.t('js.data'), R.t('js.recordista'), R.t('js.tipo'), R.t('th.nota')], fronteira(false).slice(0, -1).map(function (p) { return [mes(p.x), p.nome, R.t('js.fechado'), R.nf(p.y)]; })
        .concat(fronteira(true).slice(0, -1).map(function (p) { return [mes(p.x), p.nome, R.t('js.aberto'), R.nf(p.y)]; })));
    }

    // 4b. Evolução no LiveBench: 8 primeiros do ranking que estão no LiveBench.
    var hlb = d.historicoLiveBench || [];
    var top = ranking.filter(function (m) { return m.m.lb_geral != null; }).slice(0, 8);
    linhas('evolucao', hlb.map(function (h) { return h.data; }), top.map(function (m) {
      return { nome: m.n, valores: hlb.map(function (h) { return h.modelos[m.c] == null ? null : h.modelos[m.c]; }) };
    }), R.t('js.lbGeral'), R.t('js.umRelease'));
    dados('evolucao', [R.t('js.modelo')].concat(hlb.map(function (h) { return R.dataBR(h.data); })), top.map(function (m) {
      return [m.n].concat(hlb.map(function (h) { return h.modelos[m.c] == null ? '—' : R.nf(h.modelos[m.c]); }));
    }));

    // 5. Histórico da nota (cresce um ponto por dia de coleta).
    var dias = Object.keys(d.historicoNota || {}).sort();
    var top8 = ranking.slice(0, 8);
    linhas('historico', dias, top8.map(function (m) {
      return { nome: m.n, valores: dias.map(function (dia) { var v = d.historicoNota[dia][m.c]; return v == null ? null : v; }) };
    }), R.t('js.notaRankingIA'), R.t('js.histEspera', { d: R.dataBR(dias[0]) }));
    dados('historico', [R.t('js.modelo')].concat(dias.map(R.dataBR)), top8.map(function (m) {
      return [m.n].concat(dias.map(function (dia) { var v = d.historicoNota[dia][m.c]; return v == null ? '—' : R.nf(v); }));
    }));
  }

  function dados(id, cab, linhasTab) {
    var alvo = document.getElementById('d-' + id);
    if (!alvo) return;
    alvo.replaceChildren(R.tabela(cab, linhasTab));
  }

  R.carregar().then(function (d) {
    desenhar(d);
    document.addEventListener('tema', function () { desenhar(d); });
    document.addEventListener('moeda', function () { desenhar(d); });
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { desenhar(d); });
  }).catch(function (e) {
    document.querySelector('.graficos').replaceChildren(R.el('p', { class: 'aviso', text: R.t('js.erroGraficos', { e: e.message }) }));
  });
})();
