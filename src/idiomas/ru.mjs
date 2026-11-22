// Russian. Gerado a partir de pt/en; validar com: node scripts/validar-idioma.mjs ru
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
    'nav.ranking': 'Рейтинг',
    'nav.graficos': 'Графики',
    'nav.comparar': 'Сравнение',
    'nav.metodologia': 'Методология',
    'nav.principal': 'Главная',
    'versao.titulo': 'Версия сайта',
    'tema.titulo': 'Переключить светлую/тёмную тему',
    'moeda.titulo': 'Валюта цен',
    'idioma.titulo': 'Язык',
    'rodape.dados': 'Данные',
    'rodape.release': 'релиз от {d}',
    'rodape.placar': 'рейтинг от {d}',
    'rodape.atualizado': 'Обновлено: {d}.',
    'rodape.aa': 'Индексы, цены и скорость: {l}.',
    'rodape.cambio': 'Курсы ЕЦБ ({l}) на {d}: {lista}. Исходные цены указаны в долларах США.',
    'rodape.falha': 'Нет ответа от {f} при последнем сборе данных; показаны данные от {d}',
    'rodape.feito': 'автор:',
    'rodape.codigo': 'открытый код (MIT)',
    'rodape.conduta': 'кодекс поведения',
    'rodape.como': 'как считается балл',
    'rodape.autonomo': 'Сбор данных и результаты на этом сайте каждый день формируются программой автоматически, без ручной правки баллов.',
    'fam.titulo': 'История семейства',
    'fam.texto': 'Версий в этом семействе: {n}, от первой до новейшей, по дате выхода. Нажмите на точку, чтобы открыть версию.',
    'js.familiaNota': 'Балл RankingIA',
    'js.familiaElo': 'Elo Arena (текст)',
    'js.familiaAA': 'AA Intelligence Index',
    'pos': '#{n}',
    'ctx.mil': '{n}K',
    'ctx.mi': '{n}M',
    'gratis': 'бесплатно',
    'ate': 'до {p} / 1M',
    'idx.titulo': 'Рейтинг ИИ-моделей (LLM) · RankingIA',
    'idx.desc': 'Рейтинг {n} ИИ-моделей по данным LiveBench, LMArena и Artificial Analysis с ценами OpenRouter. Сравните GPT, Claude, Gemini, DeepSeek и Qwen.',
    'idx.h1': 'Рейтинг ИИ-моделей',
    'idx.intro': 'Балл от 0 до 100 объединяет открытые бенчмарки ({fontes}) и показывает, сколько стоит каждая модель. Балл — это средневзвешенная доля моделей рейтинга, которых данная модель превосходит. {l}.',
    'idx.como': 'Как мы считаем',
    'podio.primeiro': 'Лидер рейтинга',
    'podio.custo': 'Лучшее соотношение цены и качества',
    'podio.aberto': 'Лучшая модель с открытыми весами',
    'podio.arena': 'Выбор людей (Arena)',
    'nota.n': 'Балл: {n}',
    'por1m': 'за 1M',
    'lugar': 'Место: {p}',
    'filtro.busca': 'Поиск модели или компании',
    'filtro.empresas': 'Все компании',
    'filtro.empresa': 'Компания',
    'filtro.tipo': 'Тип',
    'tipo.todos': 'Открытые и закрытые',
    'tipo.abertos': 'Только открытые веса',
    'tipo.fechados': 'Только закрытые',
    'filtro.preco': 'Цена на входе',
    'preco.qualquer': 'Любая цена',
    'mostrar': 'Показать',
    'mostrar.titulo': 'Сколько моделей показывать в каждой таблице',
    'todos': 'Все',
    'categoria': 'Категория',
    'cat.todas': 'Все',
    'th.posicao': 'Место',
    'th.modelo': 'Модель',
    'th.nota': 'Балл',
    'th.nota.titulo': 'Общий балл RankingIA (0–100)',
    'th.notaCat': 'Балл: {c}',
    'th.notaCat.titulo': 'Балл: {c} (0–100), средний перцентиль по метрикам: {m}',
    'th.entrada': 'Вход',
    'th.entrada.titulo': 'Цена за 1 млн входных токенов',
    'th.saida': 'Выход',
    'th.saida.titulo': 'Цена за 1 млн выходных токенов',
    'th.contexto': 'Контекст',
    'th.contexto.titulo': 'Контекстное окно в токенах',
    'th.lancado': 'Выпуск',
    'th.lancado.titulo': 'Дата выпуска',
    'th.comparar': 'Сравнить',
    'caption.ranking': 'Общий рейтинг: моделей с объективным бенчмарком — {n}',
    'selo.aberto': 'открытая',
    'selo.aberto.titulo': 'Открытые веса',
    'outros.h2': 'Другие модели (только оценки людей)',
    'outros.texto': 'Моделей без объективного бенчмарка ({fontes}): {n}. Балла у них нет, они отсортированы по Elo в LMArena; здесь действуют те же фильтры и то же число строк.',
    'ou': 'или',
    'comparar.aria': 'Сравнить: {m}',
    'limpar': 'сбросить',
    'mod.titulo': '{m} — балл, бенчмарки и цена | RankingIA',
    'mod.desc': '{m}: место {pos} в RankingIA, балл {n}. Баллы по источникам и категориям, цена ({p} за 1M токенов) и контекст.',
    'mod.descParcial': '{m}: Elo в LMArena {e}, цена {p} за 1M токенов, контекст {c}.',
    'mod.empresaNA': 'Компания не указана',
    'mod.fora': 'Нет балла: нет объективного бенчмарка',
    'mod.posDe': '{pos} из {n} в общем рейтинге',
    'mod.entradaSaida': 'Вход / выход',
    'mod.por1mTokens': '{s} за 1M токенов',
    'mod.tokens': 'токенов',
    'mod.lancamento': 'Выпуск',
    'mod.lancamentoFonte': 'дата выпуска',
    'mod.pesos': 'Веса',
    'mod.abertos': 'Открытые',
    'mod.fechados': 'Закрытые',
    'mod.velocidade': 'Скорость',
    'mod.ttft': 'первый токен за {s} с',
    'mod.notasFonte': 'Баллы по источникам',
    'mod.percentilExpl': 'перцентиль = % моделей рейтинга, которых модель превосходит',
    'mod.metrica': 'Метрика',
    'mod.valor': 'Значение',
    'mod.percentil': 'Перцентиль',
    'mod.fonte': 'Источник',
    'mod.peso': 'вес {p}',
    'mod.peso.titulo': 'Учитывается в балле с весом {p}',
    'mod.porCategoria': 'По категориям',
    'mod.posicao': 'Место',
    'mod.metricas': 'Метрики',
    'mod.evolucao': 'История',
    'mod.evolucao.texto': 'Балл RankingIA в каждый день сбора данных (наведите курсор, чтобы увидеть место).',
    'mod.evolucao.aria': 'История баллов: {m}',
    'mod.evolucao.espera': 'Ежедневный сбор данных начат {d}. График появится со второго дня, когда модель попадёт в рейтинг.',
    'mod.compararOutros': 'Сравнить с другими моделями',
    'mod.nasFontes': 'В источниках',
    'mod.hf': 'Hugging Face (веса)',
    'gr.titulo': 'Графики — качество и цена ИИ-моделей | RankingIA',
    'gr.desc': 'Графики: качество и цена, оценки людей и цена, развитие ИИ-моделей (LLM).',
    'gr.h1': 'Графики',
    'gr.intro': 'Наведите курсор на точку (или коснитесь её), чтобы увидеть модель. Нажмите на точку, чтобы открыть её страницу. Цена — смесь входа и выхода 3:1 за миллион токенов, логарифмическая шкала.',
    'gr.verDados': 'Данные в виде таблицы',
    'gr.notaPreco': 'Балл RankingIA и цена',
    'gr.notaPreco.texto': 'Чем выше и левее, тем выгоднее.',
    'gr.arenaPreco': 'Оценки людей (Arena) и цена',
    'gr.arenaPreco.texto': 'Elo в текстовой арене LMArena; включены модели вне общего рейтинга.',
    'gr.velocidade': 'Балл RankingIA и скорость',
    'gr.velocidade.texto': 'Токенов в секунду по измерениям Artificial Analysis.',
    'gr.fronteira': 'Как развивался ИИ',
    'gr.fronteira.texto': 'Каждая точка — модель из рейтинга на дату выпуска. Линии показывают лучший балл, достигнутый к каждой дате, для закрытых и открытых весов.',
    'gr.livebench': 'LiveBench во времени',
    'gr.livebench.texto': 'Общий балл LiveBench 2.0 при каждом выпуске, для 8 лучших моделей рейтинга.',
    'gr.historico': 'Балл RankingIA во времени',
    'gr.historico.texto': 'Ежедневный балл 8 лучших моделей рейтинга с начала сбора данных.',
    'cmp.titulo': 'Сравнение ИИ-моделей рядом | RankingIA',
    'cmp.desc': 'Выберите до 4 ИИ-моделей и сравните балл, бенчмарки, Elo в LMArena, цену и контекст рядом.',
    'cmp.h1': 'Сравнение моделей',
    'cmp.intro': 'Выберите от 2 до 4 моделей. Выбор сохраняется в адресе страницы, поэтому им можно поделиться по ссылке.',
    'cmp.escolha': 'Выбор моделей',
    'cmp.modeloN': 'Модель {i}',
    'cmp.opcional': '(по желанию)',
    'cmp.tabela': 'Таблица сравнения',
    'cmp.escolhaAcima': 'Выберите модели выше.',
    'cmp.perfil': 'Профиль по категориям',
    'cmp.perfil.texto': 'Перцентиль по каждой метрике (100 = лучший в рейтинге).',
    'cmp.radar.aria': 'Радар с перцентилем каждой модели по метрикам',
    'e404.titulo': 'Страница не найдена | RankingIA',
    'e404.desc': 'Страница не найдена на RankingIA. Вернитесь к рейтингу ИИ-моделей: баллы, цены и сравнения.',
    'e404.h1': 'Страница не найдена',
    'e404.texto': 'Возможно, модель переименовали в одном из источников.',
    'e404.voltar': 'Назад к рейтингу',
    'js.n': 'Моделей: {n}',
    'js.n1': '1 модель',
    'js.parcial': '{a} из {b}',
    'js.total': '(из {t})',
    'js.maisUm': '(выберите ещё одну)',
    'js.notaRankingIA': 'Балл RankingIA',
    'js.entrada': 'Вход ({s}/1M)',
    'js.saida': 'Выход ({s}/1M)',
    'js.velocidade': 'Скорость (tok/s)',
    'js.fora': 'вне рейтинга',
    'js.rankingGeral': 'Общий рейтинг',
    'js.outros': 'Другие модели',
    'js.abertos': 'открытые',
    'js.fechados': 'закрытые',
    'js.erroDados': 'Не удалось загрузить данные ({e}).',
    'js.pesosFechados': 'Закрытые веса',
    'js.pesosAbertos': 'Открытые веса',
    'js.modelos': 'Модели',
    'js.precoMedio': 'Средняя цена ({s} / 1M токенов, лог. шкала)',
    'js.eloTexto': 'Elo в LMArena (текст)',
    'js.tokSeg': 'Токенов в секунду',
    'js.lbGeral': 'LiveBench, общий балл (%)',
    'js.nota': 'балл {n}',
    'js.lancadoEm': 'выпущена {d}',
    'js.recorde': 'новый рекорд {d}',
    'js.melhorHoje': 'лучшая на сегодня',
    'js.melhorFechado': 'Лучшая закрытая',
    'js.melhorAberto': 'Лучшая открытая',
    'js.modelosFechados': 'Закрытые модели',
    'js.modelosAbertos': 'Открытые модели',
    'js.modelo': 'Модель',
    'js.precoMedioCurto': 'Средняя цена / 1M',
    'js.data': 'Дата',
    'js.recordista': 'Рекордсмен',
    'js.tipo': 'Тип',
    'js.fechado': 'закрытая',
    'js.aberto': 'открытая',
    'js.umRelease': 'Пока у LiveBench 2.0 только один релиз.',
    'js.histEspera': 'Ежедневный сбор данных начат {d}. График появится со второго дня.',
    'js.erroGraficos': 'Не удалось загрузить данные графиков ({e}).',
    'met.lb_geral': 'LiveBench',
    'met.lb_geral.desc': 'Общий балл LiveBench 2.0 (длинные задачи без загрязнения данных) с собственными весами LiveBench.',
    'met.aa_inteligencia': 'AA Intelligence Index',
    'met.aa_inteligencia.curto': 'AA Intel.',
    'met.aa_inteligencia.desc': 'Intelligence Index от Artificial Analysis.',
    'met.arena_texto': 'Arena, текст (Elo)',
    'met.arena_texto.curto': 'Arena',
    'met.arena_texto.desc': 'Оценки людей в текстовых диалогах (LMArena).',
    'met.arena_webdev': 'Arena WebDev (Elo)',
    'met.arena_webdev.curto': 'WebDev',
    'met.arena_webdev.desc': 'Оценки людей в создании веб-страниц и приложений (LMArena).',
    'met.arena_visao': 'Arena, зрение (Elo)',
    'met.arena_visao.curto': 'Зрение',
    'met.arena_visao.desc': 'Оценки людей в задачах с изображениями (LMArena).',
    'met.lb': 'LiveBench: {c}',
    'met.lb.curto': 'LB: {c}',
    'met.lb.desc': 'Категория «{c}» в LiveBench 2.0.',
    'lb.lb_agentico': 'длинные агентные задачи',
    'lb.lb_raciocinio': 'рассуждение',
    'lb.lb_codigo': 'программирование',
    'lb.lb_navegador': 'браузер',
    'lb.lb_dados': 'анализ данных',
    'lb.lb_pesquisa': 'исследование',
    'lb.lb_design': 'дизайн',
    'lb.lb_matematica': 'математика',
    'lb.lb_linguagem': 'язык',
    'cat.agentico': 'Агентные задачи',
    'cat.codigo': 'Программирование',
    'cat.raciocinio': 'Рассуждение',
    'cat.dados': 'Анализ данных',
    'cat.pesquisa': 'Исследование',
    'cat.design': 'Дизайн',
    'cat.navegador': 'Работа в браузере',
    'cat.conversa': 'Чат',
    'cat.visao': 'Зрение',
    'met.aa_financas': 'AA Finance & Accounting Index',
    'met.aa_financas.curto': 'AA Финансы',
    'met.aa_financas.desc': 'Finance & Accounting Index от Artificial Analysis: оценки интеллектуальной работы, связанной с финансами.',
    'met.aa_estrategia': 'AA Strategy & Ops Index',
    'met.aa_estrategia.curto': 'AA Стратегия',
    'met.aa_estrategia.desc': 'Strategy & Ops Index от Artificial Analysis: оценки бизнес-стратегии и операций.',
    'met.aa_juridico': 'AA Legal Index',
    'met.aa_juridico.curto': 'AA Право',
    'met.aa_juridico.desc': 'Legal Index от Artificial Analysis: оценки юридической работы.',
    'met.aa_saude': 'AA Healthcare & Medical Index',
    'met.aa_saude.curto': 'AA Медицина',
    'met.aa_saude.desc': 'Healthcare & Medical Index от Artificial Analysis: оценки в сфере здравоохранения и медицины.',
    'met.aa_engenharia': 'AA Engineering Index',
    'met.aa_engenharia.curto': 'AA Инженерия',
    'met.aa_engenharia.desc': 'Engineering Index от Artificial Analysis: оценки в инженерии, науке и агентном программировании.',
    'met.aa_economia': 'AA Economics Index',
    'met.aa_economia.curto': 'AA Экономика',
    'met.aa_economia.desc': 'Economics Index от Artificial Analysis: оценки в экономике.',
    'cat.financas': 'Финансы',
    'cat.estrategia': 'Стратегия и операции',
    'cat.juridico': 'Право',
    'cat.saude': 'Здравоохранение',
    'cat.engenharia': 'Инженерия',
    'cat.economia': 'Экономика',
    'mod.custoTarefa': 'Стоимость задачи',
    'mod.custoTarefa.nota': 'в среднем по индексу AA; прогон всего индекса стоил {s}',
    'mod.tempo': 'Время ответа',
    'mod.tempo.nota': 'медиана от запроса до последнего токена (AA)',
    'mod.pareto': 'Граница Парето',
    'mod.pareto.sim': 'Да',
    'mod.pareto.nao': 'Нет',
    'mod.pareto.nota': 'да = нет модели, которая и дешевле, и с более высоким баллом (балл × средняя цена)',
    'js.pareto': 'Граница Парето',
  },

  metodologia: (c) => `<h1>Методология</h1>
<p>RankingIA не проводит собственных тестов. Он собирает публичные рейтинги, которые измеряют разные вещи, и показывает их в одном месте рядом с ценой и контекстом. Данные собираются раз в сутки.</p>
<h2>Источники</h2>
<ul>
<li>${LB}: объективный бенчмарк, в каждом релизе появляются новые вопросы, чтобы избежать загрязнения данных. Мы берём общий балл LiveBench 2.0 и баллы по каждой категории.</li>
<li>${LA}: люди сравнивают два анонимных ответа и голосуют; из этого получается рейтинг Elo. Мы используем арены текста, WebDev и зрения. Если у модели несколько режимов («High», «Max»), берётся лучший Elo.</li>
<li>${OR}: цена за миллион токенов, контекстное окно, дата выпуска и открытость весов.</li>
<li>${AA}: Intelligence Index, а также цена и скорость (бесплатный эндпоинт API V2). ${c.aa ? 'Используется.' : 'Пока не используется.'}</li>
<li>${FR}: официальные курсы Европейского центрального банка, чтобы показывать цены в других валютах.</li>
</ul>
<h2>Балл RankingIA</h2>
<ol>
<li>В общий рейтинг попадают модели, у которых есть хотя бы один объективный бенчмарк (${c.exige}). Остальные показаны в разделе «другие модели» без балла.</li>
<li>Для каждой метрики мы считаем <strong>перцентиль</strong>: долю моделей рейтинга, которых данная модель превосходит (ничья считается за половину). Так Elo и процент верных ответов оказываются на одной шкале от 0 до 100.</li>
<li>Балл — это средневзвешенное значение имеющихся у модели перцентилей. Отсутствующая метрика не учитывается: ни в плюс, ни в минус.</li>
<li>Чтобы модель с малым числом оценок не взлетала на вершину по одной метрике, к среднему добавляется дополнительный вес ${c.neutro} с перцентилем 50.</li>
</ol>
${c.pesos}
<h2>Категории</h2>
<p>У каждой категории свой балл: средний перцентиль её метрик с той же поправкой. Категории и их метрики:</p>
${c.cats}
<h2>История каждой модели</h2>
<p>Модели одного семейства (например, Claude Opus 3, 4, 4.5 и 5.5) объединяются по названию без номера версии. На странице каждой модели показано всё семейство в порядке выхода.</p>
<h2>Названия моделей</h2>
<p>Каждый источник пишет названия по-своему («Claude Opus 5.5 (High)», «anthropic/claude-opus-5.5»). Мы сопоставляем их по ключу без компании, даты и режима усилий; случаи, которые правило не ловит, попадают в список псевдонимов, проверяемый вручную. Если модель оказалась продублирована или перепутана, ${ISSUE('откройте issue')}.</p>
<h2>Информационные показатели</h2>
<p>Некоторые показатели видны на страницах, но не входят в балл RankingIA:</p>
<ul>
<li>Индексы по областям от Artificial Analysis (финансы, стратегия и операции, право, здравоохранение, инженерия и экономика): они используют те же оценки, что и индекс интеллекта, поэтому их сложение учло бы одну и ту же работу дважды. Они оформлены как отдельные категории.</li>
<li>Стоимость задачи и стоимость прогона всего индекса (Artificial Analysis): сколько в среднем стоит задача индекса с учётом токенов рассуждения и ответа. Модели, которые «думают» дольше, обходятся дороже, чем подсказывает цена за токен.</li>
<li>Время ответа: медиана от запроса до последнего токена, измеряется Artificial Analysis.</li>
<li>Граница Парето: модели, для которых нет другой, одновременно более дешёвой и с более высоким баллом, по средней цене (3 части входа на 1 часть выхода). Показана пунктирной линией на графике «балл × цена».</li>
</ul>
<h2>Ограничения</h2>
<ul>
<li>Перцентиль зависит от группы: когда появляется сильная модель, остальные могут опуститься, не став хуже.</li>
<li>Elo измеряет предпочтения, а не точность. На него влияют стиль и длина ответа.</li>
<li>Цена берётся с OpenRouter (самая низкая среди провайдеров); цена у самого производителя может отличаться.</li>
</ul>
<h2>Другие источники</h2>
<p>Эти сайты тоже отслеживают ИИ-модели, но в балл не входят:</p>
<ul>
<li>${L('https://benchlm.ai/', 'BenchLM')}: объединяет сотни бенчмарков. Его условия требуют отдельного соглашения для показа данных на публичном сайте.</li>
<li>${L('https://hai.stanford.edu/ai-index', 'Stanford HAI — AI Index')}: ежегодный отчёт о состоянии ИИ; это не рейтинг моделей с ежедневным обновлением.</li>
<li>${L('https://ia.com.br/melhores-ias', 'ia.com.br — Melhores IAs')}: рейтинг на португальском, который перепубликует данные Artificial Analysis, OpenRouter и Design Arena; у него нет API, он не объясняет, как считается оценка, не разрешает повторное использование данных и повторяет источники, которые RankingIA уже читает напрямую.</li>
<li>${L('https://www.designarena.ai/', 'Design Arena')}: Elo по голосам людей за сайты, приложения, изображения и видео. Его robots.txt запрещает автоматический доступ к API, а лицензии на повторное использование данных нет.</li>
<li>${L('https://swen.ia.br/ranking', 'SWEN.AI')}: рейтинг на португальском, построенный только на данных Artificial Analysis, которые RankingIA уже использует напрямую.</li>
</ul>
<h2>Состояние источников</h2>
${c.status}
<p>Данные каждого источника принадлежат их владельцам и подчиняются их условиям. Код RankingIA открыт, лицензия MIT, адрес: ${GH}.</p>`,

  titulo: ['Методология — как считается балл RankingIA', 'Откуда берутся данные RankingIA, как LiveBench, LMArena, OpenRouter и Artificial Analysis объединяются в балл от 0 до 100 и каковы его ограничения.'],

  status: ['Источник', 'Последний сбор', 'Данные от', 'Метрика', 'Вес', 'Категория', 'Метрики', 'сбой'],
};
