# Contrato para criar um visual alternativo do RankingIA

Projeto: `V:\DEV\RankingIA`. O site oficial é o **Padrão** (`src/`, `scripts/gerar.mjs`, `public/`) e **não pode ser alterado**.
Cada visual alternativo (instagram, lens, apple) é só a **página inicial** (o ranking) em outra estrutura de tela, gerada em `/<id>/`
(português) e `/<idioma>/<id>/` (en, es, fr, zh, hi, ar, bn, ru, ja, id). As demais páginas (modelo, gráficos, comparar, metodologia)
são as do Padrão e o visual só linka para elas.

**Só edite arquivos dentro de `modelos/<seu-id>/`.** Não faça commit, push nem deploy. Não rode `node scripts/gerar.mjs` sem `RK_PUBLIC`
(apagaria o `public/` dos outros).

Não basta trocar cor: pense na organização da tela como o app de referência faz (feed, grade, lista, cartões, abas...), adaptada para
mostrar um **ranking de modelos de IA** (88 modelos no ranking + ~350 em "outros modelos"). Não copie logotipo nem marca registrada:
**inspire-se no estilo** (cores, formas, espaçamento, tipografia, padrões de navegação).

## O que entregar

Em `modelos/<id>/`:

1. **`modelo.mjs`** (já existe um esboço provisório: substitua). Exporta:
   - `export const meta = { nome, inspiracao, descricao }` (texto livre, só documentação).
   - `export function render(d)` → HTML completo. Comece com `head('<id>', d)` de `../_base.mjs` (devolve `<!doctype html>`, `<html lang dir data-cambio>` e `<head>` completo, com noindex,
     textos do navegador, tema claro/escuro, moeda e `/<id>/estilo.css`) e escreva `<body>...</body></html>`. Termine o body com `scripts('<id>', d, ['filtro.js'])`
     (inclui o seletor de visual, obrigatório, e o seu JS).
2. **`estilo.css`**, caminhos sempre absolutos `/<id>/arquivo`. Opcionais: `filtro.js` e `.svg` que você mesmo criar (qualquer arquivo que não seja `.mjs` é copiado para `public/<id>/`).

## Regras técnicas (a CSP é rígida)

- **Nenhum `<script>` inline, nenhum `<style>` e nenhum atributo `style="..."`.** Script só como arquivo, CSS só em `estilo.css`. Sem `onclick=` etc.
- Sem imagem nem fonte externa (nem CDN): só `data:`, arquivos do visual e SVG próprio. Fontes: pilha do sistema. Os modelos não têm logo: faça avatar com a inicial da empresa
  e cor por **classe** (ex.: `.c0`..`.c11` pelo índice da empresa em `d.empresas`), nunca por `style`.
- Sem `fetch`. JS opcional (filtro, abas, favoritos...), ES5/ES2015 simples, sem biblioteca, sem `innerHTML` com dado de fora. **A página precisa mostrar tudo sem JS.**
- Responsivo: 1280 px e 390 px sem rolagem horizontal da página. Suportar claro **e** escuro: `@media (prefers-color-scheme: dark)` com `:root:not([data-theme="light"])` e
  `:root[data-theme="dark"]` (o botão `d.botaoTema` grava `data-theme` no `<html>`; veja `src/assets/tema.js` e o início de `src/assets/estilo.css` como exemplo de tokens).
- Idiomas: a mesma página sai nos 11 idiomas; **todo texto vem de `d.t('chave')`** (chaves que já existem em `src/i18n.mjs`; não crie chaves novas, não escreva texto fixo em português/inglês).
  Só nomes próprios e números ficam fixos. `ar` é RTL (`<html dir="rtl">`): use propriedades lógicas (`margin-inline-start`, `inset-inline-end`, `text-align: start`) em vez de left/right.
  Textos longos (zh, ja, ru, hi, ar, bn) precisam caber: nada de largura fixa em texto.
- Acessível: hierarquia de títulos (um `<h1>`), foco visível, contraste suficiente, `aria-label` nos controles só de ícone, `aria-pressed`/`aria-current` onde couber.
- Preços sempre via `m.precoEntrada` / `m.precoSaida` (já vêm como `<span data-usd=...>`; o `moeda.js` troca a moeda). Não formate preço na mão.

## Conteúdo obrigatório (o mesmo do Padrão)

