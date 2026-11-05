# Histórico

## 0.7.1 — 05/11/2026

- Rodapé de todas as páginas: link "This site is powered by Netlify" e link para o código de conduta (exigidos pelo programa de código aberto da Netlify).
- Novo `CODE_OF_CONDUCT.md` na raiz do repositório (Contributor Covenant 2.1).

## 0.7.0 — 04/11/2026

- Artificial Analysis migrada para o endpoint grátis da API V2 (`/api/v2/language/models/free`, paginado). O legado `/api/v2/data/llms/models` sai do ar em 04/11/2026 às 23:59 UTC (410 Gone).
- O endpoint grátis não traz HLE, Terminal-Bench, GPQA nem contexto longo. Essas métricas saíram da nota, das tabelas e das categorias (Agêntico, Raciocínio e Pesquisa ficam só com o LiveBench).
- Entra no ranking geral quem tem LiveBench ou Intelligence Index.

## 0.6.2 — 30/10/2026

Acabamento para buscadores (SEO).

- Title da página inicial com o termo de busca primeiro, por exemplo "Ranking de modelos de IA (LLMs) · RankingIA".
- Description da página inicial encurtada para 150 a 156 caracteres. Antes tinha cerca de 200 e o Google cortava.
- Todas as páginas: `og:site_name`, `og:locale:alternate` dos outros idiomas e cartão do Twitter (`summary`).
- Página inicial: JSON-LD `WebSite` em cada idioma.
- Já existiam e foram conferidos: canonical por idioma, `hreflang` com `x-default`, `robots.txt` com o Sitemap e `sitemap.xml` com as 4 páginas e todos os modelos nos 5 idiomas.
- `testar` confere o SEO da página inicial nos 5 idiomas e o Sitemap no `robots.txt`.

## 0.6.1 — 30/10/2026

- LMArena agora aponta para arena.ai (o lmarena.ai redireciona para lá). Os dados continuam vindo do dataset oficial no Hugging Face.
- Metodologia: nova seção "Outras referências", com BenchLM, Stanford HAI (AI Index) e SWEN.AI, e o motivo de nenhum deles entrar na nota:
  - BenchLM: os termos pedem um acordo para exibir os dados;
  - AI Index: é um relatório anual;
  - SWEN.AI: usa só a Artificial Analysis, que o site já usa direto da fonte.

## 0.6.0 — 30/10/2026

- Cinco idiomas: português (raiz), inglês (/en), espanhol (/es), francês (/fr) e chinês (/zh).
  - Menu de idioma no cabeçalho, que funciona sem JavaScript.
  - `hreflang` e sitemap com as URLs de todos os idiomas.
  - Números, datas e moedas no formato de cada idioma.
  - Textos em `src/i18n.mjs` e metodologia em `src/metodologia.mjs`; o teste confere se todo texto existe nos 5 idiomas, com os mesmos marcadores.
- Evolução da família na página de cada modelo (por exemplo Claude Opus 3 → 4 → 4.5 → 5.5), com a nota e o índice AA por versão, em ordem de lançamento. Clicar num ponto abre a versão.
  - A família é a chave sem os números de versão.
  - "Claude 4 Opus" e "Claude Opus 4" agora viram o mesmo modelo.
- Rodapé avisa que a coleta e os resultados são gerados de forma autônoma, sem edição manual das notas.

## 0.5.0 — 30/10/2026

- Botões de categoria acima do ranking (como no LiveBench): Todas, Agêntico, Código, Raciocínio, Análise de dados, Pesquisa, Design, Navegador, Conversa e Visão.
  - Ao escolher uma categoria, a tabela mostra a nota dela e as métricas que a formam, ordena por essa nota, e o "#" vira a posição na categoria.
  - Substitui a caixa "Mostrar categorias".
- Nota por categoria: média dos percentis das métricas da categoria, com o mesmo encolhimento da nota geral.
- Página do modelo:
  - tabela "Por categoria", com nota e posição;
  - gráfico "Evolução", com a nota dia a dia e a posição na dica (aparece a partir do 2º dia de coleta).
