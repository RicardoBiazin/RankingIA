// Comparar até 4 modelos: tabela lado a lado (melhor valor em destaque) e radar de percentis.
// A escolha fica no endereço (?m=slug,slug) para poder mandar o link.
(function () {
  'use strict';
  var R = window.RIA;
  var selects = [1, 2, 3, 4].map(function (i) { return document.getElementById('s' + i); });
  var radar = null;

  R.carregar().then(function (d) {
    var porSlug = {};
    d.modelos.forEach(function (m) { porSlug[m.s] = m; });
    var met = {};
    d.metricas.forEach(function (x) { met[x.id] = x; });

    // Opções: ranking geral primeiro, depois os outros por nome.
    var grupos = [
      [R.t('js.rankingGeral'), d.modelos.filter(function (m) { return m.pos != null; })],
      [R.t('js.outros'), d.modelos.filter(function (m) { return m.pos == null; }).sort(function (a, b) { return a.n.localeCompare(b.n, R.loc); })],
    ];
    selects.forEach(function (s) {
      grupos.forEach(function (g) {
        var og = R.el('optgroup', { label: g[0] });
        g[1].forEach(function (m) { og.appendChild(R.el('option', { value: m.s, text: (m.pos ? R.posicao(m.pos) + ' ' : '') + m.n + (m.e ? ' · ' + m.e : '') })); });
        s.appendChild(og);
      });
      s.addEventListener('change', mudar);
    });

    var ini = (new URLSearchParams(location.search).get('m') || '').split(',').filter(function (s) { return porSlug[s]; }).slice(0, 4);
    ini.forEach(function (s, i) { selects[i].value = s; });
    desenhar();

    function escolhidos() {
      var vistos = {};
      return selects.map(function (s) { return s.value; }).filter(function (v) { if (!v || vistos[v]) return false; vistos[v] = 1; return true; }).map(function (v) { return porSlug[v]; });
    }

    function mudar() {
      var ms = escolhidos();
      history.replaceState(null, '', ms.length ? '?m=' + ms.map(function (m) { return encodeURIComponent(m.s); }).join(',') : location.pathname);
      desenhar();
    }

    function desenhar() {
      var ms = escolhidos();
      var alvo = document.getElementById('comparativo');
      if (!ms.length) { alvo.replaceChildren(R.el('p', { class: 'fraco pad', text: R.t('cmp.escolhaAcima') })); radarDesenhar([]); return; }
      var linhas = [
        [R.t('th.posicao'), function (m) { return m.pos; }, function (v) { return v == null ? R.t('js.fora') : R.posicao(v); }, -1],
        [R.t('js.notaRankingIA'), function (m) { return m.nota; }, function (v) { return R.nf(v); }, 1],
      ];
      d.metricas.forEach(function (x) {
        if (!ms.some(function (m) { return m.m[x.id] != null; })) return;
        linhas.push([R.nomeMet(x), function (m) { return m.m[x.id]; }, function (v) { return v == null ? '—' : x.unidade === 'Elo' ? String(Math.round(v)) : R.nf(v); }, 1]);
      });
      linhas.push(
        [R.t('js.entrada', { s: MOEDA.sigla() }), function (m) { return m.pi; }, R.preco, -1],
        [R.t('js.saida', { s: MOEDA.sigla() }), function (m) { return m.po; }, R.preco, -1],
        [R.t('th.contexto'), function (m) { return m.ctx; }, R.contexto, 1],
        [R.t('js.velocidade'), function (m) { return m.v; }, function (v) { return R.nf(v, 0); }, 1],
        [R.t('th.lancado'), function (m) { return m.l; }, R.dataBR, 0],
        [R.t('mod.pesos'), function (m) { return m.a; }, function (v) { return v ? R.t('js.abertos') : v === false ? R.t('js.fechados') : '—'; }, 0]
      );
      var corpo = R.el('tbody');
      linhas.forEach(function (l) {
        var vals = ms.map(l[1]);
        if (vals.every(function (v) { return v == null; })) return;
        var num = vals.filter(function (v) { return typeof v === 'number'; });
        var alvoV = l[3] && num.length > 1 ? (l[3] > 0 ? Math.max.apply(null, num) : Math.min.apply(null, num)) : null;
        corpo.appendChild(R.el('tr', null, [R.el('td', { text: l[0] })].concat(vals.map(function (v) {
          return R.el('td', { class: alvoV != null && v === alvoV ? 'melhor' : '', text: l[2](v) });
        }))));
      });
      var cab = R.el('thead', null, [R.el('tr', null, [R.el('th', { scope: 'col', text: '' })].concat(ms.map(function (m) {
        return R.el('th', { scope: 'col' }, [R.el('a', { href: R.pre + '/modelo/' + m.s + '.html', text: m.n })]);
      })))]);
      alvo.replaceChildren(R.el('table', { class: 'tabela-comp' }, [cab, corpo]));
      radarDesenhar(ms);
    }

    function radarDesenhar(ms) {
      if (radar) { radar.destroy(); radar = null; }
      R.aplicarTema();
      var ids = d.metricas.filter(function (x) { return ms.some(function (m) { return m.p && m.p[x.id] != null; }); }).map(function (x) { return x.id; });
      if (!ms.length || ids.length < 3) return;
      radar = new Chart(document.getElementById('radar'), {
        type: 'radar',
        data: {
          labels: ids.map(function (id) { return R.curtoMet(met[id]); }),
          datasets: ms.map(function (m, i) {
            return { label: m.n, data: ids.map(function (id) { return m.p[id] == null ? null : m.p[id]; }), borderColor: R.serie(i), backgroundColor: 'transparent', borderWidth: 2, pointRadius: 3, pointBackgroundColor: R.serie(i), spanGaps: true };
          }),
        },
        options: {
          maintainAspectRatio: false,
          animation: false,
          scales: { r: { min: 0, max: 100, ticks: { stepSize: 25, backdropColor: 'transparent' }, grid: { color: R.cor('--grade') }, angleLines: { color: R.cor('--grade') } } },
          plugins: { legend: { position: 'bottom' }, tooltip: { callbacks: { label: function (c) { return c.dataset.label + ': ' + (c.raw == null ? '—' : R.nf(c.raw, 0) + '%'); } } } },
        },
      });
    }

    document.addEventListener('tema', desenhar);
    document.addEventListener('moeda', desenhar);
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', desenhar);
  }).catch(function (e) {
    document.getElementById('comparativo').replaceChildren(R.el('p', { class: 'aviso', text: R.t('js.erroDados', { e: e.message }) }));
  });
})();
