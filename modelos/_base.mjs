// Peças comuns dos visuais alternativos (Instagram, Lens, Apple) da página inicial.
// O `d` que cada `render(d)` recebe é montado em scripts/gerar.mjs (veja modelos/CONTRATO.md).

import { esc } from '../scripts/util.mjs';
import { SITE, LOGO, SOL_LUA, beaconCloudflare } from '../src/layout.mjs';
import { TEMAS_ALTERNATIVOS } from '../src/temas.mjs';

export { esc, LOGO, SOL_LUA, TEMAS_ALTERNATIVOS };

/**
 * Abre o documento: `<!doctype html>`, `<html lang dir data-cambio>` e o `<head>` completo (noindex,
 * canonical apontando para a inicial do Padrão, textos do navegador, tema claro/escuro, moeda,
 * CSS do visual). Quem chama escreve `<body>...</body></html>` em seguida.
 * `id` = pasta do visual (instagram, lens, apple).
 */
export function head(id, d, { titulo, descricao } = {}) {
  const { idioma, t, versao } = d;
  const tit = titulo ?? t('idx.titulo');
  const desc = descricao ?? t('idx.desc', { n: d.total });
  return `<!doctype html>
<html lang="${idioma.codigo}"${idioma.dir ? ` dir="${idioma.dir}"` : ''}${d.cambio ? ` data-cambio="${esc(JSON.stringify(d.cambio))}"` : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tit)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${SITE}${d.pre}/">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/${id}/estilo.css?v=${versao}">
<script src="/assets/t-${idioma.pasta || 'pt'}.js?v=${versao}"></script>
<script src="/assets/tema.js?v=${versao}"></script>
<script src="/assets/moeda.js?v=${versao}"></script>
</head>`;
}

/** Scripts do fim do `<body>`: seletor de visual (obrigatório), os do visual (`/<id>/filtro.js`) e o beacon do Cloudflare Web Analytics (se houver token). */
export function scripts(id, d, arquivos = ['filtro.js']) {
  return [`<script src="/assets/visual.js?v=${d.versao}"></script>`, ...arquivos.map((a) => `<script src="/${id}/${a}?v=${d.versao}" defer></script>`), beaconCloudflare().trim()].filter(Boolean).join('\n');
}

/** Visuais alternativos que existem (pasta com modelo.mjs), na ordem de src/temas.mjs. */
export async function carregarModelos() {
  const saida = {};
  for (const x of TEMAS_ALTERNATIVOS) saida[x.id] = await import(`./${x.id}/modelo.mjs`);
  return saida;
}
