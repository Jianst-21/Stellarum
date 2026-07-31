<div align="center">

# 🌌 Stellarum
### Portal Eksplorasi Astronomi & Tata Surya

![Status](https://img.shields.io/badge/status-in%20development-22D3EE?style=flat-square)
![Design Tool](https://img.shields.io/badge/design-Google%20Figma-22D3EE?style=flat-square)
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
| **Desain UI** | [figma] |
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

Dua file demo interaktif 3D dibuat sebagai eksplorasi konsep, **terpisah dari alur desain utama di figma**:

- [`tata-surya-3d.html`](./tata-surya-3d.html) — visualisasi orbit Tata Surya (planet, sabuk asteroid, komet). Klik objek untuk zoom + info panel.
- [`galaksi-3d.html`](./galaksi-3d.html) — visualisasi Grup Lokal (Bima Sakti, Andromeda, Awan Magellan) dan contoh klasifikasi galaksi. Mekanik interaksi sama seperti demo Tata Surya.

Cara pakai: buka file `.html` langsung di browser modern (Chrome/Firefox/Edge), tidak perlu server atau instalasi apa pun.

**Kontrol:**
- 🖱️ **Drag** — putar kamera
- 🖱️ **Scroll** — zoom in/out
- 🖱️ **Klik objek** — lihat detail, kamera otomatis mendekat
- 🖱️ **Klik area kosong** — kembali ke tampilan awal





## 📝 Catatan

Halaman utama website (Beranda, Planet, Galaksi, dst.) didesain dan di-generate melalui **figma** dan belum di-export ke repository ini dalam bentuk kode sumber HTML/React final — file di atas mencakup dokumentasi pendukung dan demo eksperimen saja. Export kode halaman utama dari figma dapat ditambahkan menyusul.

---

<div align="center">
<sub>Dibuat dengan 🖤 dan rasa penasaran tentang luar angkasa.</sub>
</div>


# README — Project Website Astronomi/Tata Surya
> Dokumen ini dibuat untuk AI assistant selanjutnya yang akan membantu melanjutkan proses desain project ini. Baca dulu sebelum memberi saran, supaya tidak mengulang instruksi yang sudah pernah dicoba.

---


---

## 1. Design System (Token Warna Resmi)

Diambil langsung dari panel **Theme** figma (bukan estimasi), seed color dan palette-nya:

| Token | Hex | Keterangan |
|---|---|---|
| **Seed Color / Primary** | `#22D3EE` | Cyan — dipakai di logo, heading highlight, tombol primary, ikon, link |
| **Secondary** | Oranye/emas (belum dicatat hex pastinya — cek ulang di panel Theme figma) | Aksen kedua, masih under-used di beberapa halaman |
| **Tertiary** | Abu keunguan muda | Elemen dekoratif sekunder (ring orbit, garis) |
| **Neutral** | Hitam | Background dasar |
| **Background utama** | `#000000` / `#050505` | Solid hitam, bukan gradient |
| **Background surface/card** | `#0F0F14` | Konsisten untuk SEMUA card, tanpa tint tambahan |
| **Teks utama** | Putih | Judul card, heading, body text |
| **Teks sekunder** | Abu (`#595A5C` area) | Caption, deskripsi singkat |

**Aturan penting:** judul card pakai warna **putih**, bukan cyan — cyan hanya untuk heading section besar & tombol.
