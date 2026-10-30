// LMArena: Elo por voto humano (texto, webdev e visão), do dataset público
// lmarena-ai/leaderboard-dataset no Hugging Face. Vários modos do mesmo modelo
// ("(High)", "(Max)") viram uma chave só, com o melhor Elo.

import { asyncBufferFromUrl, parquetReadObjects } from 'hyparquet';
import { chave, empresa } from '../util.mjs';

export const ID = 'lmarena';
const ARENAS = { texto: 'text', webdev: 'webdev', visao: 'vision' };

export async function coletar() {
  const arenas = {};
  for (const [nome, config] of Object.entries(ARENAS)) {
    const url = `https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset/resolve/main/${config}/latest-00000-of-00001.parquet`;
    const file = await asyncBufferFromUrl({ url });
    const linhas = (await parquetReadObjects({ file })).filter((r) => r.category === 'overall');
    if (linhas.length < 10) throw new Error(`LMArena ${config}: só ${linhas.length} linhas`);
    const porChave = {};
    for (const r of linhas) {
      const k = chave(r.model_name);
      const elo = Number(r.rating);
      if (!porChave[k] || elo > porChave[k].elo) {
        porChave[k] = {
          origem: r.model_name, chave: k, elo: Math.round(elo), votos: Number(r.vote_count),
          empresa: empresa(r.organization), aberto: r.license ? !/proprietary/i.test(r.license) : null,
        };
      }
    }
    arenas[nome] = { data: linhas[0].leaderboard_publish_date, modelos: Object.values(porChave) };
  }
  return { arenas };
}
