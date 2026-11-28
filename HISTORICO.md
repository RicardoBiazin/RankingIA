# Histórico

## 0.12.1 — 28/11/2026

Liga o Cloudflare Web Analytics (sem cookies) em todas as páginas.

- `cloudflareToken` preenchido em `src/perfil.mjs`; o beacon sai em todas as páginas do Padrão (`src/layout.mjs`) e agora também nos visuais Instagram, Lens e Apple (`beaconCloudflare()` exportado pelo layout e usado em `modelos/_base.mjs`), que antes ficavam sem o beacon.
- Teste novo: com token, as 4873 páginas (todos os idiomas, modelos, 404 e visuais) têm o beacon uma vez com o token certo; sem token, nenhuma tem. O token precisa ter 32 hexadecimais.
- O site não tem política de privacidade nem aviso de cookies, então não há texto a corrigir; a CSP já liberava só os dois domínios do Cloudflare.

## 0.12.0 — 28/11/2026

Os visuais Instagram, Lens e Apple mostram o logo original da empresa/IA no lugar da inicial.

- 40 logos SVG em `src/logos/` (pacote `@lobehub/icons-static-svg` 1.106.0, MIT; marcas dos respectivos donos, só para identificar o modelo; nota em `src/logos/LEIA.txt`), copiados para `public/logos/`. Mapa empresa → logo em `src/logos.mjs` (onde há logo do produto, usa esse: Google → Gemini, Alibaba → Qwen, Anthropic → Claude, xAI → Grok, Moonshot → Kimi). Sem `currentColor`/`style` nos SVG (pretos fixos).
- `d.ranking[].logo`, `d.outros.lista[].logo` e `d.logoEmpresa(nome)` no `d` dos visuais; empresa sem logo (ex.: Institute Of Foundation Models, Thinking Machines) continua com a inicial colorida.
- Instagram: logos nos stories, cartões, pódio (avatar novo) e lista de outros. Lens: logo grande no ladrilho branco dentro do visor. Apple: avatar no hero, pódio, linhas do ranking e (novo) lista de outros. Ladrilho branco também no tema escuro.
- Testes: logos mapeados existem, SVG sem script/estilo/recurso externo, ao menos 75% do ranking com logo (hoje 70 de 88) e cada visual mostra `<img src="/logos/...">`.
- Limites: conferido em pt e ar (Apple/Lens/Instagram); logos pretos (OpenAI, Grok, IBM...) dependem do ladrilho branco.

## 0.11.0 — 28/11/2026

O visual escolhido (Instagram, Lens ou Apple) passa a vestir também as páginas do Padrão: modelo, gráficos, comparar, metodologia e 404, nos 11 idiomas.

- Cada visual ganha `modelos/<id>/skin.css` (feito por 3 agentes em paralelo, contrato na seção "Skin" de `modelos/CONTRATO.md`): troca os tokens de cor, forma, cabeçalho, cartões, tabelas e chips; os gráficos Chart.js leem os tokens `--serie-N`, `--grade` e `--texto*`, então acompanham a paleta, claro e escuro.
- `src/assets/visual-cedo.js` (no `<head>` das páginas do Padrão) lê o visual salvo, marca `<html data-visual>` e liga o skin antes de a página aparecer; sem JS ou sem escolha, é o Padrão. Não há páginas novas nem HTML duplicado. `visual.js` marca no menu o visual escolhido.
- Todo seletor do skin começa por `html[data-visual="id"]`, então o Padrão não muda.
- Testes: `visual-cedo.js` conhece os 3 visuais, `skin.css` existe em cada um, só regras sob `html[data-visual]` e sem recurso externo, e o script está nas páginas do Padrão e fora das inicias dos visuais.
- Corrige o estouro de largura da página comparar em 390 px (grade `1fr` sem `min-width:0`) também no Padrão: a tabela passa a rolar dentro do cartão.
- Limites: tabelas largas rolam dentro do cartão no celular; conferido só em pt, en, ar, ja (e ru no Apple).

## 0.10.0 — 27/11/2026

Visuais alternativos da página inicial, no mesmo método do Streaming Radar: Instagram, Lens e Apple.

