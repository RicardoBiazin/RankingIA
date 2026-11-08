# RankingIA

Ranking de modelos de IA (LLMs) em português, no ar em **https://rankingia.biazin.com.br**.

O site junta placares públicos numa nota de 0 a 100 e mostra preço, contexto e pesos abertos ao lado. As telas são estas:

- **Ranking**: tabela ordenável com busca e filtros por empresa, pesos abertos e preço. Tem colunas por categoria e permite escolher modelos para comparar.
- **Gráficos**: nota × preço, Elo da Arena × preço, nota × velocidade (com Artificial Analysis), evolução no LiveBench e evolução da nota.
- **Página por modelo**: todas as notas por fonte, com percentil, preço, contexto e links.
- **Comparar**: de 2 a 4 modelos lado a lado, mais um radar de percentis. O link guarda a escolha.

## Idiomas

O site existe em português (raiz), inglês (`/en`), espanhol (`/es`), francês (`/fr`) e chinês (`/zh`).

- Os textos ficam em [`src/i18n.mjs`](src/i18n.mjs), no formato `[pt, en, es, fr, zh]`.
- A metodologia fica em [`src/metodologia.mjs`](src/metodologia.mjs).
- O `testar` falha se faltar tradução.

## Fontes

| Fonte | O que traz | Acesso |
|---|---|---|
| [LiveBench](https://livebench.ai/) | nota geral e categorias do LiveBench 2.0, além do histórico de releases | público |
| [LMArena](https://lmarena.ai/leaderboard) | Elo de texto, WebDev e visão | dataset público `lmarena-ai/leaderboard-dataset` |
| [OpenRouter](https://openrouter.ai/models) | preço, contexto, data de lançamento e pesos abertos | API pública |
| [Artificial Analysis](https://artificialanalysis.ai/) | Intelligence Index, preço e velocidade (endpoint grátis `/api/v2/language/models/free`) | API grátis com chave (`AA_API_KEY`); citação obrigatória |

Os preços são em dólar nas fontes. O site converte para outras 9 moedas (real, euro, iene, libra etc.) pelo câmbio de referência do BCE ([Frankfurter](https://frankfurter.dev/)), coletado junto com as fontes.

Se uma fonte falhar, o site continua com o último dado bom dela e avisa no rodapé.

## Como a nota é calculada

1. Entra no ranking geral quem tem ao menos um benchmark objetivo (LiveBench ou Intelligence Index da Artificial Analysis).
2. Cada métrica vira um percentil contra os modelos do ranking geral.
3. A nota é a média ponderada desses percentis, com 1 de peso extra em 50 para quem tem pouca evidência não pular para o topo. Os pesos ficam em [`src/pesos.mjs`](src/pesos.mjs).

Detalhes e limites: [metodologia](https://rankingia.biazin.com.br/metodologia.html).

## Rodar localmente

Requer Node 20 ou mais novo.

```
npm install
npm run atualizar      # coletar + normalizar + gerar + testar
npm run preview        # http://localhost:4191
```

Também existe o `gerar-e-abrir.bat`, que faz tudo isso e abre o navegador.

A chave da Artificial Analysis é opcional. Ela fica num `.env` na raiz, que não vai para o git:

```
AA_API_KEY=...
```

| Script | O que faz |
|---|---|
| `scripts/coletar.mjs` | baixa cada fonte para `dados/brutos/` e registra o status em `dados/status.json` |
| `scripts/normalizar.mjs` | junta os nomes, calcula percentis e nota e grava `dados/modelos.json` e `dados/historico/AAAA-MM-DD.json` |
| `scripts/gerar.mjs` | gera o site estático em `public/` |
| `scripts/testar.mjs` | confere regras, dados, páginas, links, versão no cabeçalho e CSP |

### Nomes que não se juntam

Cada fonte escreve o nome de um jeito. A função `chave()` em `scripts/util.mjs` remove empresa, data e modo de esforço. Os casos que sobram vão em [`dados/aliases.json`](dados/aliases.json). O `testar` lista candidatos em `dados/candidatos-alias.json`.

## Publicação

O GitHub Actions ([`.github/workflows/atualizar.yml`](.github/workflows/atualizar.yml)) roda todo dia às 06:00 de Brasília:

1. coleta e testa;
2. commita os dados do dia;
3. publica no Netlify.

O workflow precisa destes secrets:

- `NETLIFY_AUTH_TOKEN`;
- `NETLIFY_SITE_ID`;
- `AA_API_KEY`, que é opcional.

Para publicar à mão: `npm run publicar`, ou rodar o workflow pelo GitHub (`gh workflow run atualizar.yml`), que coleta, commita e publica do jeito do dia a dia.

## Buscadores

Cada idioma tem URL própria (`/`, `/en/`, `/es/`, `/fr/`, `/zh/`), então toda página leva `canonical` próprio, `hreflang` dos cinco idiomas e `x-default` apontando para o português. Também leva Open Graph (com `og:locale:alternate`) e cartão do Twitter. A página inicial tem JSON-LD `WebSite`; a CSP não bloqueia porque o JSON-LD é dado e não roda. O `gerar` escreve `robots.txt` e `sitemap.xml` com todas as páginas nos cinco idiomas. O `testar` confere, na página inicial de cada idioma, title de até 60 caracteres e description entre 140 e 160 (o chinês fica de fora da faixa).

## Licença

Código sob [MIT](LICENSE). Os dados pertencem às fontes e seguem os termos de cada uma.

## Visibilidade para agentes de IA (GEO)

- `public/robots.txt` vem de `src/ia.mjs` e libera os rastreadores de IA conhecidos. Para liberar só a busca, tire os de treinamento (GPTBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended) da lista `RASTREADORES_IA`.
- `public/llms.txt` é o índice em Markdown; `public/llms-full.txt` traz o ranking completo. Os dois saem de `dados/modelos.json` a cada `npm run gerar`.
