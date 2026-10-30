# Histórico

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