- **Topo:** marca `d.nomeSite` (link para `d.homePadrao`), `v{d.versao}`, menu `d.menu` (ranking/gráficos/comparar/metodologia, links do Padrão), `d.moeda`, seletor de idioma
  (`d.idiomas`: `href` leva à mesma página nesse idioma, `curto` é o rótulo, `atual` marca o idioma corrente), **seletor de visual `d.seletor`** (HTML pronto) e `d.botaoTema`.
- **Título** `d.h1` + introdução `d.intro` (HTML pronto, com o link da metodologia).
- **Pódio** `d.podio` (até 4 destaques: 1º lugar, custo-benefício, melhor aberto, melhor no Arena), cada um com `rotulo`, `m` (ficha do modelo) e `valor` (HTML).
- **Todos os 88 modelos** de `d.ranking` (ordem do ranking), cada um com nome (link `m.url` para a página do modelo), empresa, posição, nota geral, selo de modelo aberto (`d.t('selo.aberto')`)
  quando `m.aberto`, preço de entrada/saída (por 1M de tokens: `d.t('por1m')`), contexto, lançamento, e as notas por categoria (`m.cats`).
- **Categorias** `d.cats` (id, nome): ao escolher uma, o visual destaca a nota dessa categoria e (com JS) reordena por ela. Sem JS basta mostrar as notas.
- **Filtros** (com JS): busca por texto (`m.busca` já vem escapado para atributo; compare em minúsculas), empresa (`d.empresas`), aberto/fechado, e limite de quantidade se fizer sentido. Rótulos: `d.t('filtro.busca')`,
  `d.t('filtro.empresas')`, `d.t('tipo.todos')`, `d.t('tipo.abertos')`, `d.t('tipo.fechados')`, `d.t('cat.todas')`, `d.t('todos')`... (veja as chaves `filtro.*`, `tipo.*`, `cat.*`, `th.*`, `podio.*` em `src/i18n.mjs`).
  Use `d.nf`/`d.esc` e escape (`esc`) em todo texto vindo dos dados que não seja HTML pronto.
- **Outros modelos** (`d.outros`: `n`, `texto`, `lista`): seção recolhível ou rodapé da lista, com o texto `d.outros.texto` e cada modelo linkado.
- **Rodapé:** `d.rodape` (HTML pronto: fontes, câmbio, versão, link do GitHub, "Netlify"). Obrigatório inteiro.
- Link visível "voltar ao Padrão" (o seletor `d.seletor` já faz isso, mas deixe claro).

## Forma de `d` (montado em `scripts/gerar.mjs`, bloco "visuais alternativos")

```
d.idioma {codigo, pasta, dir?, ...}   d.t(chave, vars)   d.pre ('' ou '/en')   d.versao   d.esc   d.nf(v, casas)   d.data(iso)
d.tema ('instagram'|'lens'|'apple')   d.nomeSite   d.logo (SVG da marca RankingIA, pode usar)   d.total (88)   d.homePadrao
d.h1  d.intro(html)  d.menu [{href, rotulo, chave}]  d.moeda(html)  d.botaoTema(html, class="botao-tema" id="tema")  d.seletor(html)  d.idiomas [{codigo, nome, curto, href, atual}]
d.podio [{rotulo, m, valor(html)}]
d.cats [{id, nome, metricas}]    d.empresas [string]
d.ranking [m]    m = { pos, slug, nome, empresa, aberto, url, nota, notaTxt, pareto, precoEntrada(html), precoSaida(html), contexto(txt), lancamento(txt),
                       velocidade(txt|null), elo(num|null), cats [{id, nome, nota|null, notaTxt, pos|null}], busca(escapado) }
d.outros { n, texto, lista [{nome, empresa, url, elo|null, aberto, busca}] }
d.rodape(html)
```

## Como testar

```
RK_PUBLIC="$TEMP/rk-<id>" node scripts/gerar.mjs      # gera o site inteiro numa pasta só sua (leva alguns segundos); no PowerShell: $env:RK_PUBLIC="$env:TEMP\rk-<id>"
RK_PUBLIC="$TEMP/rk-<id>" node scripts/testar.mjs     # confere o site gerado (inclui as regras dos visuais)
```

