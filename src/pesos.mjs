// Métricas do ranking. `peso` > 0 entra na Nota RankingIA; peso 0 só aparece nas telas.
// A nota é a média ponderada dos percentis de cada métrica entre os modelos que a têm.

export const METRICAS = [
  { id: 'lb_geral', nome: 'LiveBench', curto: 'LiveBench', fonte: 'livebench', peso: 3, unidade: '%', desc: 'Nota geral do LiveBench 2.0 (tarefas longas e sem contaminação), com os pesos do próprio LiveBench.' },
  { id: 'aa_inteligencia', nome: 'Índice de Inteligência AA', curto: 'Intel. AA', fonte: 'artificialanalysis', peso: 3, unidade: '', desc: 'Artificial Analysis Intelligence Index.' },
  { id: 'arena_texto', nome: 'Arena texto (Elo)', curto: 'Arena', fonte: 'lmarena', peso: 2, unidade: 'Elo', desc: 'Preferência humana em conversas de texto (LMArena).' },
  { id: 'arena_webdev', nome: 'Arena WebDev (Elo)', curto: 'WebDev', fonte: 'lmarena', peso: 1, unidade: 'Elo', desc: 'Preferência humana em criar páginas e apps web (LMArena).' },
  { id: 'arena_visao', nome: 'Arena visão (Elo)', curto: 'Visão', fonte: 'lmarena', peso: 0.5, unidade: 'Elo', desc: 'Preferência humana em tarefas com imagem (LMArena).' },
];

// Categorias do LiveBench 2.0 -> id e nome em português. Categoria nova sem
// tradução aparece com o nome original.
export const CATEGORIAS_LB = {
  'Long Agentic': { id: 'lb_agentico', nome: 'Agêntico longo' },
  Reasoning: { id: 'lb_raciocinio', nome: 'Raciocínio' },
  Coding: { id: 'lb_codigo', nome: 'Código' },
  Browser: { id: 'lb_navegador', nome: 'Navegador' },
  'Data Analysis': { id: 'lb_dados', nome: 'Análise de dados' },
  Research: { id: 'lb_pesquisa', nome: 'Pesquisa' },
  Design: { id: 'lb_design', nome: 'Design' },
  Mathematics: { id: 'lb_matematica', nome: 'Matemática' },
  Language: { id: 'lb_linguagem', nome: 'Linguagem' },
};

// Só entra no ranking geral quem tem ao menos um benchmark objetivo destes. Quem
// só tem Elo de arena fica na lista "outros modelos", ordenada pelo Elo de texto.
// Os percentis são calculados contra os modelos do ranking geral, para que todas
// as métricas comparem o mesmo grupo de modelos.
export const EXIGE_UMA_DE = ['lb_geral', 'aa_inteligencia'];

export const FONTES = {
  livebench: { nome: 'LiveBench', url: 'https://livebench.ai/', licenca: 'dados públicos do LiveBench' },
  lmarena: { nome: 'LMArena', url: 'https://arena.ai/leaderboard', licenca: 'dataset lmarena-ai/leaderboard-dataset no Hugging Face' },
  openrouter: { nome: 'OpenRouter', url: 'https://openrouter.ai/models', licenca: 'API pública de modelos do OpenRouter' },
  artificialanalysis: { nome: 'Artificial Analysis', url: 'https://artificialanalysis.ai/', licenca: 'API gratuita da Artificial Analysis (citação obrigatória)' },
  cambio: { nome: 'Câmbio do BCE (Frankfurter)', url: 'https://frankfurter.dev/', licenca: 'cotação de referência do Banco Central Europeu' },
};

// Categorias do ranking (botões acima da tabela). A nota da categoria é a média dos
// percentis das métricas dela, com o mesmo encolhimento da nota geral.
export const CATEGORIAS = [
  { id: 'agentico', nome: 'Agêntico', metricas: ['lb_agentico'] },
  { id: 'codigo', nome: 'Código', metricas: ['lb_codigo', 'arena_webdev'] },
  { id: 'raciocinio', nome: 'Raciocínio', metricas: ['lb_raciocinio'] },
  { id: 'dados', nome: 'Análise de dados', metricas: ['lb_dados'] },
  { id: 'pesquisa', nome: 'Pesquisa', metricas: ['lb_pesquisa'] },
  { id: 'design', nome: 'Design', metricas: ['lb_design', 'arena_webdev'] },
  { id: 'navegador', nome: 'Navegador', metricas: ['lb_navegador'] },
  { id: 'conversa', nome: 'Conversa', metricas: ['arena_texto'] },
  { id: 'visao', nome: 'Visão', metricas: ['arena_visao'] },
];

// Encolhimento: a nota soma este peso extra com percentil 50. Quem tem só uma
// métrica fica perto do meio; quem tem várias quase não muda.
export const PESO_NEUTRO = 1;
