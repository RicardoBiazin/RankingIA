// Confere um arquivo de idioma extra (src/idiomas/<codigo>.mjs) contra o português/inglês:
// mesmas chaves, mesmos {marcadores}, mesmas tags HTML e mesmo esqueleto da metodologia.
// Uso: node scripts/validar-idioma.mjs <codigo> [<codigo>...]

import { pathToFileURL } from 'node:url';
import { caminho } from './util.mjs';
import { TEXTOS } from '../src/i18n.mjs';
import { METODOLOGIA, METODOLOGIA_TITULO, STATUS_CAB } from '../src/metodologia.mjs';

const marcas = (x) => [...x.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
const tags = (x) => (x.match(/<\/?[a-z][a-z0-9]*/gi) ?? []).join('').toLowerCase();
const CJK = new Set(['ja', 'zh', 'ko']);
let falhas = 0;
const erro = (cod, msg) => { console.log(`FALHA ${cod}: ${msg}`); falhas++; };

for (const cod of process.argv.slice(2)) {
  let mod;
  try { mod = (await import(pathToFileURL(caminho(`src/idiomas/${cod}.mjs`)).href)).default; } catch (e) { erro(cod, `não carregou: ${e.message}`); continue; }
  const antes = falhas;
  const { t, metodologia, titulo, status } = mod ?? {};
  if (!t || typeof metodologia !== 'function' || !Array.isArray(titulo) || titulo.length !== 2 || !Array.isArray(status) || status.length !== 8) { erro(cod, 'export default precisa de { t, metodologia, titulo[2], status[8] }'); continue; }

  const faltam = Object.keys(TEXTOS).filter((k) => !(k in t));
  const sobram = Object.keys(t).filter((k) => !(k in TEXTOS));
  if (faltam.length) erro(cod, `${faltam.length} chaves faltando: ${faltam.slice(0, 8).join(' ')}`);
  if (sobram.length) erro(cod, `chaves que não existem: ${sobram.slice(0, 8).join(' ')}`);
  for (const [k, v] of Object.entries(t)) {
    if (!(k in TEXTOS)) continue;
    const en = TEXTOS[k][1];
    if (typeof v !== 'string' || !v.trim()) { erro(cod, `${k}: vazio`); continue; }
    if (marcas(v) !== marcas(en)) erro(cod, `${k}: marcadores {..} diferentes de "${en}" (${marcas(en)}) -> (${marcas(v)})`);
    if (tags(v) !== tags(en)) erro(cod, `${k}: tags HTML diferentes do inglês`);
  }
  // SEO da página inicial: title até 60 caracteres, description 140–160 (CJK dispensado).
  const tit = [...(t['idx.titulo'] ?? '')].length;
  const desc = [...(t['idx.desc'] ?? '').replace('{n}', '87')].length;
  if (tit > 60) erro(cod, `idx.titulo com ${tit} caracteres (máx. 60)`);
  if (!CJK.has(cod) && (desc < 140 || desc > 160)) erro(cod, `idx.desc com ${desc} caracteres com n=87 (precisa de 140 a 160)`);

  // Metodologia: mesmo esqueleto do inglês.
  const c = { exige: 'X', pesos: '<table></table>', cats: '<ul></ul>', status: '<table></table>', aa: true, neutro: '1' };
  let html = '', ref = '';
  try { html = metodologia(c); ref = METODOLOGIA.en(c); } catch (e) { erro(cod, `metodologia() quebrou: ${e.message}`); continue; }
  const conta = (h, re) => (h.match(re) ?? []).length;
  for (const [nome, re] of [['h1', /<h1[\s>]/g], ['h2', /<h2[\s>]/g], ['p', /<p[\s>]/g], ['ul', /<ul[\s>]/g], ['ol', /<ol[\s>]/g], ['li', /<li[\s>]/g], ['a', /<a\s/g], ['strong', /<strong>/g]]) {
    if (conta(html, re) !== conta(ref, re)) erro(cod, `metodologia: ${conta(html, re)} <${nome}> em vez de ${conta(ref, re)}`);
  }
  const urls = (h) => [...h.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).sort().join('|');
  if (urls(html) !== urls(ref)) erro(cod, 'metodologia: os links (href) não batem com os do inglês');
  if (/\$\{|undefined/.test(html)) erro(cod, 'metodologia: sobrou ${...} ou undefined');
  if (!html.includes('<table></table>') || !html.includes('<ul></ul>')) erro(cod, 'metodologia: faltam as partes montadas (${c.pesos}, ${c.cats}, ${c.status})');
  if (titulo.some((x) => typeof x !== 'string' || !x.trim())) erro(cod, 'titulo vazio');
  if (METODOLOGIA_TITULO.en.length !== titulo.length) erro(cod, 'titulo precisa de 2 textos');
  if (status.some((x) => typeof x !== 'string' || !x.trim()) || STATUS_CAB.en.length !== status.length) erro(cod, 'status precisa de 8 textos');
  if (falhas === antes) console.log(`ok    ${cod}: ${Object.keys(t).length} textos, metodologia, título e status`);
}
process.exit(falhas ? 1 : 0);