- Página de gráficos: "Evolução das IAs", com cada modelo na data de lançamento e a linha do recorde de nota para pesos fechados e abertos.

## 0.4.0 — 30/10/2026

- As tabelas abrem com os 10 primeiros modelos. O seletor "Mostrar" escolhe entre 10, 20, 50, 100 ou todos, e vale para as duas tabelas.
- O limite respeita a busca, os filtros e a ordenação: são sempre os primeiros da ordem atual.
- O contador mostra quantos aparecem, quantos o filtro achou e o total.
- Sem JavaScript, todas as linhas continuam na página.

## 0.3.2 — 30/10/2026

- Preços sempre com 2 casas decimais. Valores abaixo de 0,005 aparecem como "< 0,01".

## 0.3.1 — 30/10/2026

- Dez moedas no seletor: dólar americano, real, euro, iene, libra, yuan, dólar australiano, dólar canadense, franco suíço e dólar de Hong Kong. Fechado, o seletor mostra só o símbolo; aberto, mostra o nome da moeda.
- Formato das moedas pelo `Intl` (por exemplo "US$ 4,00", "R$ 21,41", "JP¥ 632").
- A tabela cabe na tela sem rolar para o lado em 1366 px ou mais:
  - valores a partir de 100 saem sem centavos;
  - a Arena visão (peso 0,5) foi para "Mostrar categorias";
  - a barra da nota ficou menor e a página, mais larga (1440 px).

## 0.3.0 — 30/10/2026

- Escolha da moeda dos preços no cabeçalho: US$ (original), R$ ou €. A escolha vale para a tabela, o filtro de preço, a página do modelo, a comparação e os gráficos, e fica guardada no navegador.
- Câmbio de referência do BCE pela API do Frankfurter, coletado todo dia junto com as fontes. A cotação e a data aparecem no rodapé.

## 0.2.0 — 30/10/2026

- Artificial Analysis ativa.
  - Métricas: Intelligence Index (peso 3), Humanity's Last Exam (peso 1) e Terminal-Bench v4 (peso 1); GPQA e contexto longo aparecem só nas tabelas.
  - A API lista cada modo de esforço como um modelo: fica o melhor. A chave sai do nome, porque o slug da AA troca ponto por hífen.
  - Na falta do OpenRouter, preço e lançamento vêm da AA.
- Ranking geral: entra quem tem LiveBench, Intelligence Index ou HLE. Passou de 32 para ~430 modelos.
- Nota com encolhimento: 1 de peso extra com percentil 50, para que um modelo com uma métrica só não vá ao topo.
- Gráfico nota × velocidade.

## 0.1.0 — 30/10/2026

Primeira versão.

- Coleta de LiveBench 2.0 (categorias e histórico de releases), LMArena (texto, WebDev e visão), OpenRouter (preço, contexto, lançamento, pesos abertos) e Artificial Analysis (opcional, com chave).
- Nota RankingIA: média ponderada de percentis.
  - Entra no ranking geral quem tem LiveBench ou o índice da AA.
  - Quem só tem Elo da Arena fica em "outros modelos".
- Telas:
  - ranking com filtros, categorias e seleção para comparar;
  - gráficos de nota × preço, Arena × preço e evolução;
  - página por modelo;
  - comparar até 4 modelos com radar;
  - metodologia.
- Se uma fonte falhar, o site fica com o último dado bom dela e avisa no rodapé.
- O site é estático: CSP sem `unsafe-inline`, Chart.js servido do próprio site, tema claro/escuro e versão no cabeçalho.
- Atualização diária pelo GitHub Actions, com commit dos dados e deploy no Netlify.

## Pendências

- Secret `AA_API_KEY` no GitHub (o `.env` local já tem a chave).
- Revisar `dados/candidatos-alias.json` e completar `dados/aliases.json`.
- Token do Cloudflare Web Analytics em `src/perfil.mjs`, se quiser medir visitas.
