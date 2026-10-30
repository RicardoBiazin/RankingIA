// Texto da página de metodologia em cada idioma. c = partes já montadas pelo gerar.mjs:
// exige (métricas exigidas), pesos (tabela), cats (lista de categorias), status (tabela),
// aa (Artificial Analysis em uso?), neutro (peso extra do encolhimento).

const L = (url, nome) => `<a href="${url}" rel="noopener">${nome}</a>`;
const LB = L('https://livebench.ai/', 'LiveBench');
const LA = L('https://lmarena.ai/leaderboard', 'LMArena');
const OR = L('https://openrouter.ai/models', 'OpenRouter');
const AA = L('https://artificialanalysis.ai/', 'Artificial Analysis');
const FR = L('https://frankfurter.dev/', 'Frankfurter');
const GH = L('https://github.com/RicardoBiazin/RankingIA', 'github.com/RicardoBiazin/RankingIA');
const ISSUE = (txt) => L('https://github.com/RicardoBiazin/RankingIA/issues', txt);

export const METODOLOGIA = {
  'pt-BR': (c) => `<h1>Metodologia</h1>
<p>O RankingIA não roda testes próprios. Ele junta placares públicos que medem coisas diferentes e mostra tudo num lugar só, com preço e contexto ao lado. Os dados são coletados uma vez por dia.</p>
<h2>Fontes</h2>
<ul>
<li>${LB}: benchmark objetivo, com questões novas a cada release para evitar contaminação. Usamos a nota geral do LiveBench 2.0 e cada categoria.</li>
<li>${LA}: pessoas comparam duas respostas às cegas e votam; isso vira um Elo. Usamos as arenas de texto, WebDev e visão. Quando um modelo tem vários modos ("High", "Max"), fica o melhor Elo.</li>
<li>${OR}: preço por milhão de tokens, janela de contexto, data de lançamento e se os pesos são abertos.</li>
<li>${AA}: Intelligence Index, Humanity's Last Exam, Terminal-Bench, GPQA e contexto longo, além de preço e velocidade. ${c.aa ? 'Em uso.' : 'Ainda não está em uso.'}</li>
<li>${FR}: câmbio de referência do Banco Central Europeu, para mostrar os preços em outras moedas.</li>
</ul>
<h2>Nota RankingIA</h2>
<ol>
<li>Entram no ranking geral os modelos com ao menos um benchmark objetivo (${c.exige}). Os demais aparecem em "outros modelos", sem nota.</li>
<li>Para cada métrica, calculamos o <strong>percentil</strong>: a porcentagem dos modelos do ranking geral que este modelo supera (empate conta meio). Assim, Elo e porcentagem de acerto ficam na mesma escala de 0 a 100.</li>
<li>A nota é a média ponderada dos percentis que o modelo tem. Métrica que falta não conta, nem contra nem a favor.</li>
<li>Para quem tem pouca evidência não pular para o topo com uma métrica só, a média recebe ${c.neutro} de peso extra com percentil 50.</li>
</ol>
${c.pesos}
<h2>Categorias</h2>
<p>Cada categoria tem uma nota própria: a média dos percentis das métricas dela, com o mesmo encolhimento. As categorias e suas métricas são:</p>
${c.cats}
<h2>Evolução de cada modelo</h2>
<p>Modelos da mesma família (por exemplo Claude Opus 3, 4, 4.5 e 5.5) são agrupados pelo nome sem o número da versão. A página de cada modelo mostra a família inteira em ordem de lançamento.</p>
<h2>Nomes dos modelos</h2>
<p>Cada fonte escreve o nome de um jeito ("Claude Opus 5.5 (High)", "anthropic/claude-opus-5.5"). Juntamos por uma chave sem empresa, data e modo de esforço; os casos que a regra não pega ficam numa lista de apelidos revisada à mão. Se algum modelo aparecer duplicado ou trocado, ${ISSUE('abra uma issue')}.</p>
<h2>Limites</h2>
<ul>
<li>Percentil depende do grupo: quando um modelo forte entra, os outros podem cair sem ter piorado.</li>
<li>Elo mede preferência, não acerto. Estilo e tamanho da resposta influenciam.</li>
<li>O preço é o do OpenRouter (o menor entre provedores); o preço direto no fabricante pode ser outro.</li>
</ul>
<h2>Situação das fontes</h2>
${c.status}
<p>Os dados de cada fonte são de seus donos e seguem os termos deles. O código do RankingIA é aberto, licença MIT, em ${GH}.</p>`,

  en: (c) => `<h1>Methodology</h1>
<p>RankingIA does not run its own tests. It combines public leaderboards that measure different things and shows them in one place, next to price and context. Data is collected once a day.</p>
<h2>Sources</h2>
<ul>
<li>${LB}: objective benchmark with new questions every release to avoid contamination. We use the LiveBench 2.0 overall score and each category.</li>
<li>${LA}: people compare two anonymous answers and vote; this becomes an Elo rating. We use the text, WebDev and vision arenas. When a model has several modes ("High", "Max"), the best Elo is kept.</li>
<li>${OR}: price per million tokens, context window, release date and whether the weights are open.</li>
<li>${AA}: Intelligence Index, Humanity's Last Exam, Terminal-Bench, GPQA and long context, plus price and speed. ${c.aa ? 'In use.' : 'Not in use yet.'}</li>
<li>${FR}: European Central Bank reference rates, to show prices in other currencies.</li>
</ul>
<h2>RankingIA score</h2>
<ol>
<li>The overall ranking includes models with at least one objective benchmark (${c.exige}). The rest appear under "other models", without a score.</li>
<li>For each metric we compute the <strong>percentile</strong>: the share of ranked models this model beats (a tie counts as half). This puts Elo ratings and accuracy on the same 0–100 scale.</li>
<li>The score is the weighted average of the percentiles the model has. A missing metric counts neither for nor against it.</li>
<li>So that a model with little evidence cannot jump to the top on a single metric, the average gets ${c.neutro} extra weight at percentile 50.</li>
</ol>
${c.pesos}
<h2>Categories</h2>
<p>Each category has its own score: the average percentile of its metrics, with the same shrinkage. Categories and their metrics:</p>
${c.cats}
<h2>History of each model</h2>
<p>Models of the same family (for example Claude Opus 3, 4, 4.5 and 5.5) are grouped by name without the version number. Each model page shows the whole family in release order.</p>
<h2>Model names</h2>
<p>Each source writes names differently ("Claude Opus 5.5 (High)", "anthropic/claude-opus-5.5"). We match them with a key without company, date and effort mode; cases the rule misses go into a hand-reviewed alias list. If a model looks duplicated or mixed up, ${ISSUE('open an issue')}.</p>
<h2>Limitations</h2>
<ul>
<li>Percentiles depend on the group: when a strong model arrives, others can drop without getting worse.</li>
<li>Elo measures preference, not accuracy. Style and answer length have an effect.</li>
<li>Prices come from OpenRouter (the lowest across providers); the vendor's own price may differ.</li>
</ul>
<h2>Source status</h2>
${c.status}
<p>Each source's data belongs to its owners and follows their terms. RankingIA's code is open source under the MIT license at ${GH}.</p>`,

  es: (c) => `<h1>Metodología</h1>
<p>RankingIA no ejecuta pruebas propias. Reúne tablas públicas que miden cosas distintas y las muestra en un solo lugar, junto al precio y el contexto. Los datos se recolectan una vez al día.</p>
<h2>Fuentes</h2>
<ul>
<li>${LB}: benchmark objetivo, con preguntas nuevas en cada versión para evitar contaminación. Usamos la nota general de LiveBench 2.0 y cada categoría.</li>
<li>${LA}: las personas comparan dos respuestas a ciegas y votan; eso se convierte en un Elo. Usamos las arenas de texto, WebDev y visión. Cuando un modelo tiene varios modos ("High", "Max"), queda el mejor Elo.</li>
<li>${OR}: precio por millón de tokens, ventana de contexto, fecha de lanzamiento y si los pesos son abiertos.</li>
<li>${AA}: Intelligence Index, Humanity's Last Exam, Terminal-Bench, GPQA y contexto largo, además de precio y velocidad. ${c.aa ? 'En uso.' : 'Aún no se usa.'}</li>
<li>${FR}: tipo de cambio de referencia del Banco Central Europeo, para mostrar precios en otras monedas.</li>
</ul>
<h2>Nota RankingIA</h2>
<ol>
<li>El ranking general incluye los modelos con al menos un benchmark objetivo (${c.exige}). Los demás aparecen en "otros modelos", sin nota.</li>
<li>Para cada métrica calculamos el <strong>percentil</strong>: el porcentaje de modelos del ranking que este modelo supera (un empate cuenta la mitad). Así, Elo y porcentaje de aciertos quedan en la misma escala de 0 a 100.</li>
<li>La nota es el promedio ponderado de los percentiles que tiene el modelo. Una métrica que falta no cuenta ni a favor ni en contra.</li>
<li>Para que un modelo con poca evidencia no suba a la cima con una sola métrica, el promedio recibe ${c.neutro} de peso extra con percentil 50.</li>
</ol>
${c.pesos}
<h2>Categorías</h2>
<p>Cada categoría tiene su propia nota: el promedio de los percentiles de sus métricas, con el mismo ajuste. Categorías y métricas:</p>
${c.cats}
<h2>Evolución de cada modelo</h2>
<p>Los modelos de la misma familia (por ejemplo Claude Opus 3, 4, 4.5 y 5.5) se agrupan por el nombre sin el número de versión. La página de cada modelo muestra toda la familia en orden de lanzamiento.</p>
<h2>Nombres de los modelos</h2>
<p>Cada fuente escribe el nombre a su manera ("Claude Opus 5.5 (High)", "anthropic/claude-opus-5.5"). Los unimos con una clave sin empresa, fecha ni modo de esfuerzo; los casos que la regla no capta van a una lista de alias revisada a mano. Si un modelo aparece duplicado o mezclado, ${ISSUE('abre un issue')}.</p>
<h2>Límites</h2>
<ul>
<li>El percentil depende del grupo: cuando entra un modelo fuerte, los otros pueden bajar sin haber empeorado.</li>
<li>El Elo mide preferencia, no acierto. El estilo y la longitud de la respuesta influyen.</li>
<li>El precio es el de OpenRouter (el menor entre proveedores); el precio directo del fabricante puede ser otro.</li>
</ul>
<h2>Estado de las fuentes</h2>
${c.status}
<p>Los datos de cada fuente pertenecen a sus dueños y siguen sus términos. El código de RankingIA es abierto, con licencia MIT, en ${GH}.</p>`,

  fr: (c) => `<h1>Méthodologie</h1>
<p>RankingIA ne fait pas ses propres tests. Il réunit des classements publics qui mesurent des choses différentes et les affiche au même endroit, avec le prix et le contexte. Les données sont collectées une fois par jour.</p>
<h2>Sources</h2>
<ul>
<li>${LB} : benchmark objectif, avec de nouvelles questions à chaque version pour éviter la contamination. Nous utilisons le score global de LiveBench 2.0 et chaque catégorie.</li>
<li>${LA} : des personnes comparent deux réponses anonymes et votent ; cela donne un Elo. Nous utilisons les arènes texte, WebDev et vision. Quand un modèle a plusieurs modes (« High », « Max »), le meilleur Elo est retenu.</li>
<li>${OR} : prix par million de tokens, fenêtre de contexte, date de sortie et poids ouverts ou non.</li>
<li>${AA} : Intelligence Index, Humanity's Last Exam, Terminal-Bench, GPQA et contexte long, ainsi que prix et vitesse. ${c.aa ? 'Utilisé.' : 'Pas encore utilisé.'}</li>
<li>${FR} : taux de référence de la Banque centrale européenne, pour afficher les prix dans d’autres devises.</li>
</ul>
<h2>Score RankingIA</h2>
<ol>
<li>Le classement général comprend les modèles ayant au moins un benchmark objectif (${c.exige}). Les autres apparaissent dans « autres modèles », sans score.</li>
<li>Pour chaque métrique, nous calculons le <strong>percentile</strong> : la part des modèles classés que ce modèle dépasse (une égalité compte pour moitié). L’Elo et le taux de réussite sont ainsi sur la même échelle de 0 à 100.</li>
<li>Le score est la moyenne pondérée des percentiles disponibles. Une métrique manquante ne compte ni pour ni contre.</li>
<li>Pour qu’un modèle peu évalué ne monte pas en tête avec une seule métrique, la moyenne reçoit un poids supplémentaire de ${c.neutro} au percentile 50.</li>
</ol>
${c.pesos}
<h2>Catégories</h2>
<p>Chaque catégorie a son propre score : la moyenne des percentiles de ses métriques, avec le même ajustement. Catégories et métriques :</p>
${c.cats}
<h2>Évolution de chaque modèle</h2>
<p>Les modèles d’une même famille (par exemple Claude Opus 3, 4, 4.5 et 5.5) sont regroupés par leur nom sans numéro de version. La page de chaque modèle montre toute la famille dans l’ordre de sortie.</p>
<h2>Noms des modèles</h2>
<p>Chaque source écrit les noms à sa façon (« Claude Opus 5.5 (High) », « anthropic/claude-opus-5.5 »). Nous les rapprochons par une clé sans entreprise, date ni mode d’effort ; les cas non couverts vont dans une liste d’alias revue à la main. Si un modèle semble dupliqué ou confondu, ${ISSUE('ouvrez une issue')}.</p>
<h2>Limites</h2>
<ul>
<li>Le percentile dépend du groupe : quand un modèle fort arrive, les autres peuvent baisser sans s’être dégradés.</li>
<li>L’Elo mesure une préférence, pas l’exactitude. Le style et la longueur des réponses comptent.</li>
<li>Le prix est celui d’OpenRouter (le plus bas parmi les fournisseurs) ; le prix direct de l’éditeur peut différer.</li>
</ul>
<h2>État des sources</h2>
${c.status}
<p>Les données de chaque source appartiennent à leurs propriétaires et suivent leurs conditions. Le code de RankingIA est ouvert, sous licence MIT, sur ${GH}.</p>`,

  'zh-CN': (c) => `<h1>方法说明</h1>
<p>RankingIA 不自行测试。它汇总衡量不同能力的公开榜单，并与价格、上下文一起集中展示。数据每天采集一次。</p>
<h2>数据来源</h2>
<ul>
<li>${LB}：客观基准，每个版本都有新题以避免数据污染。我们使用 LiveBench 2.0 总分及各类别分数。</li>
<li>${LA}：用户匿名比较两个回答并投票，形成 Elo 分数。我们使用文本、WebDev 和视觉竞技场。同一模型有多个模式（"High"、"Max"）时取最佳 Elo。</li>
<li>${OR}：每百万 token 价格、上下文窗口、发布日期以及是否开放权重。</li>
<li>${AA}：智能指数、Humanity's Last Exam、Terminal-Bench、GPQA 和长上下文，以及价格和速度。${c.aa ? '已启用。' : '尚未启用。'}</li>
<li>${FR}：欧洲央行参考汇率，用于以其他货币显示价格。</li>
</ul>
<h2>RankingIA 评分</h2>
<ol>
<li>总榜收录至少有一项客观基准（${c.exige}）的模型，其余模型列于"其他模型"，不计评分。</li>
<li>对每项指标计算<strong>百分位</strong>：该模型超过的上榜模型比例（并列算一半）。这样 Elo 与正确率都落在 0–100 的同一尺度上。</li>
<li>评分是该模型已有百分位的加权平均。缺失的指标不计入，既不加分也不扣分。</li>
<li>为避免证据较少的模型凭单一指标登顶，平均值额外加入权重 ${c.neutro}、百分位 50 的一项。</li>
</ol>
${c.pesos}
<h2>类别</h2>
<p>每个类别有自己的评分：其各项指标百分位的平均值，采用相同的收缩处理。类别及其指标如下：</p>
${c.cats}
<h2>模型的演进</h2>
<p>同一系列的模型（例如 Claude Opus 3、4、4.5 和 5.5）按去掉版本号后的名称归为一组。每个模型页面按发布顺序展示整个系列。</p>
<h2>模型名称</h2>
<p>各来源的命名方式不同（"Claude Opus 5.5 (High)"、"anthropic/claude-opus-5.5"）。我们用去掉公司、日期和推理模式后的键进行匹配；规则无法覆盖的情况放入人工维护的别名列表。如发现模型重复或混淆，请${ISSUE('提交 issue')}。</p>
<h2>局限</h2>
<ul>
<li>百分位取决于群体：强模型加入后，其他模型可能在没有变差的情况下名次下降。</li>
<li>Elo 衡量的是偏好而非正确率，回答风格和长度会产生影响。</li>
<li>价格取自 OpenRouter（各提供商中的最低价）；厂商直售价格可能不同。</li>
</ul>
<h2>数据源状态</h2>
${c.status}
<p>各来源的数据归其所有者，并遵循其条款。RankingIA 代码以 MIT 许可证开源：${GH}。</p>`,
};

