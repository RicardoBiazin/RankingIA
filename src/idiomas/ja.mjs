// Japanese. Gerado a partir de pt/en; validar com: node scripts/validar-idioma.mjs ja
const L = (url, nome) => `<a href="${url}" rel="noopener">${nome}</a>`;
const LB = L('https://livebench.ai/', 'LiveBench');
const LA = L('https://arena.ai/leaderboard', 'LMArena (arena.ai)');
const OR = L('https://openrouter.ai/models', 'OpenRouter');
const AA = L('https://artificialanalysis.ai/', 'Artificial Analysis');
const FR = L('https://frankfurter.dev/', 'Frankfurter');
const GH = L('https://github.com/RicardoBiazin/RankingIA', 'github.com/RicardoBiazin/RankingIA');
const ISSUE = (txt) => L('https://github.com/RicardoBiazin/RankingIA/issues', txt);

export default {
  t: {
    'nav.ranking': 'ランキング',
    'nav.graficos': 'グラフ',
    'nav.comparar': '比較',
    'nav.metodologia': '算出方法',
    'nav.principal': 'メイン',
    'versao.titulo': 'サイトのバージョン',
    'tema.titulo': 'ライト/ダークテーマを切り替え',
    'visual.rotulo': '表示',
    'visual.titulo': 'トップページの見た目を選ぶ',
    'visual.padrao': '標準',
    'moeda.titulo': '価格の通貨',
    'idioma.titulo': '言語',
    'rodape.dados': 'データ',
    'rodape.release': '{d}のリリース',
    'rodape.placar': '{d}のリーダーボード',
    'rodape.atualizado': '{d}に更新。',
    'rodape.aa': '指数・価格・速度は{l}より。',
    'rodape.cambio': 'ECB参考為替レート（{l}）、{d}時点：{lista}。元の価格は米ドル建てです。',
    'rodape.falha': '{f}は前回の収集で応答がなく、{d}のデータを表示しています',
    'rodape.feito': '制作',
    'rodape.codigo': 'オープンソース（MIT）',
    'rodape.conduta': '行動規範',
    'rodape.como': 'スコアの算出方法',
    'rodape.autonomo': 'このサイトのデータ収集と結果は、ソフトウェアが毎日自動で生成しており、スコアを手作業で編集することはありません。',
    'fam.titulo': 'ファミリーの履歴',
    'fam.texto': 'このファミリーの{n}バージョンを、リリース日の古い順に表示しています。点をクリックするとそのバージョンのページが開きます。',
    'js.familiaNota': 'RankingIAスコア',
    'js.familiaElo': 'Arena Elo（テキスト）',
    'js.familiaAA': 'AA Intelligence Index',
    'pos': '{n}位',
    'ctx.mil': '{n}K',
    'ctx.mi': '{n}M',
    'gratis': '無料',
    'ate': '最大 {p} / 100万',
    'idx.titulo': 'AIモデル ランキング（LLM）· RankingIA',
    'idx.desc': 'LiveBench、LMArena、Artificial Analysisをもとに{n}のAIモデルをスコア化し、OpenRouterの価格を併記。GPT、Claude、Gemini、DeepSeek、Qwenを比較できます。',
    'idx.h1': 'AIモデル ランキング',
    'idx.intro': '公開ベンチマーク（{fontes}）を組み合わせた0〜100のスコアで、各モデルの費用も確認できます。スコアは、ランキング対象のモデルのうち何%を上回るかを加重平均したものです。{l}。',
    'idx.como': '算出方法',
    'podio.primeiro': '総合1位',
    'podio.custo': 'コスパ最良',
    'podio.aberto': '最良のオープンウェイトモデル',
    'podio.arena': 'みんなのお気に入り（Arena）',
    'nota.n': 'スコア {n}',
    'por1m': '/ 100万',
    'lugar': '{p}位',
    'filtro.busca': 'モデル名・企業名で検索',
    'filtro.empresas': 'すべての企業',
    'filtro.empresa': '企業',
    'filtro.tipo': '種類',
    'tipo.todos': 'オープン・クローズド両方',
    'tipo.abertos': 'オープンウェイトのみ',
    'tipo.fechados': 'クローズドのみ',
    'filtro.preco': '入力価格',
    'preco.qualquer': '指定なし',
    'mostrar': '表示',
    'mostrar.titulo': '各表に表示するモデル数',
    'todos': 'すべて',
    'categoria': 'カテゴリ',
    'cat.todas': 'すべて',
    'th.posicao': '順位',
    'th.modelo': 'モデル',
    'th.nota': 'スコア',
    'th.nota.titulo': 'RankingIA総合スコア（0〜100）',
    'th.notaCat': '{c}スコア',
    'th.notaCat.titulo': '{c}スコア（0〜100）：{m}のパーセンタイル平均',
    'th.entrada': '入力',
    'th.entrada.titulo': '入力トークン100万あたりの価格',
    'th.saida': '出力',
    'th.saida.titulo': '出力トークン100万あたりの価格',
    'th.contexto': 'コンテキスト',
    'th.contexto.titulo': 'コンテキストウィンドウ（トークン数）',
    'th.lancado': 'リリース',
    'th.lancado.titulo': 'リリース日',
    'th.comparar': '比較',
    'caption.ranking': '総合ランキング：客観ベンチマークのある{n}モデル',
    'selo.aberto': 'オープン',
    'selo.aberto.titulo': 'オープンウェイト',
    'outros.h2': 'その他のモデル（人間の好みのみ）',
    'outros.texto': 'この{n}モデルは客観ベンチマーク（{fontes}）がまだないため、スコアはありません。LMArena Elo順に並べており、フィルターと表示件数は上の表と共通です。',
    'ou': 'または',
    'comparar.aria': '{m}を比較に追加',
    'limpar': 'クリア',
    'mod.titulo': '{m} — スコア・ベンチマーク・価格 | RankingIA',
    'mod.desc': '{m}はRankingIAで{pos}、スコアは{n}。ソース別・カテゴリ別のスコア、価格（100万トークンあたり{p}）、コンテキストを確認できます。',
    'mod.descParcial': '{m}：LMArena Elo {e}、価格は100万トークンあたり{p}、コンテキスト{c}。',
    'mod.empresaNA': '企業情報なし',
    'mod.fora': 'スコアなし：客観ベンチマークがありません',
    'mod.posDe': '総合{n}モデル中{pos}',
    'mod.entradaSaida': '入力 / 出力',
    'mod.por1mTokens': '100万トークンあたり{s}',
    'mod.tokens': 'トークン',
    'mod.lancamento': 'リリース',
    'mod.lancamentoFonte': 'リリース日',
    'mod.pesos': 'ウェイト',
    'mod.abertos': 'オープン',
    'mod.fechados': 'クローズド',
    'mod.velocidade': '速度',
    'mod.ttft': '最初のトークンまで{s}秒',
    'mod.notasFonte': 'ソース別スコア',
    'mod.percentilExpl': 'パーセンタイル＝ランキング対象モデルのうち上回った割合',
    'mod.metrica': '指標',
    'mod.valor': '値',
    'mod.percentil': 'パーセンタイル',
    'mod.fonte': 'ソース',
    'mod.peso': '重み {p}',
    'mod.peso.titulo': '重み{p}でスコアに反映されます',
    'mod.porCategoria': 'カテゴリ別',
    'mod.posicao': '順位',
    'mod.metricas': '指標',
    'mod.evolucao': '推移',
    'mod.evolucao.texto': '収集日ごとのRankingIAスコア（ポイントに合わせると順位が表示されます）。',
    'mod.evolucao.aria': '{m}のスコア推移',
    'mod.evolucao.espera': '毎日の収集は{d}に始まりました。グラフは、モデルがランクインして2日目から表示されます。',
    'mod.compararOutros': '他のモデルと比較',
    'mod.nasFontes': '各ソースで見る',
    'mod.hf': 'Hugging Face（ウェイト）',
    'gr.titulo': 'グラフ — AIモデルの品質と価格 | RankingIA',
    'gr.desc': '品質と価格、人間の好みと価格、そしてAIモデル（LLM）の進化を示すグラフ。',
    'gr.h1': 'グラフ',
    'gr.intro': '点にカーソルを合わせる（またはタップする）とモデルが表示され、クリックするとそのページが開きます。価格は入力:出力を3:1で加重した100万トークンあたりの価格で、対数目盛です。',
    'gr.verDados': 'データを表で見る',
    'gr.notaPreco': 'RankingIAスコアと価格',
    'gr.notaPreco.texto': '左上にあるほどコスパが高いことを示します。',
    'gr.arenaPreco': '人間の好み（Arena）と価格',
    'gr.arenaPreco.texto': 'LMArenaテキストのElo。総合ランキング対象外のモデルも含みます。',
    'gr.velocidade': 'RankingIAスコアと速度',
    'gr.velocidade.texto': 'Artificial Analysisが測定した毎秒トークン数。',
    'gr.fronteira': 'AIの進化',
    'gr.fronteira.texto': '各点は、ランキング対象モデルをリリース日に配置したものです。線は、クローズドとオープンウェイトそれぞれについて、各日付までの最高スコアを示します。',
    'gr.livebench': 'LiveBenchの推移',
    'gr.livebench.texto': 'ランキング上位8モデルの、各リリース時点のLiveBench 2.0総合スコア。',
    'gr.historico': 'RankingIAスコアの推移',
    'gr.historico.texto': 'サイトの収集開始以降の、ランキング上位8モデルの日次スコア。',
    'cmp.titulo': 'AIモデルを並べて比較 | RankingIA',
    'cmp.desc': '最大4つのAIモデルを選び、スコア、ベンチマーク、LMArena Elo、価格、コンテキストを並べて比較できます。',
    'cmp.h1': 'モデルを比較',
    'cmp.intro': '2〜4モデルを選んでください。選択内容はページのアドレスに保存されるので、リンクで共有できます。',
    'cmp.escolha': 'モデルの選択',
    'cmp.modeloN': 'モデル{i}',
    'cmp.opcional': '（任意）',
    'cmp.tabela': '比較表',
    'cmp.escolhaAcima': '上でモデルを選んでください。',
    'cmp.perfil': 'カテゴリ別プロファイル',
    'cmp.perfil.texto': '各指標のパーセンタイル（100＝ランキング内で最高）。',
    'cmp.radar.aria': '各モデルの指標別パーセンタイルのレーダーチャート',
    'e404.titulo': 'ページが見つかりません | RankingIA',
    'e404.desc': 'RankingIAにこのページはありません。AIモデルのランキングに戻って、スコア・価格・比較をご覧ください。',
    'e404.h1': 'ページが見つかりません',
    'e404.texto': 'いずれかのソースでモデル名が変更された可能性があります。',
    'e404.voltar': 'ランキングに戻る',
    'js.n': '{n}モデル',
    'js.n1': '1モデル',
    'js.parcial': '{b}中{a}',
    'js.total': '（全{t}）',
    'js.maisUm': '（あと1つ選択）',
    'js.notaRankingIA': 'RankingIAスコア',
    'js.entrada': '入力（{s}/100万）',
    'js.saida': '出力（{s}/100万）',
    'js.velocidade': '速度（tok/s）',
    'js.fora': '圏外',
    'js.rankingGeral': '総合ランキング',
    'js.outros': 'その他のモデル',
    'js.abertos': 'オープン',
    'js.fechados': 'クローズド',
    'js.erroDados': 'データを読み込めませんでした（{e}）。',
    'js.pesosFechados': 'クローズドウェイト',
    'js.pesosAbertos': 'オープンウェイト',
    'js.modelos': 'モデル',
    'js.precoMedio': '加重平均価格（{s} / 100万トークン、対数目盛）',
    'js.eloTexto': 'LMArena Elo（テキスト）',
    'js.tokSeg': '毎秒トークン数',
    'js.lbGeral': 'LiveBench総合（%）',
    'js.nota': 'スコア {n}',
    'js.lancadoEm': '{d}リリース',
    'js.recorde': '{d}に最高記録を更新',
    'js.melhorHoje': '現時点の最高',
    'js.melhorFechado': 'クローズド最高',
    'js.melhorAberto': 'オープン最高',
    'js.modelosFechados': 'クローズドモデル',
    'js.modelosAbertos': 'オープンモデル',
    'js.modelo': 'モデル',
    'js.precoMedioCurto': '加重平均価格 / 100万',
    'js.data': '日付',
    'js.recordista': '記録保持モデル',
    'js.tipo': '種類',
    'js.fechado': 'クローズド',
    'js.aberto': 'オープン',
    'js.umRelease': 'LiveBench 2.0のリリースはまだ1回だけです。',
    'js.histEspera': '毎日の収集は{d}に始まりました。グラフは2日目から表示されます。',
    'js.erroGraficos': 'グラフのデータを読み込めませんでした（{e}）。',
    'met.lb_geral': 'LiveBench',
    'met.lb_geral.desc': 'LiveBench 2.0の総合スコア（長文・汚染のないタスク）。LiveBench独自の重み付けによります。',
    'met.aa_inteligencia': 'AA Intelligence Index',
    'met.aa_inteligencia.curto': 'AA知能',
    'met.aa_inteligencia.desc': 'Artificial AnalysisのIntelligence Index。',
    'met.arena_texto': 'Arena テキスト（Elo）',
    'met.arena_texto.curto': 'Arena',
    'met.arena_texto.desc': 'テキスト会話における人間の好み（LMArena）。',
    'met.arena_webdev': 'Arena WebDev（Elo）',
    'met.arena_webdev.curto': 'WebDev',
    'met.arena_webdev.desc': 'Webページやアプリの作成における人間の好み（LMArena）。',
    'met.arena_visao': 'Arena ビジョン（Elo）',
    'met.arena_visao.curto': 'ビジョン',
    'met.arena_visao.desc': '画像タスクにおける人間の好み（LMArena）。',
    'met.lb': 'LiveBench {c}',
    'met.lb.curto': 'LB {c}',
    'met.lb.desc': 'LiveBench 2.0「{c}」カテゴリ。',
    'lb.lb_agentico': '長時間エージェント',
    'lb.lb_raciocinio': '推論',
    'lb.lb_codigo': 'コーディング',
    'lb.lb_navegador': 'ブラウザ',
    'lb.lb_dados': 'データ分析',
    'lb.lb_pesquisa': 'リサーチ',
    'lb.lb_design': 'デザイン',
    'lb.lb_matematica': '数学',
    'lb.lb_linguagem': '言語',
    'cat.agentico': 'エージェント',
    'cat.codigo': 'コーディング',
    'cat.raciocinio': '推論',
    'cat.dados': 'データ分析',
    'cat.pesquisa': 'リサーチ',
    'cat.design': 'デザイン',
    'cat.navegador': 'ブラウザ操作',
    'cat.conversa': '会話',
    'cat.visao': 'ビジョン',
    'met.aa_financas': 'AA 財務・会計指数',
    'met.aa_financas.curto': 'AA財務',
    'met.aa_financas.desc': 'Artificial Analysisの財務・会計指数：財務に関するナレッジワーク評価。',
    'met.aa_estrategia': 'AA 戦略・運営指数',
    'met.aa_estrategia.curto': 'AA戦略',
    'met.aa_estrategia.desc': 'Artificial Analysisの戦略・運営指数：経営戦略とオペレーションの評価。',
    'met.aa_juridico': 'AA 法務指数',
    'met.aa_juridico.curto': 'AA法務',
    'met.aa_juridico.desc': 'Artificial Analysisの法務指数：法務業務の評価。',
    'met.aa_saude': 'AA ヘルスケア・医療指数',
    'met.aa_saude.curto': 'AA医療',
    'met.aa_saude.desc': 'Artificial Analysisのヘルスケア・医療指数：医療・ヘルスケアの評価。',
    'met.aa_engenharia': 'AA エンジニアリング指数',
    'met.aa_engenharia.curto': 'AA工学',
    'met.aa_engenharia.desc': 'Artificial Analysisのエンジニアリング指数：工学、科学、エージェント型コーディングの評価。',
    'met.aa_economia': 'AA 経済学指数',
    'met.aa_economia.curto': 'AA経済',
    'met.aa_economia.desc': 'Artificial Analysisの経済学指数：経済学の評価。',
    'cat.financas': '財務',
    'cat.estrategia': '戦略・運営',
    'cat.juridico': '法務',
    'cat.saude': 'ヘルスケア',
    'cat.engenharia': 'エンジニアリング',
    'cat.economia': '経済学',
    'mod.custoTarefa': 'タスクあたりのコスト',
    'mod.custoTarefa.nota': 'AA指数での平均。指数全体の実行コストは{s}',
    'mod.tempo': '応答時間',
    'mod.tempo.nota': '中央値（リクエストから最後のトークンまで、AA）',
    'mod.pareto': 'パレートフロンティア',
    'mod.pareto.sim': 'はい',
    'mod.pareto.nao': 'いいえ',
    'mod.pareto.nota': 'はい＝より安く、かつスコアも高いモデルが存在しない（スコア × 加重平均価格）',
    'js.pareto': 'パレートフロンティア',
  },

  metodologia: (c) => `<h1>算出方法</h1>
<p>RankingIAは独自のテストを実施しません。異なる側面を測る公開リーダーボードを集め、価格やコンテキストと並べて一か所に表示します。データは1日1回収集しています。</p>
<h2>データソース</h2>
<ul>
<li>${LB}：客観的なベンチマーク。汚染を避けるため、リリースごとに新しい問題が追加されます。LiveBench 2.0の総合スコアと各カテゴリを使用しています。</li>
<li>${LA}：ユーザーが匿名の2つの回答を比べて投票し、その結果がEloレーティングになります。テキスト、WebDev、ビジョンのアリーナを使用しています。1つのモデルに複数のモード（「High」「Max」）がある場合は、最も高いEloを採用します。</li>
<li>${OR}：100万トークンあたりの価格、コンテキストウィンドウ、リリース日、ウェイトが公開されているかどうか。</li>
<li>${AA}：Intelligence Index、および価格と速度（API V2の無料エンドポイント）。${c.aa ? '利用中です。' : 'まだ利用していません。'}</li>
<li>${FR}：欧州中央銀行の参考為替レート。価格を他の通貨で表示するために使います。</li>
</ul>
<h2>RankingIAスコア</h2>
<ol>
<li>総合ランキングには、客観ベンチマークを少なくとも1つ持つモデル（${c.exige}）が入ります。それ以外のモデルは「その他のモデル」に表示され、スコアはありません。</li>
<li>各指標について<strong>パーセンタイル</strong>を計算します。これは、ランキング対象のモデルのうちそのモデルが上回る割合です（同点は半分として数えます）。これにより、Eloと正答率が0〜100の同じ尺度にそろいます。</li>
<li>スコアは、そのモデルが持つパーセンタイルの加重平均です。欠けている指標は、有利にも不利にもならず、計算に含めません。</li>
<li>根拠の少ないモデルが1つの指標だけで上位に躍り出ないよう、平均にはパーセンタイル50で重み${c.neutro}の項目を追加しています。</li>
</ol>
${c.pesos}
<h2>カテゴリ</h2>
<p>各カテゴリには独自のスコアがあります。そのカテゴリに属する指標のパーセンタイル平均で、同じ補正を行っています。カテゴリと指標は次のとおりです。</p>
${c.cats}
<h2>各モデルの推移</h2>
<p>同じファミリーのモデル（例：Claude Opus 3、4、4.5、5.5）は、バージョン番号を除いた名前でまとめています。各モデルのページには、ファミリー全体がリリース順に表示されます。</p>
<h2>モデル名</h2>
<p>ソースごとにモデル名の表記が異なります（「Claude Opus 5.5 (High)」「anthropic/claude-opus-5.5」など）。企業名、日付、推論モードを除いたキーで照合し、ルールで拾えないケースは手作業で確認したエイリアス一覧に登録しています。モデルが重複していたり取り違えられていたりする場合は、${ISSUE('issueを作成してください')}。</p>
<h2>参考指標</h2>
<p>画面には表示されるものの、RankingIAスコアには含めない指標があります。</p>
<ul>
<li>Artificial Analysisの分野別指数（財務、戦略・運営、法務、ヘルスケア、エンジニアリング、経済学）：Intelligence Indexと同じ評価を再利用しているため、加算すると同じ内容を二重に数えることになります。そのため、独立したカテゴリとして扱います。</li>
<li>タスクあたりのコストと指数全体の実行コスト（Artificial Analysis）：指数の1タスクにかかる平均コストで、推論と回答のトークンを含みます。より多く「考える」モデルは、トークン単価から想像されるより高くつきます。</li>
<li>応答時間：リクエストから最後のトークンまでの中央値。Artificial Analysisが測定しています。</li>
<li>パレートフロンティア：より安く、かつスコアも高い別のモデルが存在しないモデル。加重平均価格（入力3：出力1）で判定します。スコア × 価格のグラフでは破線で表示されます。</li>
</ul>
<h2>制限事項</h2>
<ul>
<li>パーセンタイルは母集団に依存します。強いモデルが加わると、他のモデルは性能が落ちていなくても順位が下がることがあります。</li>
<li>Eloが測るのは好みであり、正確さではありません。回答のスタイルや長さが影響します。</li>
<li>価格はOpenRouterのもの（プロバイダ間の最安値）です。提供元の直販価格は異なる場合があります。</li>
</ul>
<h2>その他の参考サイト</h2>
<p>以下のサイトもAIモデルを追跡していますが、スコアには含めていません。</p>
<ul>
<li>${L('https://benchlm.ai/', 'BenchLM')}：数百のベンチマークを集計しています。利用規約上、公開サイトでデータを表示するには別途の契約が必要です。</li>
<li>${L('https://hai.stanford.edu/ai-index', 'Stanford HAI — AI Index')}：AIの現状に関する年次レポート。毎日更新されるモデル別リーダーボードではありません。</li>
<li>${L('https://ia.com.br/melhores-ias', 'ia.com.br — Melhores IAs')}：Artificial Analysis、OpenRouter、Design Arenaのデータを再掲するポルトガル語のランキング。APIがなく、スコアの計算方法の説明もなく、データ再利用のライセンスもありません。また、RankingIAがすでに直接参照しているソースの繰り返しです。</li>
<li>${L('https://www.designarena.ai/', 'Design Arena')}：ウェブサイト、アプリ、画像、動画に対する人々の投票によるElo。robots.txtでAPIへの自動アクセスが禁止されており、データ再利用のライセンスもありません。</li>
<li>${L('https://swen.ia.br/ranking', 'SWEN.AI')}：Artificial Analysisのデータのみで作られたポルトガル語のランキング。RankingIAはそのデータを直接利用しています。</li>
</ul>
<h2>ソースの状況</h2>
${c.status}
<p>各ソースのデータはそれぞれの所有者に帰属し、その利用規約に従います。RankingIAのコードはMITライセンスのオープンソースで、${GH}で公開しています。</p>`,

  titulo: [
    '算出方法 — RankingIAスコアの計算のしかた',
    'RankingIAのデータの出どころ、LiveBench・LMArena・OpenRouter・Artificial Analysisを0〜100のスコアにまとめる方法、そしてその制限事項。',
  ],

  status: ['ソース', '最終収集', 'データ日付', '指標', '重み', 'カテゴリ', '指標', '失敗'],
};
