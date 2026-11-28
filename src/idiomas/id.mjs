// Indonesian. Gerado a partir de pt/en; validar com: node scripts/validar-idioma.mjs id
const L = (url, nome) => `<a href="${url}" rel="noopener">${nome}</a>`;
const LB = L('https://livebench.ai/', 'LiveBench');
const LA = L('https://arena.ai/leaderboard', 'LMArena (arena.ai)');
const OR = L('https://openrouter.ai/models', 'OpenRouter');
const AA = L('https://artificialanalysis.ai/', 'Artificial Analysis');
const FR = L('https://frankfurter.dev/', 'Frankfurter');
const GH = L('https://github.com/RicardoBiazin/RankingIA', 'github.com/RicardoBiazin/RankingIA');
const ISSUE = (txt) => L('https://github.com/RicardoBiazin/RankingIA/issues', txt);

export default {
  t: {
    'nav.ranking': 'Peringkat',
    'nav.graficos': 'Grafik',
    'nav.comparar': 'Bandingkan',
    'nav.metodologia': 'Metodologi',
    'nav.principal': 'Utama',
    'versao.titulo': 'Versi situs',
    'tema.titulo': 'Ganti tema terang/gelap',
    'visual.rotulo': 'Tampilan',
    'visual.titulo': 'Pilih tampilan halaman utama',
    'visual.padrao': 'Standar',
    'moeda.titulo': 'Mata uang harga',
    'idioma.titulo': 'Bahasa',
    'rodape.dados': 'Data',
    'rodape.release': 'rilis {d}',
    'rodape.placar': 'papan peringkat {d}',
    'rodape.atualizado': 'Diperbarui {d}.',
    'rodape.aa': 'Indeks, harga, dan kecepatan dari {l}.',
    'rodape.cambio': 'Kurs referensi ECB ({l}) pada {d}: {lista}. Harga aslinya dalam dolar AS.',
    'rodape.falha': '{f} tidak merespons pada pengambilan data terakhir; menampilkan data {d}',
    'rodape.feito': 'dibuat oleh',
    'rodape.codigo': 'sumber terbuka (MIT)',
    'rodape.conduta': 'kode etik',
    'rodape.como': 'cara skor dihitung',
    'rodape.autonomo': 'Pengumpulan data dan hasil di situs ini dihasilkan secara otomatis setiap hari oleh perangkat lunak, tanpa penyuntingan skor secara manual.',
    'fam.titulo': 'Riwayat keluarga model',
    'fam.texto': '{n} versi dalam keluarga ini, dari yang pertama hingga terbaru, menurut tanggal rilis. Klik titik untuk membuka versinya.',
    'js.familiaNota': 'Skor RankingIA',
    'js.familiaElo': 'Elo Arena (teks)',
    'js.familiaAA': 'Indeks Kecerdasan AA',
    'pos': '#{n}',
    'ctx.mil': '{n} rb',
    'ctx.mi': '{n} jt',
    'gratis': 'gratis',
    'ate': 'hingga {p} / 1M',
    'idx.titulo': 'Peringkat model AI (LLM) · RankingIA',
    'idx.desc': 'Peringkat {n} model AI dengan skor dari LiveBench, LMArena, dan Artificial Analysis serta harga OpenRouter. Bandingkan GPT, Claude, Gemini, DeepSeek, dan Qwen.',
    'idx.h1': 'Peringkat model AI',
    'idx.intro': 'Skor 0–100 yang menggabungkan benchmark publik ({fontes}) dan menunjukkan biaya tiap model. Skor ini menyatakan berapa % model berperingkat yang dikalahkan model ini, sebagai rata-rata tertimbang. {l}.',
    'idx.como': 'Cara kami menghitung',
    'podio.primeiro': 'Peringkat 1 keseluruhan',
    'podio.custo': 'Paling bernilai',
    'podio.aberto': 'Model bobot terbuka terbaik',
    'podio.arena': 'Favorit pengguna (Arena)',
    'nota.n': 'Skor {n}',
    'por1m': 'per 1M',
    'lugar': 'posisi {p}',
    'filtro.busca': 'Cari model atau perusahaan',
    'filtro.empresas': 'Semua perusahaan',
    'filtro.empresa': 'Perusahaan',
    'filtro.tipo': 'Jenis',
    'tipo.todos': 'Terbuka dan tertutup',
    'tipo.abertos': 'Hanya bobot terbuka',
    'tipo.fechados': 'Hanya tertutup',
    'filtro.preco': 'Harga input',
    'preco.qualquer': 'Harga berapa pun',
    'mostrar': 'Tampilkan',
    'mostrar.titulo': 'Jumlah model yang ditampilkan di setiap tabel',
    'todos': 'Semua',
    'categoria': 'Kategori',
    'cat.todas': 'Semua',
    'th.posicao': 'Posisi',
    'th.modelo': 'Model',
    'th.nota': 'Skor',
    'th.nota.titulo': 'Skor RankingIA keseluruhan (0–100)',
    'th.notaCat': 'Skor {c}',
    'th.notaCat.titulo': 'Skor {c} (0–100): rata-rata persentil {m}',
    'th.entrada': 'Input',
    'th.entrada.titulo': 'Harga per 1 juta token input',
    'th.saida': 'Output',
    'th.saida.titulo': 'Harga per 1 juta token output',
    'th.contexto': 'Konteks',
    'th.contexto.titulo': 'Jendela konteks dalam token',
    'th.lancado': 'Rilis',
    'th.lancado.titulo': 'Tanggal rilis',
    'th.comparar': 'Bandingkan',
    'caption.ranking': 'Peringkat keseluruhan: {n} model dengan benchmark objektif',
    'selo.aberto': 'terbuka',
    'selo.aberto.titulo': 'Bobot terbuka',
    'outros.h2': 'Model lainnya (hanya preferensi manusia)',
    'outros.texto': '{n} model ini belum punya benchmark objektif ({fontes}), sehingga tidak mendapat skor. Urutannya menurut Elo LMArena; filter dan jumlah baris yang sama berlaku di sini.',
    'ou': 'atau',
    'comparar.aria': 'Bandingkan {m}',
    'limpar': 'hapus',
    'mod.titulo': '{m} — skor, benchmark, dan harga | RankingIA',
    'mod.desc': '{m} menempati {pos} di RankingIA dengan skor {n}. Lihat skor per sumber dan kategori, harga ({p} per 1M token), serta konteksnya.',
    'mod.descParcial': '{m}: Elo LMArena {e}, harga {p} per 1M token, dan konteks {c}.',
    'mod.empresaNA': 'Perusahaan tidak diketahui',
    'mod.fora': 'Tanpa skor: belum ada benchmark objektif',
    'mod.posDe': '{pos} dari {n} secara keseluruhan',
    'mod.entradaSaida': 'Input / output',
    'mod.por1mTokens': '{s} per 1M token',
    'mod.tokens': 'token',
    'mod.lancamento': 'Rilis',
    'mod.lancamentoFonte': 'tanggal rilis',
    'mod.pesos': 'Bobot',
    'mod.abertos': 'Terbuka',
    'mod.fechados': 'Tertutup',
    'mod.velocidade': 'Kecepatan',
    'mod.ttft': 'token pertama dalam {s} dtk',
    'mod.notasFonte': 'Skor per sumber',
    'mod.percentilExpl': 'persentil = % model berperingkat yang dikalahkannya',
    'mod.metrica': 'Metrik',
    'mod.valor': 'Nilai',
    'mod.percentil': 'Persentil',
    'mod.fonte': 'Sumber',
    'mod.peso': 'bobot {p}',
    'mod.peso.titulo': 'Dihitung dalam skor dengan bobot {p}',
    'mod.porCategoria': 'Per kategori',
    'mod.posicao': 'Posisi',
    'mod.metricas': 'Metrik',
    'mod.evolucao': 'Riwayat',
    'mod.evolucao.texto': 'Skor RankingIA pada setiap hari pengumpulan data (arahkan kursor untuk melihat posisinya).',
    'mod.evolucao.aria': 'Riwayat skor {m}',
    'mod.evolucao.espera': 'Pengumpulan data harian dimulai pada {d}. Grafik muncul mulai hari kedua model ini masuk peringkat.',
    'mod.compararOutros': 'Bandingkan dengan model lain',
    'mod.nasFontes': 'Di sumber data',
    'mod.hf': 'Hugging Face (bobot)',
    'gr.titulo': 'Grafik — kualitas vs. harga model AI | RankingIA',
    'gr.desc': 'Grafik kualitas vs. harga, preferensi manusia vs. harga, dan perkembangan model AI (LLM).',
    'gr.h1': 'Grafik',
    'gr.intro': 'Arahkan kursor (atau ketuk) pada sebuah titik untuk melihat modelnya. Klik titik untuk membuka halamannya. Harga adalah campuran input/output 3:1 per juta token, dalam skala logaritmik.',
    'gr.verDados': 'Lihat data dalam bentuk tabel',
    'gr.notaPreco': 'Skor RankingIA vs. harga',
    'gr.notaPreco.texto': 'Makin tinggi dan makin ke kiri, makin bernilai.',
    'gr.arenaPreco': 'Preferensi manusia (Arena) vs. harga',
    'gr.arenaPreco.texto': 'Elo teks LMArena; termasuk model di luar peringkat keseluruhan.',
    'gr.velocidade': 'Skor RankingIA vs. kecepatan',
    'gr.velocidade.texto': 'Token per detik yang diukur oleh Artificial Analysis.',
    'gr.fronteira': 'Perkembangan AI',
    'gr.fronteira.texto': 'Setiap titik adalah model berperingkat pada tanggal rilisnya. Garis menunjukkan skor terbaik yang pernah dirilis hingga tiap tanggal, untuk bobot tertutup dan terbuka.',
    'gr.livebench': 'LiveBench dari waktu ke waktu',
    'gr.livebench.texto': 'Skor keseluruhan LiveBench 2.0 pada setiap rilis, untuk 8 model teratas.',
    'gr.historico': 'Skor RankingIA dari waktu ke waktu',
    'gr.historico.texto': 'Skor harian 8 model teratas sejak situs mulai mengumpulkan data.',
    'cmp.titulo': 'Bandingkan model AI berdampingan | RankingIA',
    'cmp.desc': 'Pilih hingga 4 model AI dan bandingkan skor, benchmark, Elo LMArena, harga, dan konteks secara berdampingan.',
    'cmp.h1': 'Bandingkan model',
    'cmp.intro': 'Pilih 2 hingga 4 model. Alamat halaman menyimpan pilihan Anda, jadi tautannya bisa dibagikan.',
    'cmp.escolha': 'Pilihan model',
    'cmp.modeloN': 'Model {i}',
    'cmp.opcional': '(opsional)',
    'cmp.tabela': 'Tabel perbandingan',
    'cmp.escolhaAcima': 'Pilih model di atas.',
    'cmp.perfil': 'Profil per kategori',
    'cmp.perfil.texto': 'Persentil pada setiap metrik (100 = terbaik di peringkat).',
    'cmp.radar.aria': 'Radar dengan persentil setiap model per metrik',
    'e404.titulo': 'Halaman tidak ditemukan | RankingIA',
    'e404.desc': 'Halaman tidak ditemukan di RankingIA. Kembali ke peringkat model AI untuk melihat skor, harga, dan perbandingan.',
    'e404.h1': 'Halaman tidak ditemukan',
    'e404.texto': 'Nama model mungkin berubah di salah satu sumber data.',
    'e404.voltar': 'Kembali ke peringkat',
    'js.n': '{n} model',
    'js.n1': '1 model',
    'js.parcial': '{a} dari {b}',
    'js.total': '(dari {t})',
    'js.maisUm': '(pilih satu lagi)',
    'js.notaRankingIA': 'Skor RankingIA',
    'js.entrada': 'Input ({s}/1M)',
    'js.saida': 'Output ({s}/1M)',
    'js.velocidade': 'Kecepatan (tok/s)',
    'js.fora': 'tanpa peringkat',
    'js.rankingGeral': 'Peringkat keseluruhan',
    'js.outros': 'Model lainnya',
    'js.abertos': 'terbuka',
    'js.fechados': 'tertutup',
    'js.erroDados': 'Data tidak dapat dimuat ({e}).',
    'js.pesosFechados': 'Bobot tertutup',
    'js.pesosAbertos': 'Bobot terbuka',
    'js.modelos': 'Model',
    'js.precoMedio': 'Harga campuran ({s} / 1M token, skala log)',
    'js.eloTexto': 'Elo LMArena (teks)',
    'js.tokSeg': 'Token per detik',
    'js.lbGeral': 'Skor keseluruhan LiveBench (%)',
    'js.nota': 'skor {n}',
    'js.lancadoEm': 'dirilis {d}',
    'js.recorde': 'rekor baru pada {d}',
    'js.melhorHoje': 'terbaik hingga kini',
    'js.melhorFechado': 'Tertutup terbaik',
    'js.melhorAberto': 'Terbuka terbaik',
    'js.modelosFechados': 'Model tertutup',
    'js.modelosAbertos': 'Model terbuka',
    'js.modelo': 'Model',
    'js.precoMedioCurto': 'Harga campuran / 1M',
    'js.data': 'Tanggal',
    'js.recordista': 'Pemegang rekor',
    'js.tipo': 'Jenis',
    'js.fechado': 'tertutup',
    'js.aberto': 'terbuka',
    'js.umRelease': 'LiveBench 2.0 baru punya satu rilis.',
    'js.histEspera': 'Pengumpulan data harian dimulai pada {d}. Grafik muncul mulai hari kedua.',
    'js.erroGraficos': 'Data grafik tidak dapat dimuat ({e}).',
    'met.lb_geral': 'LiveBench',
    'met.lb_geral.desc': 'Skor keseluruhan LiveBench 2.0 (tugas panjang tanpa kontaminasi), dengan bobot dari LiveBench sendiri.',
    'met.aa_inteligencia': 'Indeks Kecerdasan AA',
    'met.aa_inteligencia.curto': 'Intel. AA',
    'met.aa_inteligencia.desc': 'Artificial Analysis Intelligence Index.',
    'met.arena_texto': 'Arena teks (Elo)',
    'met.arena_texto.curto': 'Arena',
    'met.arena_texto.desc': 'Preferensi manusia dalam percakapan teks (LMArena).',
    'met.arena_webdev': 'Arena WebDev (Elo)',
    'met.arena_webdev.curto': 'WebDev',
    'met.arena_webdev.desc': 'Preferensi manusia dalam membuat halaman dan aplikasi web (LMArena).',
    'met.arena_visao': 'Arena visi (Elo)',
    'met.arena_visao.curto': 'Visi',
    'met.arena_visao.desc': 'Preferensi manusia pada tugas gambar (LMArena).',
    'met.lb': 'LiveBench {c}',
    'met.lb.curto': 'LB {c}',
    'met.lb.desc': 'Kategori "{c}" LiveBench 2.0.',
    'lb.lb_agentico': 'agentik panjang',
    'lb.lb_raciocinio': 'penalaran',
    'lb.lb_codigo': 'pemrograman',
    'lb.lb_navegador': 'peramban',
    'lb.lb_dados': 'analisis data',
    'lb.lb_pesquisa': 'riset',
    'lb.lb_design': 'desain',
    'lb.lb_matematica': 'matematika',
    'lb.lb_linguagem': 'bahasa',
    'cat.agentico': 'Agentik',
    'cat.codigo': 'Pemrograman',
    'cat.raciocinio': 'Penalaran',
    'cat.dados': 'Analisis data',
    'cat.pesquisa': 'Riset',
    'cat.design': 'Desain',
    'cat.navegador': 'Penggunaan peramban',
    'cat.conversa': 'Obrolan',
    'cat.visao': 'Visi',
    'met.aa_financas': 'Indeks AA Keuangan & Akuntansi',
    'met.aa_financas.curto': 'AA Keuangan',
    'met.aa_financas.desc': 'Artificial Analysis Finance & Accounting Index: evaluasi pekerjaan berbasis pengetahuan di bidang keuangan.',
    'met.aa_estrategia': 'Indeks AA Strategi & Operasi',
    'met.aa_estrategia.curto': 'AA Strategi',
    'met.aa_estrategia.desc': 'Artificial Analysis Strategy & Ops Index: evaluasi strategi dan operasi bisnis.',
    'met.aa_juridico': 'Indeks AA Hukum',
    'met.aa_juridico.curto': 'AA Hukum',
    'met.aa_juridico.desc': 'Artificial Analysis Legal Index: evaluasi pekerjaan hukum.',
    'met.aa_saude': 'Indeks AA Kesehatan & Medis',
    'met.aa_saude.curto': 'AA Kesehatan',
    'met.aa_saude.desc': 'Artificial Analysis Healthcare & Medical Index: evaluasi bidang kesehatan dan medis.',
    'met.aa_engenharia': 'Indeks AA Teknik',
    'met.aa_engenharia.curto': 'AA Teknik',
    'met.aa_engenharia.desc': 'Artificial Analysis Engineering Index: evaluasi teknik, sains, dan pemrograman agentik.',
    'met.aa_economia': 'Indeks AA Ekonomi',
    'met.aa_economia.curto': 'AA Ekonomi',
    'met.aa_economia.desc': 'Artificial Analysis Economics Index: evaluasi ekonomi.',
    'cat.financas': 'Keuangan',
    'cat.estrategia': 'Strategi & operasi',
    'cat.juridico': 'Hukum',
    'cat.saude': 'Kesehatan',
    'cat.engenharia': 'Teknik',
    'cat.economia': 'Ekonomi',
    'mod.custoTarefa': 'Biaya per tugas',
    'mod.custoTarefa.nota': 'rata-rata pada indeks AA; menjalankan seluruh indeks menghabiskan {s}',
    'mod.tempo': 'Waktu respons',
    'mod.tempo.nota': 'median, dari permintaan hingga token terakhir (AA)',
    'mod.pareto': 'Frontier Pareto',
    'mod.pareto.sim': 'Ya',
    'mod.pareto.nao': 'Tidak',
    'mod.pareto.nota': 'ya = tidak ada model yang sekaligus lebih murah dan berskor lebih tinggi (skor × harga campuran)',
    'js.pareto': 'Frontier Pareto',
  },

  metodologia: (c) => `<h1>Metodologi</h1>
<p>RankingIA tidak menjalankan pengujian sendiri. Situs ini menggabungkan papan peringkat publik yang mengukur hal-hal berbeda dan menampilkannya di satu tempat, bersama harga dan konteks. Data dikumpulkan sekali sehari.</p>
<h2>Sumber</h2>
<ul>
<li>${LB}: benchmark objektif dengan soal baru di setiap rilis untuk menghindari kontaminasi. Kami memakai skor keseluruhan LiveBench 2.0 dan setiap kategorinya.</li>
<li>${LA}: orang membandingkan dua jawaban anonim lalu memberi suara; hasilnya menjadi peringkat Elo. Kami memakai arena teks, WebDev, dan visi. Jika sebuah model punya beberapa mode ("High", "Max"), Elo terbaik yang dipakai.</li>
<li>${OR}: harga per juta token, jendela konteks, tanggal rilis, dan apakah bobotnya terbuka.</li>
<li>${AA}: Intelligence Index, ditambah harga dan kecepatan (endpoint gratis API V2). ${c.aa ? 'Sudah dipakai.' : 'Belum dipakai.'}</li>
<li>${FR}: kurs referensi Bank Sentral Eropa, untuk menampilkan harga dalam mata uang lain.</li>
</ul>
<h2>Skor RankingIA</h2>
<ol>
<li>Peringkat keseluruhan mencakup model dengan setidaknya satu benchmark objektif (${c.exige}). Sisanya muncul di "model lainnya", tanpa skor.</li>
<li>Untuk setiap metrik kami menghitung <strong>persentil</strong>: persentase model berperingkat yang dikalahkan model ini (hasil seri dihitung setengah). Dengan begitu, peringkat Elo dan akurasi berada pada skala 0–100 yang sama.</li>
<li>Skor adalah rata-rata tertimbang dari persentil yang dimiliki model. Metrik yang tidak ada tidak dihitung, baik menguntungkan maupun merugikan.</li>
<li>Agar model dengan bukti sedikit tidak melonjak ke puncak hanya dengan satu metrik, rata-rata diberi bobot tambahan ${c.neutro} pada persentil 50.</li>
</ol>
${c.pesos}
<h2>Kategori</h2>
<p>Setiap kategori punya skor sendiri: rata-rata persentil metriknya, dengan penyesuaian yang sama. Kategori dan metriknya:</p>
${c.cats}
<h2>Riwayat setiap model</h2>
<p>Model dalam satu keluarga (misalnya Claude Opus 3, 4, 4.5, dan 5.5) dikelompokkan menurut nama tanpa nomor versi. Halaman setiap model menampilkan seluruh keluarga berdasarkan urutan rilis.</p>
<h2>Nama model</h2>
<p>Setiap sumber menulis nama dengan cara berbeda ("Claude Opus 5.5 (High)", "anthropic/claude-opus-5.5"). Kami mencocokkannya dengan kunci tanpa perusahaan, tanggal, dan mode upaya; kasus yang tidak tertangkap aturan masuk ke daftar alias yang ditinjau manual. Jika ada model yang tampak ganda atau tertukar, ${ISSUE('buka issue')}.</p>
<h2>Indikator informatif</h2>
<p>Beberapa indikator muncul di halaman tetapi tidak dihitung dalam skor RankingIA:</p>
<ul>
<li>Indeks per bidang dari Artificial Analysis (keuangan, strategi dan operasi, hukum, kesehatan, teknik, dan ekonomi): indeks ini memakai ulang evaluasi indeks kecerdasan, sehingga menjumlahkannya berarti menghitung hal yang sama dua kali. Indeks ini menjadi kategori tersendiri.</li>
<li>Biaya per tugas dan biaya menjalankan seluruh indeks (Artificial Analysis): rata-rata biaya satu tugas indeks, dengan menghitung token penalaran dan jawaban. Model yang lebih banyak "berpikir" akhirnya lebih mahal daripada yang tersirat dari harga per token.</li>
<li>Waktu respons: median dari permintaan hingga token terakhir, diukur oleh Artificial Analysis.</li>
<li>Frontier Pareto: model yang tidak punya model lain yang sekaligus lebih murah dan berskor lebih tinggi, berdasarkan harga campuran (3 bagian input berbanding 1 bagian output). Ditampilkan sebagai garis putus-putus pada grafik skor × harga.</li>
</ul>
<h2>Keterbatasan</h2>
<ul>
<li>Persentil bergantung pada kelompok: saat model kuat masuk, model lain bisa turun tanpa menjadi lebih buruk.</li>
<li>Elo mengukur preferensi, bukan akurasi. Gaya dan panjang jawaban berpengaruh.</li>
<li>Harga berasal dari OpenRouter (yang terendah di antara penyedia); harga langsung dari pembuatnya bisa berbeda.</li>
</ul>
<h2>Referensi lain</h2>
<p>Situs-situs ini juga memantau model AI tetapi tidak termasuk dalam skor:</p>
<ul>
<li>${L('https://benchlm.ai/', 'BenchLM')}: mengagregasi ratusan benchmark. Ketentuannya mewajibkan perjanjian terpisah untuk menampilkan datanya di situs publik.</li>
<li>${L('https://hai.stanford.edu/ai-index', 'Stanford HAI — AI Index')}: laporan tahunan tentang keadaan AI; bukan papan peringkat per model yang diperbarui setiap hari.</li>
<li>${L('https://ia.com.br/melhores-ias', 'ia.com.br — Melhores IAs')}: peringkat berbahasa Portugis yang menayangkan ulang data Artificial Analysis, OpenRouter, dan Design Arena; tidak punya API, tidak menjelaskan cara skornya dihitung, tidak memberi lisensi untuk memakai ulang data, dan mengulang sumber yang sudah dibaca RankingIA secara langsung.</li>
<li>${L('https://www.designarena.ai/', 'Design Arena')}: Elo dari suara orang untuk situs web, aplikasi, gambar, dan video. robots.txt-nya melarang akses otomatis ke API dan tidak ada lisensi untuk memakai ulang datanya.</li>
<li>${L('https://swen.ia.br/ranking', 'SWEN.AI')}: peringkat berbahasa Portugis yang hanya memakai data Artificial Analysis, yang sudah dipakai RankingIA langsung dari sumbernya.</li>
</ul>
<h2>Status sumber</h2>
${c.status}
<p>Data setiap sumber adalah milik pemiliknya dan mengikuti ketentuan mereka. Kode RankingIA bersumber terbuka di bawah lisensi MIT di ${GH}.</p>`,

  titulo: ['Metodologi — cara skor RankingIA dihitung', 'Asal data RankingIA, cara LiveBench, LMArena, OpenRouter, dan Artificial Analysis digabung menjadi skor 0–100, serta keterbatasannya.'],

  status: ['Sumber', 'Pengambilan terakhir', 'Data per', 'Metrik', 'Bobot', 'Kategori', 'Metrik', 'gagal'],
};
