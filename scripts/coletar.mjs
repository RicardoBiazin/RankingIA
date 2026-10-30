// Coleta cada fonte e grava dados/brutos/<fonte>.json. Se uma fonte falhar, o
// arquivo anterior fica e dados/status.json registra o erro; o build segue.
// Uso: node scripts/coletar.mjs [fonte ...]

import { carregarEnv, gravarJSON, lerJSON } from './util.mjs';
import * as openrouter from './fontes/openrouter.mjs';
import * as livebench from './fontes/livebench.mjs';
import * as lmarena from './fontes/lmarena.mjs';
import * as artificialanalysis from './fontes/artificialanalysis.mjs';

carregarEnv();
const FONTES = [openrouter, livebench, lmarena, artificialanalysis];
const pedidas = process.argv.slice(2);
const status = lerJSON('dados/status.json', {});
let falhas = 0, tentadas = 0;

for (const f of FONTES) {
  if (pedidas.length && !pedidas.includes(f.ID)) continue;
  const antes = status[f.ID] ?? {};
  const tentativa = new Date().toISOString();
  if (f.PRECISA_CHAVE && !process.env[f.PRECISA_CHAVE]) {
    console.log(`--    ${f.ID}: sem ${f.PRECISA_CHAVE}, pulada`);
    status[f.ID] = { ...antes, ok: false, erro: `sem ${f.PRECISA_CHAVE}`, tentativa };
    continue;
  }
  tentadas++;
  const t0 = Date.now();
  try {
    const dados = await f.coletar();
    const coletadoEm = new Date().toISOString();
    gravarJSON(`dados/brutos/${f.ID}.json`, { fonte: f.ID, coletadoEm, ...dados });
    status[f.ID] = { ok: true, coletadoEm, tentativa: coletadoEm };
    console.log(`ok    ${f.ID} em ${((Date.now() - t0) / 1000).toFixed(1)} s`);
  } catch (e) {
    falhas++;
    status[f.ID] = { ...antes, ok: false, erro: String(e.message ?? e).slice(0, 300), tentativa };
    console.log(`FALHA ${f.ID}: ${e.message}${antes.coletadoEm ? ` (fica o snapshot de ${antes.coletadoEm})` : ''}`);
  }
}

gravarJSON('dados/status.json', status);
if (tentadas && falhas === tentadas) process.exit(1);