Sirva a pasta com um servidor estático seu (porta própria, em segundo plano) que mande a CSP do `netlify.toml` (`default-src 'none'; style-src 'self'; script-src 'self'; img-src 'self' data:; connect-src 'self'`) —
assim o navegador acusa qualquer violação. Confira com Playwright (emprestado de `V:\DEV\FluxDiag\node_modules\playwright`, `import('file:///V:/DEV/FluxDiag/node_modules/playwright/index.mjs')`) em **1280 px e 390 px,
claro e escuro**, em **pt, en e ar (RTL)** e ao menos mais um idioma de texto longo (ja ou ru): tire capturas, **olhe cada uma**, corrija o que estiver quebrado ou feio. Zero erros de console, zero rolagem horizontal.
Pare o servidor ao terminar. Scripts e capturas temporários ficam em `%TEMP%`, nunca dentro do projeto.

## Ao terminar

Responda com: arquivos entregues, a ideia do layout em 2-3 linhas, o resultado do `testar.mjs`, e limitações.

---

# Skin: o visual nas demais páginas do Padrão

Além da inicial (`modelo.mjs`), cada visual entrega **`modelos/<id>/skin.css`**: veste as páginas do Padrão (`/modelo/<slug>.html`, `/graficos.html`, `/comparar.html`, `/metodologia.html`, `/404.html`, em todos os idiomas) quando o visitante escolheu esse visual. Não há HTML novo: `src/assets/visual-cedo.js` (no `<head>`) lê a escolha salva, põe `data-visual="<id>"` no `<html>` e liga `/<id>/skin.css` (`<link>` próprio, não o `estilo.css` da inicial).

Regras:
- **Só CSS, só `modelos/<id>/skin.css`.** Não mude o HTML do Padrão nem `src/assets/estilo.css`. Leia `src/assets/estilo.css` inteiro e as páginas geradas (cabeçalho `.topo`, `.menu`, `.moeda`, `.idiomas`, `.visuais`, `.tema`, `.intro`, `.cartao`, `.tabela`, `.chip`, `.filtros`, `.fichas`, `.placar`, `.grafico`, `.seletor`, `.texto`, `.rodape`...) para ver o que existe.
- **Todo seletor começa por `html[data-visual="<id>"]`** (o `testar` rejeita regra fora disso, e `@import`/`url(http...)`). Isso garante que o Padrão não muda. Dentro de `@media`, vale a mesma regra.
- Comece trocando os **tokens** (`--fundo`, `--superficie`, `--superficie-2`, `--borda`, `--texto`, `--texto-2`, `--texto-3`, `--destaque`, `--destaque-texto`, `--destaque-fundo`, `--barra`, `--barra-fundo`, `--ouro`, `--bom`, `--aviso`, `--serie-1..8`, `--grade`, `--sombra`) em `html[data-visual="<id>"]`: os gráficos (Chart.js) leem `--serie-N`, `--grade`, `--texto*` em tempo de execução, então precisam de contraste nos dois temas. Depois ajuste forma (raios, sombras, espaçamento, tipografia de sistema), cabeçalho e navegação, cartões, tabelas, chips e botões para lembrar o visual da inicial. Mesma paleta e mesmo "clima" da inicial.
- Escuro: o Padrão usa `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {...} }` e `:root[data-theme="dark"] {...}`. Sua versão escura precisa de especificidade maior: `html[data-visual="<id>"]:not([data-theme="light"])` dentro do `@media (prefers-color-scheme: dark)` e `html[data-visual="<id>"][data-theme="dark"]` fora dele.
- Não esconda conteúdo, não mude a ordem lógica, não reduza contraste, não remova o foco visível. Cabeçalho não pode estourar em 390 px (o seletor `.visuais` desce para linha própria no celular: mantenha). RTL (`ar`): propriedades lógicas.
- Sem imagem/fonte externa. Não mexa nos `.js`.
- Teste: `RK_PUBLIC="$TEMP/rk-<id>" node scripts/gerar.mjs` e `testar.mjs`; sirva com CSP (como acima) e, no Playwright, antes de abrir a página faça `localStorage.setItem('visual','<id>')` (via `addInitScript`) para ver o skin. Confira as 5 páginas (um modelo com gráfico de família, graficos, comparar com 2–3 modelos escolhidos pelo link `?m=` do próprio site — veja `src/assets/comparar.js` —, metodologia e 404) em 1280 e 390 px, claro e escuro, pt/en/ar/ja. Olhe as capturas, corrija. Zero erro de console, zero rolagem horizontal da página.