- Seletor "Visual" (Padrão · Instagram · Lens · Apple) no cabeçalho de todas as páginas, nos 11 idiomas; a escolha fica só no navegador (`src/assets/visual.js`) e a inicial do Padrão leva ao visual escolhido.
- Os visuais ficam em `modelos/<id>/` (`modelo.mjs`, `estilo.css`, `filtro.js`), feitos por 3 agentes em paralelo a partir de `modelos/CONTRATO.md` e `modelos/_base.mjs`. Saem em `/instagram/`, `/lens/` e `/apple/` (e `/en/instagram/` etc.), `noindex`, com canonical na inicial do Padrão e fora do sitemap. Só a inicial muda; modelo, gráficos, comparar e metodologia são as do Padrão.
- Instagram: feed com stories das empresas, pódio em cartões, abas Ranking/Por categoria, curtir (favoritos no navegador). Lens: busca visual com chips, "melhor correspondência" e mosaico de cartões com visor. Apple: hero tipográfico, pódio em grade bento, lista limpa com controle segmentado.
- Texto só com chaves que já existiam (3 chaves novas: `visual.rotulo`, `visual.titulo`, `visual.padrao`, nos 11 idiomas). Árabe em RTL com propriedades lógicas.
- `RK_PUBLIC` (pasta absoluta) troca a saída `public/` em `gerar` e `testar`, para gerar e conferir sem apagar o `public/` de quem trabalha em paralelo.
- Testes: 3 visuais × 11 idiomas (CSP sem inline, um h1, os 88 modelos linkados, seletor, rodapé, moeda, tema, lang/dir, sem recurso externo, sem texto em português nos outros idiomas, links internos).
- Limites: favoritos e rótulos de ícone do Instagram sem tradução própria; Lens sem masonry de verdade (mantém a ordem do ranking); sem JS os filtros somem e a lista completa fica.

## 0.9.1 — 27/11/2026

- Corrige a coleta diária que falhava no `testar` ("llms-full.txt tem todos os modelos do ranking"): o OpenRouter devolveu "Gemma 4 26B A4B " com espaço no fim. O nome agora é normalizado em `normalizar.mjs` (espaços colapsados e aparados) e o `testar` confere isso.

## 0.9.0 — 22/11/2026

Seis idiomas novos, os mais falados que faltavam: hindi (`/hi`), árabe (`/ar`), bengali (`/bn`), russo (`/ru`), japonês (`/ja`) e indonésio (`/id`). O site passa a ter 11 idiomas.

- Cada idioma extra tem o seu arquivo em `src/idiomas/<código>.mjs` (256 textos, metodologia, título e cabeçalho do status); `i18n.mjs` e `metodologia.mjs` anexam esses textos aos 5 idiomas originais.
- Novo `scripts/validar-idioma.mjs <código>`: confere chaves, {marcadores}, tags HTML, esqueleto e links da metodologia, title até 60 e description de 140 a 160 caracteres (japonês e chinês dispensados da faixa).
- Árabe da direita para a esquerda: `<html dir="rtl">` e espelhamento em `estilo.css`. Números sempre com dígitos latinos (`ar-u-nu-latn`, `bn-BD-u-nu-latn`).
- 404 por pasta no `netlify.toml`, `llms.txt` com os novos idiomas, `hreflang` e sitemap de todos os 11 idiomas; o `testar` confere o `dir` do árabe.
- Traduções feitas por modelo de linguagem, sem revisão de falante nativo.

## 0.8.0 — 22/11/2026

Novos indicadores, a partir da metodologia da Artificial Analysis (endpoint grátis da API V2), do LiveBench e do ia.com.br.

- 6 índices por área da Artificial Analysis (finanças, estratégia e operações, jurídico, saúde, engenharia, economia): viram 6 categorias novas. Têm peso 0 na nota geral porque reaproveitam as avaliações do índice de inteligência (contariam duas vezes).
- Página do modelo: custo por tarefa e custo para rodar o índice inteiro (AA), tempo de resposta (mediana ponta a ponta, AA) e se o modelo está na fronteira de Pareto.
- Fronteira de Pareto (nota × preço médio 3:1) calculada em `normalizar.mjs` e desenhada como linha tracejada no gráfico nota × preço.
- Metodologia nos 5 idiomas: seção "Indicadores informativos" e, em "Outras referências", ia.com.br/melhores-ias e Design Arena.
- Não entraram como fonte: o ia.com.br só reexibe Artificial Analysis, OpenRouter e Design Arena, sem API, sem fórmula da pontuação e sem licença de reuso; a Design Arena veda a API no robots.txt e não licencia os dados.
- Testes: 6 índices por área, custo por tarefa, e propriedades da fronteira de Pareto.

## 0.7.2 — 07/11/2026

- Visibilidade para agentes de IA (GEO): `public/llms.txt` (índice com as páginas principais e os 25 modelos de maior nota) e `public/llms-full.txt` (ranking completo em texto).
- `robots.txt` gerado pelo script, com regra explícita `Allow: /` para os rastreadores de IA conhecidos (lista em `src/ia.mjs`).
- Testes conferem robots, llms.txt e ausência de `undefined`/`null`/`NaN`.

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