export const METODOLOGIA_TITULO = {
  'pt-BR': ['Metodologia — como a nota do RankingIA é calculada', 'De onde vêm os dados do RankingIA, como juntamos LiveBench, LMArena, OpenRouter e Artificial Analysis numa nota de 0 a 100 e quais são os limites.'],
  en: ['Methodology — how the RankingIA score is calculated', 'Where RankingIA data comes from, how LiveBench, LMArena, OpenRouter and Artificial Analysis are combined into a 0–100 score, and its limitations.'],
  es: ['Metodología — cómo se calcula la nota de RankingIA', 'De dónde vienen los datos de RankingIA, cómo combinamos LiveBench, LMArena, OpenRouter y Artificial Analysis en una nota de 0 a 100 y cuáles son sus límites.'],
  fr: ['Méthodologie — comment le score RankingIA est calculé', 'D’où viennent les données de RankingIA, comment LiveBench, LMArena, OpenRouter et Artificial Analysis sont combinés en un score de 0 à 100, et ses limites.'],
  'zh-CN': ['方法说明 — RankingIA 评分如何计算', 'RankingIA 数据从何而来、如何把 LiveBench、LMArena、OpenRouter 和 Artificial Analysis 合成 0–100 分，以及其局限。'],
};

export const STATUS_CAB = {
  'pt-BR': ['Fonte', 'Última coleta', 'Dados de', 'Métrica', 'Peso', 'Categoria', 'Métricas', 'falhou'],
  en: ['Source', 'Last collection', 'Data from', 'Metric', 'Weight', 'Category', 'Metrics', 'failed'],
  es: ['Fuente', 'Última recolección', 'Datos del', 'Métrica', 'Peso', 'Categoría', 'Métricas', 'falló'],
  fr: ['Source', 'Dernière collecte', 'Données du', 'Métrique', 'Poids', 'Catégorie', 'Métriques', 'échec'],
  'zh-CN': ['来源', '最近采集', '数据日期', '指标', '权重', '类别', '指标', '失败'],
};
