// Bengali. Gerado a partir de pt/en; validar com: node scripts/validar-idioma.mjs bn
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
    'nav.ranking': 'র‍্যাঙ্কিং',
    'nav.graficos': 'চার্ট',
    'nav.comparar': 'তুলনা',
    'nav.metodologia': 'পদ্ধতি',
    'nav.principal': 'প্রধান',
    'versao.titulo': 'সাইটের সংস্করণ',
    'tema.titulo': 'হালকা/গাঢ় থিম বদলান',
    'moeda.titulo': 'দামের মুদ্রা',
    'idioma.titulo': 'ভাষা',
    'rodape.dados': 'ডেটা',
    'rodape.release': '{d}-এর রিলিজ',
    'rodape.placar': '{d}-এর স্কোরবোর্ড',
    'rodape.atualizado': 'হালনাগাদ: {d}।',
    'rodape.aa': 'ইনডেক্স, দাম ও গতি: {l}।',
    'rodape.cambio': '{d} তারিখে ECB-র রেফারেন্স বিনিময় হার ({l}): {lista}। মূল দাম মার্কিন ডলারে।',
    'rodape.falha': 'শেষ সংগ্রহে {f} সাড়া দেয়নি; {d}-এর ডেটা দেখানো হচ্ছে',
    'rodape.feito': 'তৈরি করেছেন',
    'rodape.codigo': 'ওপেন সোর্স (MIT)',
    'rodape.conduta': 'আচরণবিধি',
    'rodape.como': 'স্কোর কীভাবে হিসাব করা হয়',
    'rodape.autonomo': 'এই সাইটের ডেটা সংগ্রহ ও ফলাফল প্রতিদিন সফটওয়্যার নিজে থেকেই তৈরি করে; স্কোর হাতে বদলানো হয় না।',
    'fam.titulo': 'পরিবারের ইতিহাস',
    'fam.texto': 'এই পরিবারের {n}টি সংস্করণ, রিলিজের তারিখ অনুযায়ী প্রথম থেকে সর্বশেষ। কোনো সংস্করণ খুলতে বিন্দুতে ক্লিক করুন।',
    'js.familiaNota': 'RankingIA স্কোর',
    'js.familiaElo': 'Arena Elo (টেক্সট)',
    'js.familiaAA': 'AA Intelligence Index',
    'pos': '#{n}',
    'ctx.mil': '{n}K',
    'ctx.mi': '{n}M',
    'gratis': 'বিনামূল্যে',
    'ate': 'সর্বোচ্চ {p} / 1M',
    'idx.titulo': 'এআই মডেলের র‍্যাঙ্কিং (LLM) · RankingIA',
    'idx.desc': 'LiveBench, LMArena ও Artificial Analysis থেকে স্কোর করা {n}টি এআই মডেলের র‍্যাঙ্কিং, সঙ্গে OpenRouter-এর দাম। GPT, Claude, Gemini, DeepSeek ও Qwen তুলনা করুন।',
    'idx.h1': 'এআই মডেলের র‍্যাঙ্কিং',
    'idx.intro': 'পাবলিক বেঞ্চমার্ক ({fontes}) মিলিয়ে 0–100 স্কোর, আর প্রতিটি মডেলের খরচও দেখানো হয়। স্কোর বলে, ওজনযুক্ত গড়ে এই মডেল র‍্যাঙ্ক করা মডেলগুলোর কত শতাংশকে ছাড়িয়ে গেছে। {l}।',
    'idx.como': 'কীভাবে হিসাব করি',
    'podio.primeiro': 'সামগ্রিকভাবে #1',
    'podio.custo': 'সেরা মূল্যমান',
    'podio.aberto': 'সেরা ওপেন-ওয়েট মডেল',
    'podio.arena': 'মানুষের পছন্দ (Arena)',
    'nota.n': 'স্কোর {n}',
    'por1m': 'প্রতি 1M',
    'lugar': '{p} নম্বর স্থান',
    'filtro.busca': 'মডেল বা কোম্পানি খুঁজুন',
    'filtro.empresas': 'সব কোম্পানি',
    'filtro.empresa': 'কোম্পানি',
    'filtro.tipo': 'ধরন',
    'tipo.todos': 'ওপেন ও ক্লোজড',
    'tipo.abertos': 'শুধু ওপেন-ওয়েট',
    'tipo.fechados': 'শুধু ক্লোজড',
    'filtro.preco': 'ইনপুটের দাম',
    'preco.qualquer': 'যেকোনো দাম',
    'mostrar': 'দেখান',
    'mostrar.titulo': 'প্রতিটি টেবিলে কতগুলো মডেল দেখাবেন',
    'todos': 'সব',
    'categoria': 'বিভাগ',
    'cat.todas': 'সব',
    'th.posicao': 'র‍্যাঙ্ক',
    'th.modelo': 'মডেল',
    'th.nota': 'স্কোর',
    'th.nota.titulo': 'RankingIA-র সামগ্রিক স্কোর (0–100)',
    'th.notaCat': '{c} স্কোর',
    'th.notaCat.titulo': '{c} স্কোর (0–100): {m}-এর গড় পার্সেন্টাইল',
    'th.entrada': 'ইনপুট',
    'th.entrada.titulo': '1 মিলিয়ন ইনপুট টোকেনের দাম',
    'th.saida': 'আউটপুট',
    'th.saida.titulo': '1 মিলিয়ন আউটপুট টোকেনের দাম',
    'th.contexto': 'কনটেক্সট',
    'th.contexto.titulo': 'টোকেনে কনটেক্সট উইন্ডো',
    'th.lancado': 'রিলিজ',
    'th.lancado.titulo': 'রিলিজের তারিখ',
    'th.comparar': 'তুলনা',
    'caption.ranking': 'সামগ্রিক র‍্যাঙ্কিং: বস্তুনিষ্ঠ বেঞ্চমার্কসহ {n}টি মডেল',
    'selo.aberto': 'ওপেন',
    'selo.aberto.titulo': 'ওপেন ওয়েটস',
    'outros.h2': 'অন্যান্য মডেল (শুধু মানুষের পছন্দ)',
    'outros.texto': 'এই {n}টি মডেলের এখনও কোনো বস্তুনিষ্ঠ বেঞ্চমার্ক নেই ({fontes}), তাই স্কোর নেই। এগুলো LMArena Elo অনুযায়ী সাজানো; একই ফিল্টার ও সারির সংখ্যা এখানেও খাটে।',
    'ou': 'বা',
    'comparar.aria': '{m} তুলনা করুন',
    'limpar': 'মুছুন',
    'mod.titulo': '{m} — স্কোর, বেঞ্চমার্ক ও দাম | RankingIA',
    'mod.desc': 'RankingIA-তে {m}-এর অবস্থান {pos}, স্কোর {n}। উৎস ও বিভাগ অনুযায়ী স্কোর, দাম (প্রতি 1M টোকেনে {p}) ও কনটেক্সট দেখুন।',
    'mod.descParcial': '{m}: LMArena Elo {e}, দাম প্রতি 1M টোকেনে {p}, কনটেক্সট {c}।',
    'mod.empresaNA': 'কোম্পানি জানানো হয়নি',
    'mod.fora': 'স্কোর নেই: বস্তুনিষ্ঠ বেঞ্চমার্ক নেই',
    'mod.posDe': 'সামগ্রিকভাবে {n}-এর মধ্যে {pos}',
    'mod.entradaSaida': 'ইনপুট / আউটপুট',
    'mod.por1mTokens': 'প্রতি 1M টোকেনে {s}',
    'mod.tokens': 'টোকেন',
    'mod.lancamento': 'রিলিজ',
    'mod.lancamentoFonte': 'রিলিজের তারিখ',
    'mod.pesos': 'ওয়েটস',
    'mod.abertos': 'ওপেন',
    'mod.fechados': 'ক্লোজড',
    'mod.velocidade': 'গতি',
    'mod.ttft': 'প্রথম টোকেন {s} সেকেন্ডে',
    'mod.notasFonte': 'উৎস অনুযায়ী স্কোর',
    'mod.percentilExpl': 'পার্সেন্টাইল = র‍্যাঙ্ক করা মডেলের যত শতাংশকে ছাড়িয়েছে',
    'mod.metrica': 'মেট্রিক',
    'mod.valor': 'মান',
    'mod.percentil': 'পার্সেন্টাইল',
    'mod.fonte': 'উৎস',
    'mod.peso': 'ওজন {p}',
    'mod.peso.titulo': '{p} ওজন নিয়ে স্কোরে যুক্ত হয়',
    'mod.porCategoria': 'বিভাগ অনুযায়ী',
    'mod.posicao': 'র‍্যাঙ্ক',
    'mod.metricas': 'মেট্রিক',
    'mod.evolucao': 'ইতিহাস',
    'mod.evolucao.texto': 'প্রতিটি সংগ্রহের দিনে RankingIA স্কোর (র‍্যাঙ্ক দেখতে কার্সর রাখুন)।',
    'mod.evolucao.aria': '{m}-এর স্কোরের ইতিহাস',
    'mod.evolucao.espera': 'দৈনিক সংগ্রহ শুরু হয়েছে {d} থেকে। মডেল র‍্যাঙ্কে থাকার দ্বিতীয় দিন থেকে চার্ট দেখা যাবে।',
    'mod.compararOutros': 'অন্য মডেলের সঙ্গে তুলনা করুন',
    'mod.nasFontes': 'উৎসগুলোতে',
    'mod.hf': 'Hugging Face (ওয়েটস)',
    'gr.titulo': 'চার্ট — এআই মডেলের মান বনাম দাম | RankingIA',
    'gr.desc': 'মান বনাম দাম, মানুষের পছন্দ বনাম দাম এবং এআই মডেলের (LLM) বিবর্তনের চার্ট।',
    'gr.h1': 'চার্ট',
    'gr.intro': 'মডেল দেখতে বিন্দুতে কার্সর রাখুন (বা ট্যাপ করুন)। পেজ খুলতে বিন্দুতে ক্লিক করুন। দাম হলো প্রতি মিলিয়ন টোকেনে ইনপুট/আউটপুটের 3:1 মিশ্রণ, লগ স্কেলে।',
    'gr.verDados': 'ডেটা টেবিল হিসেবে দেখুন',
    'gr.notaPreco': 'RankingIA স্কোর বনাম দাম',
    'gr.notaPreco.texto': 'যত উপরে ও যত বাঁয়ে, তত ভালো মূল্যমান।',
    'gr.arenaPreco': 'মানুষের পছন্দ (Arena) বনাম দাম',
    'gr.arenaPreco.texto': 'LMArena টেক্সট Elo; সামগ্রিক র‍্যাঙ্কিংয়ের বাইরের মডেলও আছে।',
    'gr.velocidade': 'RankingIA স্কোর বনাম গতি',
    'gr.velocidade.texto': 'Artificial Analysis-এর মাপা প্রতি সেকেন্ডে টোকেন।',
    'gr.fronteira': 'এআই কীভাবে এগিয়েছে',
    'gr.fronteira.texto': 'প্রতিটি বিন্দু র‍্যাঙ্ক করা একটি মডেল, তার রিলিজের তারিখে। রেখাগুলো ক্লোজড ও ওপেন ওয়েটসের জন্য প্রতিটি তারিখ পর্যন্ত রিলিজ হওয়া সেরা স্কোর দেখায়।',
    'gr.livebench': 'সময়ের সঙ্গে LiveBench',
    'gr.livebench.texto': 'র‍্যাঙ্কে শীর্ষ 8 মডেলের প্রতিটি রিলিজে LiveBench 2.0-এর সামগ্রিক স্কোর।',
    'gr.historico': 'সময়ের সঙ্গে RankingIA স্কোর',
    'gr.historico.texto': 'সাইট সংগ্রহ শুরু করার পর থেকে শীর্ষ 8 মডেলের দৈনিক স্কোর।',
    'cmp.titulo': 'এআই মডেল পাশাপাশি তুলনা করুন | RankingIA',
    'cmp.desc': 'সর্বোচ্চ 4টি এআই মডেল বেছে স্কোর, বেঞ্চমার্ক, LMArena Elo, দাম ও কনটেক্সট পাশাপাশি তুলনা করুন।',
    'cmp.h1': 'মডেল তুলনা',
    'cmp.intro': '2 থেকে 4টি মডেল বেছে নিন। পেজের ঠিকানায় আপনার বাছাই থাকে, তাই লিংক শেয়ার করা যায়।',
    'cmp.escolha': 'মডেল বাছাই',
    'cmp.modeloN': 'মডেল {i}',
    'cmp.opcional': '(ঐচ্ছিক)',
    'cmp.tabela': 'তুলনার টেবিল',
    'cmp.escolhaAcima': 'উপরে মডেল বেছে নিন।',
    'cmp.perfil': 'বিভাগ অনুযায়ী প্রোফাইল',
    'cmp.perfil.texto': 'প্রতিটি মেট্রিকে পার্সেন্টাইল (100 = র‍্যাঙ্কিংয়ে সেরা)।',
    'cmp.radar.aria': 'প্রতি মেট্রিকে প্রতিটি মডেলের পার্সেন্টাইলের রাডার',
    'e404.titulo': 'পেজ পাওয়া যায়নি | RankingIA',
    'e404.desc': 'RankingIA-তে পেজ পাওয়া যায়নি। স্কোর, দাম ও তুলনা দেখতে এআই মডেলের র‍্যাঙ্কিংয়ে ফিরে যান।',
    'e404.h1': 'পেজ পাওয়া যায়নি',
    'e404.texto': 'হয়তো কোনো উৎসে মডেলটির নাম বদলে গেছে।',
    'e404.voltar': 'র‍্যাঙ্কিংয়ে ফিরুন',
    'js.n': '{n}টি মডেল',
    'js.n1': '1টি মডেল',
    'js.parcial': '{b}-এর মধ্যে {a}',
    'js.total': '(মোট {t})',
    'js.maisUm': '(আরও একটি বেছে নিন)',
    'js.notaRankingIA': 'RankingIA স্কোর',
    'js.entrada': 'ইনপুট ({s}/1M)',
    'js.saida': 'আউটপুট ({s}/1M)',
    'js.velocidade': 'গতি (tok/s)',
    'js.fora': 'র‍্যাঙ্কহীন',
    'js.rankingGeral': 'সামগ্রিক র‍্যাঙ্কিং',
    'js.outros': 'অন্যান্য মডেল',
    'js.abertos': 'ওপেন',
    'js.fechados': 'ক্লোজড',
    'js.erroDados': 'ডেটা লোড করা যায়নি ({e})।',
    'js.pesosFechados': 'ক্লোজড ওয়েটস',
    'js.pesosAbertos': 'ওপেন ওয়েটস',
    'js.modelos': 'মডেল',
    'js.precoMedio': 'মিশ্র দাম ({s} / 1M টোকেন, লগ স্কেল)',
    'js.eloTexto': 'LMArena Elo (টেক্সট)',
    'js.tokSeg': 'প্রতি সেকেন্ডে টোকেন',
    'js.lbGeral': 'LiveBench সামগ্রিক (%)',
    'js.nota': 'স্কোর {n}',
    'js.lancadoEm': 'রিলিজ {d}',
    'js.recorde': '{d} তারিখে নতুন রেকর্ড',
    'js.melhorHoje': 'এখন পর্যন্ত সেরা',
    'js.melhorFechado': 'সেরা ক্লোজড',
    'js.melhorAberto': 'সেরা ওপেন',
    'js.modelosFechados': 'ক্লোজড মডেল',
    'js.modelosAbertos': 'ওপেন মডেল',
    'js.modelo': 'মডেল',
    'js.precoMedioCurto': 'মিশ্র দাম / 1M',
    'js.data': 'তারিখ',
    'js.recordista': 'রেকর্ডধারী',
    'js.tipo': 'ধরন',
    'js.fechado': 'ক্লোজড',
    'js.aberto': 'ওপেন',
    'js.umRelease': 'LiveBench 2.0-এর এখনও মাত্র একটি রিলিজ আছে।',
    'js.histEspera': 'দৈনিক সংগ্রহ শুরু হয়েছে {d} থেকে। দ্বিতীয় দিন থেকে চার্ট দেখা যাবে।',
    'js.erroGraficos': 'চার্টের ডেটা লোড করা যায়নি ({e})।',
    'met.lb_geral': 'LiveBench',
    'met.lb_geral.desc': 'LiveBench 2.0-এর সামগ্রিক স্কোর (দীর্ঘ, দূষণমুক্ত কাজ), LiveBench-এর নিজস্ব ওজনে।',
    'met.aa_inteligencia': 'AA Intelligence Index',
    'met.aa_inteligencia.curto': 'AA Intel.',
    'met.aa_inteligencia.desc': 'Artificial Analysis Intelligence Index।',
    'met.arena_texto': 'Arena টেক্সট (Elo)',
    'met.arena_texto.curto': 'Arena',
    'met.arena_texto.desc': 'টেক্সট কথোপকথনে মানুষের পছন্দ (LMArena)।',
    'met.arena_webdev': 'Arena WebDev (Elo)',
    'met.arena_webdev.curto': 'WebDev',
    'met.arena_webdev.desc': 'ওয়েব পেজ ও অ্যাপ বানানোয় মানুষের পছন্দ (LMArena)।',
    'met.arena_visao': 'Arena ভিশন (Elo)',
    'met.arena_visao.curto': 'ভিশন',
    'met.arena_visao.desc': 'ছবির কাজে মানুষের পছন্দ (LMArena)।',
    'met.lb': 'LiveBench {c}',
    'met.lb.curto': 'LB {c}',
    'met.lb.desc': 'LiveBench 2.0-এর "{c}" বিভাগ।',
    'lb.lb_agentico': 'দীর্ঘ এজেন্টিক',
    'lb.lb_raciocinio': 'যুক্তি',
    'lb.lb_codigo': 'কোডিং',
    'lb.lb_navegador': 'ব্রাউজার',
    'lb.lb_dados': 'ডেটা বিশ্লেষণ',
    'lb.lb_pesquisa': 'গবেষণা',
    'lb.lb_design': 'ডিজাইন',
    'lb.lb_matematica': 'গণিত',
    'lb.lb_linguagem': 'ভাষা',
    'cat.agentico': 'এজেন্টিক',
    'cat.codigo': 'কোডিং',
    'cat.raciocinio': 'যুক্তি',
    'cat.dados': 'ডেটা বিশ্লেষণ',
    'cat.pesquisa': 'গবেষণা',
    'cat.design': 'ডিজাইন',
    'cat.navegador': 'ব্রাউজার ব্যবহার',
    'cat.conversa': 'চ্যাট',
    'cat.visao': 'ভিশন',
    'met.aa_financas': 'AA Finance & Accounting Index',
    'met.aa_financas.curto': 'AA অর্থ',
    'met.aa_financas.desc': 'Artificial Analysis Finance & Accounting Index: অর্থ সংক্রান্ত জ্ঞানভিত্তিক কাজের মূল্যায়ন।',
    'met.aa_estrategia': 'AA Strategy & Ops Index',
    'met.aa_estrategia.curto': 'AA কৌশল',
    'met.aa_estrategia.desc': 'Artificial Analysis Strategy & Ops Index: ব্যবসায়িক কৌশল ও পরিচালনার মূল্যায়ন।',
    'met.aa_juridico': 'AA Legal Index',
    'met.aa_juridico.curto': 'AA আইন',
    'met.aa_juridico.desc': 'Artificial Analysis Legal Index: আইনি কাজের মূল্যায়ন।',
    'met.aa_saude': 'AA Healthcare & Medical Index',
    'met.aa_saude.curto': 'AA স্বাস্থ্য',
    'met.aa_saude.desc': 'Artificial Analysis Healthcare & Medical Index: স্বাস্থ্যসেবা ও চিকিৎসার মূল্যায়ন।',
    'met.aa_engenharia': 'AA Engineering Index',
    'met.aa_engenharia.curto': 'AA প্রকৌশল',
    'met.aa_engenharia.desc': 'Artificial Analysis Engineering Index: প্রকৌশল, বিজ্ঞান ও এজেন্টিক কোডিংয়ের মূল্যায়ন।',
    'met.aa_economia': 'AA Economics Index',
    'met.aa_economia.curto': 'AA অর্থনীতি',
    'met.aa_economia.desc': 'Artificial Analysis Economics Index: অর্থনীতির মূল্যায়ন।',
    'cat.financas': 'অর্থ',
    'cat.estrategia': 'কৌশল ও পরিচালনা',
    'cat.juridico': 'আইন',
    'cat.saude': 'স্বাস্থ্যসেবা',
    'cat.engenharia': 'প্রকৌশল',
    'cat.economia': 'অর্থনীতি',
    'mod.custoTarefa': 'প্রতি কাজের খরচ',
    'mod.custoTarefa.nota': 'AA ইনডেক্সে গড়; পুরো ইনডেক্স চালাতে খরচ হয়েছে {s}',
    'mod.tempo': 'সাড়ার সময়',
    'mod.tempo.nota': 'মাধ্য (median), অনুরোধ থেকে শেষ টোকেন পর্যন্ত (AA)',
    'mod.pareto': 'Pareto সীমান্ত',
    'mod.pareto.sim': 'হ্যাঁ',
    'mod.pareto.nao': 'না',
    'mod.pareto.nota': 'হ্যাঁ = এমন কোনো মডেল নেই যা একই সঙ্গে সস্তা ও বেশি স্কোরের (স্কোর × মিশ্র দাম)',
    'js.pareto': 'Pareto সীমান্ত',
  },

  metodologia: (c) => `<h1>পদ্ধতি</h1>
<p>RankingIA নিজে কোনো পরীক্ষা চালায় না। এটি আলাদা আলাদা জিনিস মাপা পাবলিক লিডারবোর্ড একসঙ্গে এনে দাম ও প্রেক্ষাপটের পাশে এক জায়গায় দেখায়। ডেটা দিনে একবার সংগ্রহ করা হয়।</p>
<h2>উৎস</h2>
<ul>
<li>${LB}: বস্তুনিষ্ঠ বেঞ্চমার্ক; দূষণ এড়াতে প্রতিটি রিলিজে নতুন প্রশ্ন থাকে। আমরা LiveBench 2.0-এর সামগ্রিক স্কোর ও প্রতিটি বিভাগ ব্যবহার করি।</li>
<li>${LA}: মানুষ নাম না জেনে দুটি উত্তর তুলনা করে ভোট দেয়; এটি থেকে Elo রেটিং তৈরি হয়। আমরা টেক্সট, WebDev ও ভিশন অ্যারেনা ব্যবহার করি। কোনো মডেলের একাধিক মোড থাকলে ("High", "Max") সেরা Elo রাখা হয়।</li>
<li>${OR}: প্রতি মিলিয়ন টোকেনের দাম, কনটেক্সট উইন্ডো, রিলিজের তারিখ এবং ওয়েটস ওপেন কি না।</li>
<li>${AA}: Intelligence Index, সঙ্গে দাম ও গতি (API V2-এর বিনামূল্যের এন্ডপয়েন্ট)। ${c.aa ? 'ব্যবহার হচ্ছে।' : 'এখনও ব্যবহার হচ্ছে না।'}</li>
<li>${FR}: ইউরোপীয় কেন্দ্রীয় ব্যাংকের রেফারেন্স বিনিময় হার, যাতে অন্য মুদ্রায় দাম দেখানো যায়।</li>
</ul>
<h2>RankingIA স্কোর</h2>
<ol>
<li>সামগ্রিক র‍্যাঙ্কিংয়ে সেইসব মডেল থাকে যাদের অন্তত একটি বস্তুনিষ্ঠ বেঞ্চমার্ক আছে (${c.exige})। বাকিরা স্কোর ছাড়াই "অন্যান্য মডেল"-এ দেখা যায়।</li>
<li>প্রতিটি মেট্রিকে আমরা <strong>পার্সেন্টাইল</strong> হিসাব করি: র‍্যাঙ্ক করা মডেলগুলোর যত শতাংশকে এই মডেল ছাড়িয়ে গেছে (সমান হলে অর্ধেক ধরা হয়)। এতে Elo রেটিং ও সঠিক উত্তরের হার একই 0–100 স্কেলে আসে।</li>
<li>স্কোর হলো মডেলের কাছে থাকা পার্সেন্টাইলগুলোর ওজনযুক্ত গড়। যে মেট্রিক নেই, তা পক্ষেও গোনা হয় না, বিপক্ষেও না।</li>
<li>কম প্রমাণ থাকা মডেল যাতে একটিমাত্র মেট্রিকে শীর্ষে লাফিয়ে না ওঠে, তাই গড়ে পার্সেন্টাইল 50 ধরে ${c.neutro} বাড়তি ওজন যোগ হয়।</li>
</ol>
${c.pesos}
<h2>বিভাগ</h2>
<p>প্রতিটি বিভাগের নিজস্ব স্কোর আছে: সেই বিভাগের মেট্রিকগুলোর পার্সেন্টাইলের গড়, একই সংকোচন সহ। বিভাগ ও তাদের মেট্রিক:</p>
${c.cats}
<h2>প্রতিটি মডেলের বিবর্তন</h2>
<p>একই পরিবারের মডেল (যেমন Claude Opus 3, 4, 4.5 ও 5.5) সংস্করণ নম্বর বাদ দিয়ে নাম ধরে একসঙ্গে রাখা হয়। প্রতিটি মডেলের পেজে পুরো পরিবার রিলিজের ক্রমে দেখানো হয়।</p>
<h2>মডেলের নাম</h2>
<p>প্রতিটি উৎস নাম আলাদাভাবে লেখে ("Claude Opus 5.5 (High)", "anthropic/claude-opus-5.5")। আমরা কোম্পানি, তারিখ ও প্রচেষ্টার মোড বাদ দেওয়া একটি কী দিয়ে মেলাই; নিয়মে ধরা না পড়া ক্ষেত্রগুলো হাতে যাচাই করা ডাকনামের তালিকায় যায়। কোনো মডেল দুবার এলে বা গুলিয়ে গেলে ${ISSUE('একটি ইস্যু খুলুন')}।</p>
<h2>তথ্যমূলক সূচক</h2>
<p>কিছু সূচক পেজে দেখা যায়, কিন্তু RankingIA স্কোরে ধরা হয় না:</p>
<ul>
<li>Artificial Analysis-এর ক্ষেত্রভিত্তিক ইনডেক্স (অর্থ, কৌশল ও পরিচালনা, আইন, স্বাস্থ্যসেবা, প্রকৌশল ও অর্থনীতি): এগুলো ইন্টেলিজেন্স ইনডেক্সের মূল্যায়নই আবার ব্যবহার করে, তাই যোগ করলে একই কাজ দুবার গোনা হতো। এগুলো আলাদা বিভাগ হয়।</li>
<li>প্রতি কাজের খরচ ও পুরো ইনডেক্স চালানোর খরচ (Artificial Analysis): ইনডেক্সের একটি কাজে গড়ে কত খরচ হয়, যুক্তি ও উত্তরের টোকেন ধরে। যে মডেল বেশি "ভাবে", তার খরচ প্রতি টোকেনের দামের আভাসের চেয়ে বেশি পড়ে।</li>
<li>সাড়ার সময়: অনুরোধ থেকে শেষ টোকেন পর্যন্ত মাধ্য (median), Artificial Analysis-এর মাপা।</li>
<li>Pareto সীমান্ত: যে মডেলের চেয়ে একই সঙ্গে সস্তা ও বেশি স্কোরের অন্য কোনো মডেল নেই, মিশ্র দামে (3 ভাগ ইনপুট ও 1 ভাগ আউটপুট)। এটি স্কোর × দামের চার্টে ড্যাশ দেওয়া রেখা হিসেবে দেখা যায়।</li>
</ul>
<h2>সীমাবদ্ধতা</h2>
<ul>
<li>পার্সেন্টাইল দলের উপর নির্ভর করে: শক্তিশালী মডেল এলে অন্যরা খারাপ না হয়েও নিচে নামতে পারে।</li>
<li>Elo পছন্দ মাপে, সঠিকতা নয়। উত্তরের ধরন ও দৈর্ঘ্যের প্রভাব থাকে।</li>
<li>দাম OpenRouter থেকে নেওয়া (প্রোভাইডারদের মধ্যে সর্বনিম্ন); প্রস্তুতকারকের নিজের দাম আলাদা হতে পারে।</li>
</ul>
<h2>অন্যান্য সূত্র</h2>
<p>এই সাইটগুলোও এআই মডেল অনুসরণ করে, কিন্তু স্কোরে ধরা হয় না:</p>
<ul>
<li>${L('https://benchlm.ai/', 'BenchLM')}: শত শত বেঞ্চমার্ক একত্র করে। জনসাধারণের সাইটে এর ডেটা দেখাতে এর শর্তে আলাদা চুক্তি লাগে।</li>
<li>${L('https://hai.stanford.edu/ai-index', 'Stanford HAI — AI Index')}: এআই-এর অবস্থা নিয়ে বার্ষিক প্রতিবেদন; প্রতিদিন হালনাগাদ হওয়া মডেলভিত্তিক স্কোরবোর্ড নয়।</li>
<li>${L('https://ia.com.br/melhores-ias', 'ia.com.br — Melhores IAs')}: পর্তুগিজ ভাষার র‍্যাঙ্কিং, যা Artificial Analysis, OpenRouter ও Design Arena-র ডেটা আবার প্রকাশ করে; এর কোনো API নেই, স্কোর কীভাবে হিসাব হয় তা ব্যাখ্যা করে না, ডেটা পুনর্ব্যবহারের লাইসেন্সও দেয় না, আর RankingIA যেসব উৎস সরাসরি পড়ে সেগুলোই পুনরাবৃত্তি করে।</li>
<li>${L('https://www.designarena.ai/', 'Design Arena')}: ওয়েবসাইট, অ্যাপ, ছবি ও ভিডিওতে মানুষের ভোট থেকে Elo। এর robots.txt API-তে স্বয়ংক্রিয় প্রবেশ নিষিদ্ধ করে, আর ডেটা পুনর্ব্যবহারের কোনো লাইসেন্সও নেই।</li>
<li>${L('https://swen.ia.br/ranking', 'SWEN.AI')}: শুধু Artificial Analysis-এর ডেটায় তৈরি পর্তুগিজ ভাষার র‍্যাঙ্কিং, যা RankingIA ইতিমধ্যে সরাসরি ব্যবহার করে।</li>
</ul>
<h2>উৎসের অবস্থা</h2>
${c.status}
<p>প্রতিটি উৎসের ডেটা তার মালিকদের এবং তাদের শর্ত মেনে চলে। RankingIA-র কোড MIT লাইসেন্সে ওপেন সোর্স, ${GH}-এ।</p>`,

  titulo: [
    'পদ্ধতি — RankingIA স্কোর কীভাবে হিসাব করা হয়',
    'RankingIA-র ডেটা কোথা থেকে আসে, LiveBench, LMArena, OpenRouter ও Artificial Analysis কীভাবে মিলিয়ে 0–100 স্কোর হয়, এবং এর সীমাবদ্ধতা।',
  ],
  status: ['উৎস', 'সর্বশেষ সংগ্রহ', 'ডেটার তারিখ', 'মেট্রিক', 'ওজন', 'বিভাগ', 'মেট্রিক', 'ব্যর্থ'],
};
