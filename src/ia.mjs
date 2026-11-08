// Arquivos para agentes de IA e buscadores generativos (GEO): robots.txt com os rastreadores
// de IA liberados, llms.txt (índice) e llms-full.txt (ranking completo em texto).
// Os dados saem de dados/modelos.json, a mesma fonte das páginas.

import { SITE } from './layout.mjs';

// Rastreadores de IA conhecidos. Os de treinamento também entram: o objetivo é ser citado.
// Para liberar só a busca, tire GPTBot, ClaudeBot, Google-Extended, CCBot e Applebot-Extended.
export const RASTREADORES_IA = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Meta-ExternalAgent', 'CCBot', 'MistralAI-User',
];

export function robotsTxt() {
  const blocos = RASTREADORES_IA.map((bot) => `User-agent: ${bot}\nAllow: /\n`).join('\n');
  return `# RankingIA: conteúdo público, aberto a buscadores e agentes de IA.
# Índice para modelos de linguagem: ${SITE}/llms.txt (versão completa: ${SITE}/llms-full.txt)

User-agent: *
Allow: /

${blocos}
Sitemap: ${SITE}/sitemap.xml
`;
}

const linha = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const ordenados = (modelos) => modelos.filter((m) => !m.parcial).sort((a, b) => b.nota - a.nota);
const precoTexto = (m) => (m.precoEntrada == null ? 'preço não informado' : `US$ ${m.precoEntrada} entrada / US$ ${m.precoSaida} saída por 1M de tokens`);
const pesos = (m) => (m.aberto ? 'pesos abertos' : 'modelo fechado');

export function llmsTxt(dados) {
  const top = ordenados(dados.modelos).slice(0, 25);
  const data = dados.geradoEm.slice(0, 10);
  return [
    '# RankingIA',
    '',
    '> Ranking de modelos de IA (LLMs) em português. Junta placares públicos de LiveBench, LMArena, OpenRouter e Artificial Analysis numa nota de 0 a 100, e mostra preço, contexto e se o modelo tem pesos abertos. Criado por Ricardo Biazin (biazin.com.br). Código aberto sob licença MIT. Dados coletados todo dia.',
    '',
    'O RankingIA não roda testes próprios: reúne placares públicos que medem coisas diferentes e mostra tudo num lugar só. Preços estão em dólar por 1 milhão de tokens.',
    '',
    '## Páginas principais',
    '',
    `- [Ranking geral](${SITE}/): tabela ordenável com nota, preço e pesos abertos de cada modelo.`,
    `- [Gráficos](${SITE}/graficos.html): nota por preço, Elo da Arena por preço e nota por velocidade.`,
    `- [Comparar modelos](${SITE}/comparar.html): compare de 2 a 4 modelos lado a lado.`,
    `- [Metodologia](${SITE}/metodologia.html): fontes, pesos e como a nota é calculada.`,
    '',
    `## Modelos com maior nota (atualizado em ${data})`,
    '',
    ...top.map((m, i) => `- [${linha(m.nome)}](${SITE}/modelo/${m.slug}.html): nota ${m.nota.toLocaleString('pt-BR')}, ${linha(m.empresa)}, ${precoTexto(m)}, ${pesos(m)}.`),
    '',
    '## Outros idiomas',
    '',
    `- [English](${SITE}/en/): the same ranking in English.`,
    `- [Español](${SITE}/es/): el mismo ranking en español.`,
    `- [Français](${SITE}/fr/): le même classement en français.`,
    `- [中文](${SITE}/zh/): 中文版排行榜。`,
    '',
    '## Versão completa',
    '',
    `- [llms-full.txt](${SITE}/llms-full.txt): todos os modelos do ranking, com dados de cada um.`,
    '',
  ].join('\n');
}

export function llmsFullTxt(dados) {
  const data = dados.geradoEm.slice(0, 10);
  const linhas = [
    '# RankingIA: ranking completo',
    '',
    `Atualizado em ${data}. Notas de 0 a 100, calculadas a partir de placares públicos (LiveBench, LMArena, OpenRouter e Artificial Analysis). Preços em dólar por 1 milhão de tokens. Metodologia: ${SITE}/metodologia.html`,
    '',
    '## Modelos do ranking',
    '',
  ];
  for (const m of ordenados(dados.modelos)) {
    linhas.push(`### ${linha(m.nome)}`, '');
    linhas.push(`Página: ${SITE}/modelo/${m.slug}.html`);
    linhas.push(`Empresa: ${linha(m.empresa)}`);
    linhas.push(`Nota: ${m.nota.toLocaleString('pt-BR')} de 100`);
    linhas.push(`Preço: ${precoTexto(m)}`);
    linhas.push(`Contexto: ${m.contexto ? `${m.contexto.toLocaleString('pt-BR')} tokens` : 'não informado'}`);
    linhas.push(`Pesos: ${pesos(m)}`);
    if (m.lancamento) linhas.push(`Lançamento: ${m.lancamento}`);
    linhas.push('');
  }
  linhas.push('## Fontes', '', '- LiveBench: https://livebench.ai/', '- LMArena (arena.ai): https://arena.ai/leaderboard', '- OpenRouter: https://openrouter.ai/models', '- Artificial Analysis: https://artificialanalysis.ai/', '');
  return linhas.join('\n');
}
