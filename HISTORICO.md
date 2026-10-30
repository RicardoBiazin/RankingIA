# Histórico

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

- Chave da Artificial Analysis (`AA_API_KEY`) no `.env` e nos secrets do GitHub. Com ela, o ranking geral passa de ~30 para centenas de modelos.
- Revisar `dados/candidatos-alias.json` e completar `dados/aliases.json`.
- Token do Cloudflare Web Analytics em `src/perfil.mjs`, se quiser medir visitas.
