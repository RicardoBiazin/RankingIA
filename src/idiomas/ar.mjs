// Arabic. Gerado a partir de pt/en; validar com: node scripts/validar-idioma.mjs ar
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
    'nav.ranking': 'الترتيب',
    'nav.graficos': 'الرسوم البيانية',
    'nav.comparar': 'مقارنة',
    'nav.metodologia': 'المنهجية',
    'nav.principal': 'الرئيسية',
    'versao.titulo': 'إصدار الموقع',
    'tema.titulo': 'تبديل المظهر الفاتح/الداكن',
    'visual.rotulo': 'الشكل',
    'visual.titulo': 'اختيار شكل الصفحة الرئيسية',
    'visual.padrao': 'الافتراضي',
    'moeda.titulo': 'عملة السعر',
    'idioma.titulo': 'اللغة',
    'rodape.dados': 'البيانات',
    'rodape.release': 'إصدار {d}',
    'rodape.placar': 'لوحة النتائج بتاريخ {d}',
    'rodape.atualizado': 'آخر تحديث {d}.',
    'rodape.aa': 'المؤشرات والأسعار والسرعة من {l}.',
    'rodape.cambio': 'أسعار الصرف المرجعية للبنك المركزي الأوروبي ({l}) بتاريخ {d}: {lista}. الأسعار الأصلية بالدولار الأمريكي.',
    'rodape.falha': 'لم يستجب {f} في آخر عملية جمع؛ يتم عرض بيانات {d}',
    'rodape.feito': 'من تطوير',
    'rodape.codigo': 'مفتوح المصدر (MIT)',
    'rodape.conduta': 'مدونة السلوك',
    'rodape.como': 'كيف تُحسب الدرجة',
    'rodape.autonomo': 'يتم جمع البيانات وإنتاج النتائج في هذا الموقع بشكل مستقل كل يوم بواسطة برنامج، دون أي تعديل يدوي على الدرجات.',
    'fam.titulo': 'تاريخ العائلة',
    'fam.texto': 'إصدارات هذه العائلة وعددها {n}، من الأول إلى الأحدث، حسب تاريخ الإصدار. انقر على نقطة لفتح ذلك الإصدار.',
    'js.familiaNota': 'درجة RankingIA',
    'js.familiaElo': 'Elo في Arena (نص)',
    'js.familiaAA': 'AA Intelligence Index',
    'pos': '#{n}',
    'ctx.mil': '{n}K',
    'ctx.mi': '{n}M',
    'gratis': 'مجاني',
    'ate': 'حتى {p} / 1M',
    'idx.titulo': 'ترتيب نماذج الذكاء الاصطناعي (LLMs) · RankingIA',
    'idx.desc': 'ترتيب {n} نموذجًا للذكاء الاصطناعي بدرجات من LiveBench وLMArena وArtificial Analysis مع أسعار OpenRouter. قارن بين GPT وClaude وGemini وDeepSeek وQwen.',
    'idx.h1': 'ترتيب نماذج الذكاء الاصطناعي',
    'idx.intro': 'درجة من 0 إلى 100 تجمع اختبارات معيارية عامة ({fontes}) وتُظهر تكلفة كل نموذج. تعبّر الدرجة عن نسبة النماذج المصنفة التي يتفوق عليها النموذج، كمتوسط مرجّح. {l}.',
    'idx.como': 'كيف نحسبها',
    'podio.primeiro': 'الأول عمومًا',
    'podio.custo': 'الأفضل قيمة',
    'podio.aberto': 'أفضل نموذج مفتوح الأوزان',
    'podio.arena': 'المفضل لدى الناس (Arena)',
    'nota.n': 'الدرجة {n}',
    'por1m': 'لكل 1M',
    'lugar': 'المركز {p}',
    'filtro.busca': 'ابحث عن نموذج أو شركة',
    'filtro.empresas': 'كل الشركات',
    'filtro.empresa': 'الشركة',
    'filtro.tipo': 'النوع',
    'tipo.todos': 'مفتوحة ومغلقة',
    'tipo.abertos': 'المفتوحة الأوزان فقط',
    'tipo.fechados': 'المغلقة فقط',
    'filtro.preco': 'سعر الإدخال',
    'preco.qualquer': 'أي سعر',
    'mostrar': 'عرض',
    'mostrar.titulo': 'عدد النماذج المعروضة في كل جدول',
    'todos': 'الكل',
    'categoria': 'الفئة',
    'cat.todas': 'الكل',
    'th.posicao': 'المركز',
    'th.modelo': 'النموذج',
    'th.nota': 'الدرجة',
    'th.nota.titulo': 'درجة RankingIA الإجمالية (0–100)',
    'th.notaCat': 'درجة {c}',
    'th.notaCat.titulo': 'درجة {c} (0–100): متوسط النسبة المئوية لـ{m}',
    'th.entrada': 'الإدخال',
    'th.entrada.titulo': 'السعر لكل مليون token إدخال',
    'th.saida': 'الإخراج',
    'th.saida.titulo': 'السعر لكل مليون token إخراج',
    'th.contexto': 'السياق',
    'th.contexto.titulo': 'نافذة السياق بوحدة tokens',
    'th.lancado': 'الإصدار',
    'th.lancado.titulo': 'تاريخ الإصدار',
    'th.comparar': 'مقارنة',
    'caption.ranking': 'الترتيب العام: {n} نموذجًا لديها اختبار معياري موضوعي',
    'selo.aberto': 'مفتوح',
    'selo.aberto.titulo': 'أوزان مفتوحة',
    'outros.h2': 'نماذج أخرى (تفضيل الناس فقط)',
    'outros.texto': 'هذه النماذج وعددها {n} ليس لها اختبار معياري موضوعي بعد ({fontes})، لذلك لا تحصل على درجة. وهي مرتبة حسب Elo في LMArena، وتنطبق هنا المرشحات وعدد الصفوف نفسها.',
    'ou': 'أو',
    'comparar.aria': 'مقارنة {m}',
    'limpar': 'مسح',
    'mod.titulo': '{m} — الدرجة والاختبارات والسعر | RankingIA',
    'mod.desc': 'يحتل {m} المرتبة {pos} في RankingIA بدرجة {n}. اطّلع على الدرجات حسب المصدر والفئة، والسعر ({p} لكل 1M token) والسياق.',
    'mod.descParcial': '{m}: Elo في LMArena {e}، والسعر {p} لكل 1M token، والسياق {c}.',
    'mod.empresaNA': 'الشركة غير معلنة',
    'mod.fora': 'بلا درجة: لا يوجد اختبار معياري موضوعي',
    'mod.posDe': '{pos} من {n} إجمالًا',
    'mod.entradaSaida': 'الإدخال / الإخراج',
    'mod.por1mTokens': '{s} لكل 1M token',
    'mod.tokens': 'tokens',
    'mod.lancamento': 'الإصدار',
    'mod.lancamentoFonte': 'تاريخ الإصدار',
    'mod.pesos': 'الأوزان',
    'mod.abertos': 'مفتوحة',
    'mod.fechados': 'مغلقة',
    'mod.velocidade': 'السرعة',
    'mod.ttft': 'أول token خلال {s} ث',
    'mod.notasFonte': 'الدرجات حسب المصدر',
    'mod.percentilExpl': 'النسبة المئوية = % من النماذج المصنفة التي يتفوق عليها',
    'mod.metrica': 'المقياس',
    'mod.valor': 'القيمة',
    'mod.percentil': 'النسبة المئوية',
    'mod.fonte': 'المصدر',
    'mod.peso': 'الوزن {p}',
    'mod.peso.titulo': 'يُحتسب في الدرجة بوزن {p}',
    'mod.porCategoria': 'حسب الفئة',
    'mod.posicao': 'المركز',
    'mod.metricas': 'المقاييس',
    'mod.evolucao': 'السجل',
    'mod.evolucao.texto': 'درجة RankingIA في كل يوم جمع (مرّر المؤشر لرؤية المركز).',
    'mod.evolucao.aria': 'سجل درجات {m}',
    'mod.evolucao.espera': 'بدأ الجمع اليومي في {d}. يظهر الرسم البياني بدءًا من ثاني يوم يُصنَّف فيه النموذج.',
    'mod.compararOutros': 'قارن مع نماذج أخرى',
    'mod.nasFontes': 'في المصادر',
    'mod.hf': 'Hugging Face (الأوزان)',
    'gr.titulo': 'الرسوم البيانية — جودة نماذج الذكاء الاصطناعي مقابل السعر | RankingIA',
    'gr.desc': 'رسوم بيانية للجودة مقابل السعر، وتفضيل الناس مقابل السعر، وتطور نماذج الذكاء الاصطناعي (LLMs).',
    'gr.h1': 'الرسوم البيانية',
    'gr.intro': 'مرّر المؤشر (أو المس) نقطة لرؤية النموذج. انقر على نقطة لفتح صفحته. السعر هو مزيج 3:1 بين الإدخال والإخراج لكل مليون token، بمقياس لوغاريتمي.',
    'gr.verDados': 'عرض البيانات كجدول',
    'gr.notaPreco': 'درجة RankingIA مقابل السعر',
    'gr.notaPreco.texto': 'كلما كانت النقطة أعلى وأقرب إلى اليسار، كانت القيمة أفضل.',
    'gr.arenaPreco': 'تفضيل الناس (Arena) مقابل السعر',
    'gr.arenaPreco.texto': 'Elo النصي في LMArena، ويشمل نماذج خارج الترتيب العام.',
    'gr.velocidade': 'درجة RankingIA مقابل السرعة',
    'gr.velocidade.texto': 'عدد tokens في الثانية كما تقيسه Artificial Analysis.',
    'gr.fronteira': 'كيف تطور الذكاء الاصطناعي',
    'gr.fronteira.texto': 'كل نقطة تمثل نموذجًا مصنفًا في تاريخ إصداره. تُظهر الخطوط أفضل درجة صدرت حتى كل تاريخ، للنماذج المغلقة والمفتوحة الأوزان.',
    'gr.livebench': 'LiveBench عبر الزمن',
    'gr.livebench.texto': 'الدرجة الإجمالية في LiveBench 2.0 عند كل إصدار، لأفضل 8 نماذج مصنفة.',
    'gr.historico': 'درجة RankingIA عبر الزمن',
    'gr.historico.texto': 'الدرجة اليومية لأفضل 8 نماذج مصنفة منذ بدأ الموقع جمع البيانات.',
    'cmp.titulo': 'قارن نماذج الذكاء الاصطناعي جنبًا إلى جنب | RankingIA',
    'cmp.desc': 'اختر حتى 4 نماذج ذكاء اصطناعي وقارن الدرجة والاختبارات وElo في LMArena والسعر والسياق جنبًا إلى جنب.',
    'cmp.h1': 'مقارنة النماذج',
    'cmp.intro': 'اختر من 2 إلى 4 نماذج. يحتفظ عنوان الصفحة باختيارك، فيمكنك مشاركة الرابط.',
    'cmp.escolha': 'اختيار النماذج',
    'cmp.modeloN': 'النموذج {i}',
    'cmp.opcional': '(اختياري)',
    'cmp.tabela': 'جدول المقارنة',
    'cmp.escolhaAcima': 'اختر النماذج أعلاه.',
    'cmp.perfil': 'الملف حسب الفئة',
    'cmp.perfil.texto': 'النسبة المئوية في كل مقياس (100 = الأفضل في الترتيب).',
    'cmp.radar.aria': 'رسم راداري بالنسبة المئوية لكل نموذج في كل مقياس',
    'e404.titulo': 'الصفحة غير موجودة | RankingIA',
    'e404.desc': 'الصفحة غير موجودة في RankingIA. ارجع إلى ترتيب نماذج الذكاء الاصطناعي لعرض الدرجات والأسعار والمقارنات.',
    'e404.h1': 'الصفحة غير موجودة',
    'e404.texto': 'ربما أُعيدت تسمية النموذج في أحد المصادر.',
    'e404.voltar': 'العودة إلى الترتيب',
    'js.n': '{n} نموذج',
    'js.n1': 'نموذج واحد',
    'js.parcial': '{a} من {b}',
    'js.total': '(من {t})',
    'js.maisUm': '(اختر نموذجًا آخر)',
    'js.notaRankingIA': 'درجة RankingIA',
    'js.entrada': 'الإدخال ({s}/1M)',
    'js.saida': 'الإخراج ({s}/1M)',
    'js.velocidade': 'السرعة (tok/s)',
    'js.fora': 'غير مصنف',
    'js.rankingGeral': 'الترتيب العام',
    'js.outros': 'نماذج أخرى',
    'js.abertos': 'مفتوحة',
    'js.fechados': 'مغلقة',
    'js.erroDados': 'تعذر تحميل البيانات ({e}).',
    'js.pesosFechados': 'أوزان مغلقة',
    'js.pesosAbertos': 'أوزان مفتوحة',
    'js.modelos': 'النماذج',
    'js.precoMedio': 'السعر المختلط ({s} / 1M token، مقياس لوغاريتمي)',
    'js.eloTexto': 'Elo النصي في LMArena',
    'js.tokSeg': 'tokens في الثانية',
    'js.lbGeral': 'LiveBench الإجمالي (%)',
    'js.nota': 'الدرجة {n}',
    'js.lancadoEm': 'صدر في {d}',
    'js.recorde': 'رقم قياسي جديد في {d}',
    'js.melhorHoje': 'الأفضل حتى الآن',
    'js.melhorFechado': 'الأفضل بين المغلقة',
    'js.melhorAberto': 'الأفضل بين المفتوحة',
    'js.modelosFechados': 'النماذج المغلقة',
    'js.modelosAbertos': 'النماذج المفتوحة',
    'js.modelo': 'النموذج',
    'js.precoMedioCurto': 'السعر المختلط / 1M',
    'js.data': 'التاريخ',
    'js.recordista': 'صاحب الرقم القياسي',
    'js.tipo': 'النوع',
    'js.fechado': 'مغلق',
    'js.aberto': 'مفتوح',
    'js.umRelease': 'لا يوجد في LiveBench 2.0 سوى إصدار واحد حتى الآن.',
    'js.histEspera': 'بدأ الجمع اليومي في {d}. يظهر الرسم البياني بدءًا من اليوم الثاني.',
    'js.erroGraficos': 'تعذر تحميل بيانات الرسوم البيانية ({e}).',
    'met.lb_geral': 'LiveBench',
    'met.lb_geral.desc': 'الدرجة الإجمالية في LiveBench 2.0 (مهام طويلة وخالية من التلوث)، بأوزان LiveBench نفسها.',
    'met.aa_inteligencia': 'AA Intelligence Index',
    'met.aa_inteligencia.curto': 'AA Intel.',
    'met.aa_inteligencia.desc': 'مؤشر Intelligence Index من Artificial Analysis.',
    'met.arena_texto': 'Arena نص (Elo)',
    'met.arena_texto.curto': 'Arena',
    'met.arena_texto.desc': 'تفضيل الناس في المحادثات النصية (LMArena).',
    'met.arena_webdev': 'Arena WebDev (Elo)',
    'met.arena_webdev.curto': 'WebDev',
    'met.arena_webdev.desc': 'تفضيل الناس في بناء صفحات الويب والتطبيقات (LMArena).',
    'met.arena_visao': 'Arena رؤية (Elo)',
    'met.arena_visao.curto': 'الرؤية',
    'met.arena_visao.desc': 'تفضيل الناس في مهام الصور (LMArena).',
    'met.lb': 'LiveBench {c}',
    'met.lb.curto': 'LB {c}',
    'met.lb.desc': 'فئة "{c}" في LiveBench 2.0.',
    'lb.lb_agentico': 'وكيلية طويلة',
    'lb.lb_raciocinio': 'الاستدلال',
    'lb.lb_codigo': 'البرمجة',
    'lb.lb_navegador': 'المتصفح',
    'lb.lb_dados': 'تحليل البيانات',
    'lb.lb_pesquisa': 'البحث',
    'lb.lb_design': 'التصميم',
    'lb.lb_matematica': 'الرياضيات',
    'lb.lb_linguagem': 'اللغة',
    'cat.agentico': 'المهام الوكيلية',
    'cat.codigo': 'البرمجة',
    'cat.raciocinio': 'الاستدلال',
    'cat.dados': 'تحليل البيانات',
    'cat.pesquisa': 'البحث',
    'cat.design': 'التصميم',
    'cat.navegador': 'استخدام المتصفح',
    'cat.conversa': 'المحادثة',
    'cat.visao': 'الرؤية',
    'met.aa_financas': 'مؤشر AA للمالية والمحاسبة',
    'met.aa_financas.curto': 'AA المالية',
    'met.aa_financas.desc': 'مؤشر Finance & Accounting من Artificial Analysis: تقييمات لأعمال المعرفة المرتبطة بالمالية.',
    'met.aa_estrategia': 'مؤشر AA للاستراتيجية والعمليات',
    'met.aa_estrategia.curto': 'AA الاستراتيجية',
    'met.aa_estrategia.desc': 'مؤشر Strategy & Ops من Artificial Analysis: تقييمات لاستراتيجية الأعمال والعمليات.',
    'met.aa_juridico': 'مؤشر AA القانوني',
    'met.aa_juridico.curto': 'AA القانون',
    'met.aa_juridico.desc': 'مؤشر Legal من Artificial Analysis: تقييمات للأعمال القانونية.',
    'met.aa_saude': 'مؤشر AA للرعاية الصحية والطب',
    'met.aa_saude.curto': 'AA الصحة',
    'met.aa_saude.desc': 'مؤشر Healthcare & Medical من Artificial Analysis: تقييمات في الرعاية الصحية والطب.',
    'met.aa_engenharia': 'مؤشر AA للهندسة',
    'met.aa_engenharia.curto': 'AA الهندسة',
    'met.aa_engenharia.desc': 'مؤشر Engineering من Artificial Analysis: تقييمات في الهندسة والعلوم والبرمجة الوكيلية.',
    'met.aa_economia': 'مؤشر AA للاقتصاد',
    'met.aa_economia.curto': 'AA الاقتصاد',
    'met.aa_economia.desc': 'مؤشر Economics من Artificial Analysis: تقييمات في الاقتصاد.',
    'cat.financas': 'المالية',
    'cat.estrategia': 'الاستراتيجية والعمليات',
    'cat.juridico': 'القانون',
    'cat.saude': 'الرعاية الصحية',
    'cat.engenharia': 'الهندسة',
    'cat.economia': 'الاقتصاد',
    'mod.custoTarefa': 'التكلفة لكل مهمة',
    'mod.custoTarefa.nota': 'المتوسط في مؤشر AA؛ بلغت تكلفة تشغيل المؤشر كاملًا {s}',
    'mod.tempo': 'زمن الاستجابة',
    'mod.tempo.nota': 'الوسيط، من الطلب إلى آخر token (AA)',
    'mod.pareto': 'حدّ باريتو',
    'mod.pareto.sim': 'نعم',
    'mod.pareto.nao': 'لا',
    'mod.pareto.nota': 'نعم = لا يوجد نموذج أرخص وأعلى درجة في آن واحد (الدرجة × السعر المختلط)',
    'js.pareto': 'حدّ باريتو',
  },

  metodologia: (c) => `<h1>المنهجية</h1>
<p>لا يُجري RankingIA اختبارات خاصة به. فهو يجمع لوحات نتائج عامة تقيس أشياء مختلفة ويعرضها في مكان واحد، بجانب السعر والسياق. تُجمع البيانات مرة واحدة يوميًا.</p>
<h2>المصادر</h2>
<ul>
<li>${LB}: اختبار معياري موضوعي بأسئلة جديدة مع كل إصدار لتفادي التلوث. نستخدم الدرجة الإجمالية في LiveBench 2.0 ودرجة كل فئة.</li>
<li>${LA}: يقارن الناس إجابتين مجهولتي المصدر ويصوّتون، فتتحول الأصوات إلى تقييم Elo. نستخدم ساحات النص وWebDev والرؤية. وعندما يكون للنموذج عدة أوضاع ("High" و"Max") يُحتفظ بأفضل Elo.</li>
<li>${OR}: السعر لكل مليون token ونافذة السياق وتاريخ الإصدار وما إذا كانت الأوزان مفتوحة.</li>
<li>${AA}: مؤشر Intelligence Index، إضافة إلى السعر والسرعة (نقطة نهاية مجانية في API V2). ${c.aa ? 'قيد الاستخدام.' : 'غير مستخدم بعد.'}</li>
<li>${FR}: أسعار الصرف المرجعية للبنك المركزي الأوروبي، لعرض الأسعار بعملات أخرى.</li>
</ul>
<h2>درجة RankingIA</h2>
<ol>
<li>يضم الترتيب العام النماذج التي لديها اختبار معياري موضوعي واحد على الأقل (${c.exige}). أما البقية فتظهر ضمن "نماذج أخرى"، بلا درجة.</li>
<li>نحسب لكل مقياس <strong>النسبة المئوية</strong>: حصة النماذج المصنفة التي يتفوق عليها هذا النموذج (التعادل يُحتسب نصفًا). وهكذا يقع Elo ونسبة الإجابات الصحيحة على المقياس نفسه من 0 إلى 100.</li>
<li>الدرجة هي المتوسط المرجّح للنسب المئوية المتوفرة للنموذج. المقياس المفقود لا يُحتسب، لا له ولا عليه.</li>
<li>حتى لا يقفز نموذج قليل الأدلة إلى القمة بمقياس واحد، يُضاف إلى المتوسط وزن إضافي قدره ${c.neutro} عند النسبة المئوية 50.</li>
</ol>
${c.pesos}
<h2>الفئات</h2>
<p>لكل فئة درجتها الخاصة: متوسط النسب المئوية لمقاييسها، مع التقليص نفسه. الفئات ومقاييسها:</p>
${c.cats}
<h2>تطور كل نموذج</h2>
<p>تُجمَّع نماذج العائلة الواحدة (مثل Claude Opus 3 و4 و4.5 و5.5) حسب الاسم دون رقم الإصدار. وتعرض صفحة كل نموذج العائلة كلها بترتيب الإصدار.</p>
<h2>أسماء النماذج</h2>
<p>يكتب كل مصدر الأسماء بطريقته ("Claude Opus 5.5 (High)" و"anthropic/claude-opus-5.5"). نطابقها بمفتاح بلا شركة أو تاريخ أو وضع جهد؛ والحالات التي لا تلتقطها القاعدة تدخل في قائمة أسماء بديلة تُراجَع يدويًا. إذا ظهر نموذج مكررًا أو مختلطًا بغيره، ${ISSUE('افتح issue')}.</p>
<h2>المؤشرات الإعلامية</h2>
<p>تظهر بعض المؤشرات في الصفحات لكنها لا تدخل في درجة RankingIA:</p>
<ul>
<li>مؤشرات Artificial Analysis حسب المجال (المالية، والاستراتيجية والعمليات، والقانون، والرعاية الصحية، والهندسة، والاقتصاد): تعيد استخدام تقييمات مؤشر الذكاء نفسها، فجمعها سيحسب العمل ذاته مرتين. لذلك تُعرض كفئات مستقلة.</li>
<li>التكلفة لكل مهمة وتكلفة تشغيل المؤشر كاملًا (Artificial Analysis): متوسط تكلفة مهمة واحدة من المؤشر، مع احتساب tokens الاستدلال والإجابة. النماذج التي "تفكر" أكثر تصبح أغلى مما يوحي به السعر لكل token.</li>
<li>زمن الاستجابة: الوسيط من الطلب حتى آخر token، وتقيسه Artificial Analysis.</li>
<li>حدّ باريتو: النماذج التي لا يوجد نموذج آخر أرخص وأعلى درجة منها في آن واحد، بحسب السعر المختلط (3 أجزاء للإدخال مقابل جزء للإخراج). يظهر كخط متقطع في رسم الدرجة × السعر.</li>
</ul>
<h2>القيود</h2>
<ul>
<li>النسبة المئوية تعتمد على المجموعة: حين يدخل نموذج قوي قد يتراجع غيره دون أن يسوء أداؤه.</li>
<li>يقيس Elo التفضيل لا الدقة. ولأسلوب الإجابة وطولها تأثير.</li>
<li>الأسعار من OpenRouter (الأدنى بين المزوّدين)؛ وقد يختلف السعر لدى الشركة المصنِّعة مباشرة.</li>
</ul>
<h2>مراجع أخرى</h2>
<p>هذه المواقع تتابع نماذج الذكاء الاصطناعي أيضًا، لكنها لا تدخل في الدرجة:</p>
<ul>
<li>${L('https://benchlm.ai/', 'BenchLM')}: يجمع مئات الاختبارات المعيارية. تشترط شروطه اتفاقًا منفصلًا لعرض بياناته في موقع عام.</li>
<li>${L('https://hai.stanford.edu/ai-index', 'Stanford HAI — AI Index')}: تقرير سنوي عن حال الذكاء الاصطناعي؛ وليس لوحة نتائج لكل نموذج تُحدَّث يوميًا.</li>
<li>${L('https://ia.com.br/melhores-ias', 'ia.com.br — Melhores IAs')}: ترتيب بالبرتغالية يعيد نشر بيانات Artificial Analysis وOpenRouter وDesign Arena؛ ليس له API ولا يشرح كيف تُحسب درجته ولا يمنح ترخيصًا لإعادة استخدام البيانات، ويكرر مصادر يقرأها RankingIA مباشرة.</li>
<li>${L('https://www.designarena.ai/', 'Design Arena')}: تقييم Elo من أصوات الناس على المواقع والتطبيقات والصور والفيديو. يمنع ملف robots.txt الوصول الآلي إلى API ولا يوجد ترخيص لإعادة استخدام البيانات.</li>
<li>${L('https://swen.ia.br/ranking', 'SWEN.AI')}: ترتيب بالبرتغالية مبني على بيانات Artificial Analysis وحدها، وهي مصدر يستخدمه RankingIA مباشرة.</li>
</ul>
<h2>حالة المصادر</h2>
${c.status}
<p>بيانات كل مصدر ملك لأصحابها وتخضع لشروطهم. شيفرة RankingIA مفتوحة المصدر بترخيص MIT على ${GH}.</p>`,

  titulo: ['المنهجية — كيف تُحسب درجة RankingIA', 'من أين تأتي بيانات RankingIA، وكيف نجمع LiveBench وLMArena وOpenRouter وArtificial Analysis في درجة من 0 إلى 100، وما هي حدودها.'],

  status: ['المصدر', 'آخر جمع', 'بيانات بتاريخ', 'المقياس', 'الوزن', 'الفئة', 'المقاييس', 'فشل'],
};
