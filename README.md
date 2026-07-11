# Portfolio (Next.js + TinaCMS)

Portfolio pribadi yang bisa **diedit lewat panel web** di `/admin`.
Data disimpan sebagai file `content/portfolio.json` di dalam repo (git-based),
jadi **nggak ada database yang bisa ketiduran atau hilang**.

Alur kerjanya:

```
Edit di /admin  ->  Tina commit ke GitHub  ->  Vercel build ulang  ->  web update
```

## Jalankan di lokal

```bash
npm install
npm run dev
```

- Web: http://localhost:3000
- Panel editor: http://localhost:3000/admin

Di lokal, Tina jalan "local mode" -- kamu langsung bisa edit dan file
`content/portfolio.json` ikut berubah. Belum perlu Tina Cloud di tahap ini.

> Kalau konten baru belum muncul, itu cache Next.js. Buka DevTools > Network >
> centang "Disable cache" saat development.

## Struktur folder

```
app/
  layout.js         # layout root
  page.js           # baca content/portfolio.json -> render PortfolioView
  globals.css       # styling
components/
  PortfolioView.js  # wrapper client (state tema)
  Portfolio.js      # tampilan publik (hero, tentang, keahlian, proyek, kontak)
lib/
  icons.js          # ikon SVG
content/
  portfolio.json    # DATA portfolio (diedit lewat /admin)
tina/
  config.js         # skema kolom untuk panel editor Tina
.env.local          # kredensial Tina Cloud (JANGAN di-commit)
```

## Setup produksi (Tina Cloud + Vercel)

1. Push project ini ke GitHub.
2. Buka https://app.tina.io, login pakai GitHub, **Create Project**, hubungkan
   ke repo kamu. Catat **Client ID** dan **Read-only Token**.
3. Isi `.env.local`:
   ```
   NEXT_PUBLIC_TINA_CLIENT_ID=...
   TINA_TOKEN=...
   NEXT_PUBLIC_TINA_BRANCH=main
   ```
4. Import repo di https://vercel.com, tambahkan 3 environment variable yang sama,
   lalu Deploy. Vercel otomatis pakai script `build` (`tinacms build && next build`).
5. Edit konten di `https://namaproject.vercel.app/admin` (login GitHub). Tiap
   Save otomatis commit ke GitHub -> web update ~1-2 menit.

## Gambar

Upload gambar dari panel Tina disimpan ke `public/uploads/` (git-backed media).
Cukup untuk portfolio, tanpa perlu Cloudinary. Kalau nanti gambarnya banyak/berat,
baru pertimbangkan media eksternal.

Panduan lengkap step-by-step ada di `TUTORIAL-TINACMS.md`.
