<div align="center">

# 🌌 Stellarum
### Portal Eksplorasi Astronomi & Tata Surya

![Status](https://img.shields.io/badge/status-in%20development-22D3EE?style=flat-square)
![Design Tool](https://img.shields.io/badge/design-Google%20Stitch-22D3EE?style=flat-square)
![Language](https://img.shields.io/badge/lang-Bahasa%20Indonesia-22D3EE?style=flat-square)

</div>

---

## 📖 Tentang Project

Website edukasi astronomi interaktif yang mengajak pengunjung menjelajahi Tata Surya, galaksi, dan objek-objek langit lainnya — mulai dari planet, satelit alami, asteroid, komet, hingga skala galaksi seperti Bima Sakti dan galaksi tetangga.

Didesain dengan tema **dark space** (hitam solid dengan aksen cyan elektrik) dan starfield animasi acak di seluruh halaman, untuk memberi nuansa "melayang di luar angkasa" saat menjelajah konten.

## ✨ Fitur

- 🪐 **Eksplorasi Objek Tata Surya** — data lengkap planet, planet kerdil, satelit alami, asteroid & meteoroid, komet, dan wilayah luar (Sabuk Kuiper, Awan Oort)
- 🌌 **Eksplorasi Galaksi** — klasifikasi jenis galaksi, objek menarik galaktik (nebula, gugus bintang, lubang hitam), dan galaksi tetangga (Andromeda, Awan Magellan)
- 📄 **Halaman Detail** per objek (contoh: Merkurius) dengan data statistik, deskripsi mendalam, dan fakta menarik
- ⭐ **Starfield acak + shooting star** animasi di seluruh halaman, dibangun native pakai CSS/JS (bukan gambar statis)
- 🎨 **Design system konsisten** — warna, tipografi, dan komponen terstandarisasi di semua halaman
- 🧪 **Demo eksperimen 3D interaktif** (Three.js, di luar alur desain utama) — visualisasi Tata Surya dan Galaxy Explorer yang bisa diklik-zoom untuk melihat info tiap objek

## 🛠️ Tech Stack

| Bagian | Tools |
|---|---|
| **Desain UI** | [Google Stitch](https://stitch.withgoogle.com/) (AI-assisted design, berbasis Gemini) |
| **Styling** | Tailwind CSS (via CDN), custom CSS untuk starfield & animasi |
| **Font** | Sora (heading), Hanken Grotesk (body), Geist (label) |
| **Ikon** | Material Symbols Outlined |
| **Demo 3D** | Three.js (r128), vanilla JavaScript — tanpa dependency tambahan (kontrol kamera manual, tanpa `OrbitControls` addon) |

## 🎨 Design System

| Token | Nilai | Penggunaan |
|---|---|---|
| Background utama | `#000000` | Latar seluruh halaman |
| Surface/Card | `#0F0F14` | Latar card, panel |
| Aksen utama (Seed Color) | `#22D3EE` | Heading, tombol, ikon, border |
| Aksen sekunder | Emas/oranye | Badge, highlight khusus |
| Teks utama | Putih | Judul, body text |
| Teks sekunder | Abu (`#595A5C`–`#9AA3C4`) | Deskripsi, caption |

Detail lengkap design system tersedia di [`design.md`](./design.md).

## 📄 Struktur Halaman

```
├── Beranda (Eksplorasi Lengkap Objek Tata Surya)
│   └── Hero, Data Observasi (grid planet), Kategori Celestial Lainnya
├── Planet
│   └── Halaman detail per objek (contoh: Merkurius)
│       └── Hero, Stats Grid, Deskripsi, Fakta Menarik, Deep Dive
├── Galaksi
│   └── Hero, Bima Sakti, Klasifikasi Morfologi Galaksi,
│       Objek Menarik Galaktik, Galaksi Tetangga, Skala Alam Semesta
│       └── Halaman detail per objek (contoh: Bima Sakti — direncanakan)
└── Teknologi (direncanakan)
```

## 🧪 Demo Eksperimen (Standalone)

Dua file demo interaktif 3D dibuat sebagai eksplorasi konsep, **terpisah dari alur desain utama di Stitch**:

- [`tata-surya-3d.html`](./tata-surya-3d.html) — visualisasi orbit Tata Surya (planet, sabuk asteroid, komet). Klik objek untuk zoom + info panel.
- [`galaksi-3d.html`](./galaksi-3d.html) — visualisasi Grup Lokal (Bima Sakti, Andromeda, Awan Magellan) dan contoh klasifikasi galaksi. Mekanik interaksi sama seperti demo Tata Surya.

Cara pakai: buka file `.html` langsung di browser modern (Chrome/Firefox/Edge), tidak perlu server atau instalasi apa pun.

**Kontrol:**
- 🖱️ **Drag** — putar kamera
- 🖱️ **Scroll** — zoom in/out
- 🖱️ **Klik objek** — lihat detail, kamera otomatis mendekat
- 🖱️ **Klik area kosong** — kembali ke tampilan awal

## 🚧 Status & Roadmap

- [x] Halaman utama Tata Surya
- [x] Halaman detail Merkurius (template)
- [x] Halaman Galaksi (hub)
- [x] Starfield & animasi konsisten di semua halaman
- [ ] Halaman detail Bima Sakti
- [ ] Halaman detail Andromeda & objek galaksi lainnya
- [ ] Halaman "Teknologi" (misi & wahana antariksa)
- [ ] Routing/navigasi antar halaman (link navbar masih placeholder)
- [ ] Integrasi/keputusan soal demo 3D interaktif ke situs utama
- [ ] Finalisasi nama & branding project

## 📁 File dalam Repository

| File | Deskripsi |
|---|---|
| `README.md` | Dokumen ini |
| `AI_CONTEXT.md` | Catatan konteks project untuk AI assistant lanjutan (histori keputusan desain, isu yang pernah muncul, gaya kerja) |
| `design.md` | Ringkasan design system (warna, komponen, tipografi) |
| `tata-surya-3d.html` | Demo interaktif 3D Tata Surya |
| `galaksi-3d.html` | Demo interaktif 3D Galaxy Explorer |

## 📝 Catatan

Halaman utama website (Beranda, Planet, Galaksi, dst.) didesain dan di-generate melalui **Google Stitch** dan belum di-export ke repository ini dalam bentuk kode sumber HTML/React final — file di atas mencakup dokumentasi pendukung dan demo eksperimen saja. Export kode halaman utama dari Stitch dapat ditambahkan menyusul.

---

<div align="center">
<sub>Dibuat dengan 🖤 dan rasa penasaran tentang luar angkasa.</sub>
</div>


# README — Project Website Astronomi/Tata Surya
> Dokumen ini dibuat untuk AI assistant selanjutnya yang akan membantu melanjutkan proses desain project ini. Baca dulu sebelum memberi saran, supaya tidak mengulang instruksi yang sudah pernah dicoba.

---

## 1. Ringkasan Project

Website astronomi/tata surya, awalnya direncanakan 1 halaman, sekarang berkembang jadi **3 halaman** yang dibangun di **Google Stitch**:

1. **Eksplorasi Lengkap Objek Tata Surya** — halaman utama/index, berisi hero + grid card semua objek tata surya (planet, planet kerdil, asteroid, komet, dll)
2. **Eksplorasi Merkurius - Detail Lengkap** — halaman detail contoh untuk satu objek (Merkurius), jadi template untuk halaman detail objek lain nantinya
3. **Interactive Solar System Hub** — halaman dengan visualisasi orbit tata surya yang lebih interaktif/dekoratif

Tool desain: **Google Stitch** (AI UI design tool dari Google, berbasis Gemini). User bekerja langsung di kanvas Stitch, saya (AI assistant sebelumnya) membantu lewat **screenshot review + menyusun prompt perbaikan** yang user tempel ke Stitch — saya tidak generate desainnya langsung, hanya membantu diagnosis visual dan menyusun instruksi prompt yang presisi.

Selain versi Stitch, sempat juga dibuatkan **demo terpisah 3D interaktif tata surya** pakai Three.js (file `tata-surya-3d.html`, standalone, bukan bagian dari project Stitch) — hanya sebagai referensi/demo konsep "klik objek → zoom → info panel", belum digabung ke desain utama.

---

## 2. Design System (Token Warna Resmi)

Diambil langsung dari panel **Theme** Stitch (bukan estimasi), seed color dan palette-nya:

| Token | Hex | Keterangan |
|---|---|---|
| **Seed Color / Primary** | `#22D3EE` | Cyan — dipakai di logo, heading highlight, tombol primary, ikon, link |
| **Secondary** | Oranye/emas (belum dicatat hex pastinya — cek ulang di panel Theme Stitch) | Aksen kedua, masih under-used di beberapa halaman |
| **Tertiary** | Abu keunguan muda | Elemen dekoratif sekunder (ring orbit, garis) |
| **Neutral** | Hitam | Background dasar |
| **Background utama** | `#000000` / `#050505` | Solid hitam, bukan gradient |
| **Background surface/card** | `#0F0F14` | Konsisten untuk SEMUA card, tanpa tint tambahan |
| **Teks utama** | Putih | Judul card, heading, body text |
| **Teks sekunder** | Abu (`#595A5C` area) | Caption, deskripsi singkat |

**Aturan penting:** judul card pakai warna **putih**, bukan cyan — cyan hanya untuk heading section besar & tombol.

Stitch punya fitur **export DESIGN.md** built-in (tab di sebelah "Theme" di panel kanan) — ini sumber paling akurat untuk token warna & komponen, lebih baik daripada estimasi dari screenshot. **Cek tab ini duluan** kalau butuh referensi warna terbaru.

---

## 3. Cara Kerja yang Terbukti Efektif di Stitch

- **Selalu Shift+klik pilih SEMUA halaman sebelum kasih prompt perbaikan tema/komponen global** (background, tombol, card style, dll). Kalau cuma edit 1 halaman lalu pindah dan prompt lagi terpisah, halaman lain akan "lupa" perubahan itu — ini sumber utama masalah inkonsistensi yang berulang kali muncul di project ini.
- Setelah kasih prompt, klik **"Apply to Selection"** — bukan cuma generate biasa — supaya perubahan dipush ke semua halaman terpilih sekaligus.
- Di panel Theme, ada tombol **"Simpan & Terapkan"** (bukan cuma "Simpan") untuk benar-benar menerapkan palet warna ke halaman aktif.
- Prompt yang paling efektif adalah yang **sangat spesifik per-komponen** (warna judul card, style border, radius, dll), bukan instruksi umum seperti "samakan temanya" — instruksi umum sering ditafsir ulang beda-beda tiap halaman.
- Kalau minta "starfield"/titik bintang, harus eksplisit minta **random/acak**, karena default Stitch cenderung menghasilkan **dot grid** yang rapi berbaris (kaku, kurang natural) kalau tidak diarahkan.

---

## 4. Riwayat Masalah & Status Perbaikan

### ✅ Sudah diperbaiki
- Background dot grid kaku → sudah diganti starfield acak, sudah konsisten di semua halaman & section (termasuk section "Tata Surya Kita" yang sebelumnya polos)
- Hero image awal (foto galaksi ungu/cokelat, gaya fotorealistik nabrak tema) → sudah dihapus, diganti eksperimen ilustrasi baru (lihat poin belum selesai di bawah)

### ⚠️ Terakhir dikerjakan, BELUM selesai
**Hero section halaman "Interactive Solar System Hub"** — ilustrasi orb cyan bercahaya yang baru digenerate punya masalah:
1. Orb terlalu besar/terang, glow-nya bertabrakan langsung dengan teks judul "Jelajahi Alam Semesta" → teks susah dibaca
2. Ring orbit di sekitarnya memotong tepat di tengah area teks
3. Ada artefak elemen "×" kecil nyasar di dekat tombol "Mulai Jelajahi", tidak jelas fungsinya, kemungkinan bug generate
4. Preview thumbnail kecil (skala di sidebar Stitch) sebenarnya sudah proporsional bagus — masalahnya cuma pas di-scale ke ukuran hero section penuh jadi berlebihan

**Prompt terakhir yang sudah diberikan ke user untuk masalah ini** (belum dikonfirmasi hasilnya):
```
Ilustrasi orb yang baru dibuat terlalu dominan dan bertabrakan dengan
teks di hero section. Perbaiki dengan:
1. Perkecil ukuran orb dan kurangi intensitas glow-nya sekitar 40-50%
2. Turunkan opacity orb di area yang bertampalan dengan teks judul
3. Kecilkan/geser ring orbit supaya tidak menembus area teks
4. Hapus elemen ikon "×" kecil di dekat tombol "Mulai Jelajahi"
5. Pastikan hierarki visual: teks paling kontras, orb & ring jadi
   elemen dekoratif opacity lebih rendah di belakang
```
→ **Next AI: tanyakan ke user apakah prompt ini sudah dicoba dan screenshot hasil terbarunya, sebelum lanjut ke perbaikan lain.**

### 🔲 Belum dicek/dikerjakan
- Warna **Secondary** (oranye/emas) masih under-used — sempat disinggung supaya dipakai lebih konsisten sebagai aksen kedua (badge, ikon tertentu), belum ada follow-up eksplisit apakah sudah diterapkan
- Belum ada pengecekan menyeluruh untuk **halaman "Eksplorasi Merkurius"** apakah semua card fakta menarik, tombol, dan ikonnya sudah 100% sinkron dengan 2 halaman lain setelah putaran perbaikan terakhir
- Export **DESIGN.md** resmi dari Stitch belum pernah benar-benar diambil isinya untuk didokumentasikan (baru sebatas dibuatkan estimasi manual oleh AI sebelumnya)
- Belum dibahas: apakah demo 3D Three.js (`tata-surya-3d.html`) akan digabung ke desain Stitch ini, atau tetap jadi eksperimen terpisah

---

## 5. Preferensi & Gaya Kerja User

- User terbiasa kerja lewat **screenshot round-trip**: screenshot kondisi Stitch saat ini → AI bandingkan/diagnosis perbedaan visual antar halaman → AI susun prompt perbaikan spesifik → user tempel ke Stitch → screenshot lagi hasilnya.
- User cukup detail/observant terhadap detail kecil (warna judul card, radius border, alignment heading) — jangan diremehkan, feedback dari user seperti "masih beda" biasanya akurat dan berdasar, bukan pickiness berlebihan.
- Prioritaskan instruksi yang **actionable langsung** (siap tempel ke Stitch), bukan penjelasan konsep panjang.
- Bahasa komunikasi: **Bahasa Indonesia**, nada santai tapi tetap teknis presisi.

---

## 6. File Terkait di Project Ini
- `design.md` — estimasi awal design system (dibuat sebelum ada akses ke DESIGN.md resmi Stitch, sudah agak usang, sebaiknya diganti dengan versi resmi dari Stitch kalau sudah diambil)
- `tata-surya-3d.html` — demo eksperimen 3D interaktif Three.js, terpisah dari project Stitch utama