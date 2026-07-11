# Tutorial: Pasang TinaCMS di Portfolio (Git-based CMS)

Tutorial ini bikin portfolio kamu bisa **diedit lewat panel web** (di `/admin`),
tapi datanya disimpan sebagai **file JSON di dalam repo GitHub** -- jadi:

- Nggak ada database yang bisa "ketiduran" atau hilang (beda dari Supabase).
- Tiap kali kamu simpan di panel, Tina otomatis **commit ke GitHub**, lalu Vercel
  build ulang dan web-nya update.
- Nol biaya, aman, dan ada riwayat perubahan (git history).

Kita pakai **Tina Cloud** (versi terkelola) supaya urusan login/auth ke GitHub
nggak perlu kamu setup manual.

---

## Peta besarnya dulu (biar paham alurnya)

```
Kamu edit di /admin  ->  Tina commit ke GitHub  ->  Vercel build ulang  ->  web update
         (di browser)        (file content/portfolio.json)        (otomatis)
```

Data tunggal ada di satu file: `content/portfolio.json`.
Panel editor (UI-nya) ada di route `/admin`.

---

## Prasyarat

1. Akun **GitHub** (gratis).
2. Akun **Vercel** (gratis) -- buat hosting.
3. Akun **Tina Cloud** di https://app.tina.io (gratis buat personal).
4. Node.js sudah terpasang di laptop.

---

## Langkah 1 -- Push project ke GitHub

1. Buat repo baru di GitHub (misal `portfolio`).
2. Dari folder project:
   ```bash
   git init
   git add .
   git commit -m "initial portfolio"
   git branch -M main
   git remote add origin https://github.com/USERNAME/portfolio.git
   git push -u origin main
   ```

> Tina butuh repo GitHub sebagai "gudang" datanya, jadi langkah ini wajib duluan.

---

## Langkah 2 -- Install TinaCMS ke project

Dari folder project, jalankan:

```bash
npx @tinacms/cli@latest init
```

Saat ditanya, jawab kira-kira begini:
- Framework: **Next.js**
- Router: **App Router**
- Bahasa config: **JavaScript** (biar konsisten sama project ini)
- Public folder: **public**

Init ini otomatis:
- Nambah dependency `tinacms` dan `@tinacms/cli`.
- Bikin folder `tina/` berisi `config.js`.
- Ngubah script di `package.json` jadi kira-kira:
  ```json
  {
    "scripts": {
      "dev": "tinacms dev -c \"next dev\"",
      "build": "tinacms build && next build",
      "start": "next start"
    }
  }
  ```

> Kalau init nggak otomatis ngubah script, edit manual seperti di atas.
> Intinya `tinacms dev` membungkus `next dev`.

---

## Langkah 3 -- Ganti isi `tina/config.js`

Timpa isi `tina/config.js` dengan skema portfolio kita (ini yang menentukan
kolom-kolom apa saja yang muncul di panel editor):

```js
import { defineConfig } from 'tinacms';

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  'main';

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // dari Tina Cloud
  token: process.env.TINA_TOKEN, // dari Tina Cloud
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'uploads', publicFolder: 'public' } },
  schema: {
    collections: [
      {
        name: 'portfolio',
        label: 'Portfolio',
        path: 'content',
        format: 'json',
        match: { include: 'portfolio' },
        // Cuma ada 1 dokumen, jadi matikan tombol buat/hapus
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object',
            name: 'profile',
            label: 'Profil',
            fields: [
              { type: 'image', name: 'photoUrl', label: 'Foto' },
              { type: 'string', name: 'name', label: 'Nama' },
              { type: 'string', name: 'role', label: 'Role / Peran' },
              { type: 'string', name: 'tagline', label: 'Tagline' },
              {
                type: 'string',
                name: 'bio',
                label: 'Bio',
                ui: { component: 'textarea' },
              },
              { type: 'string', name: 'email', label: 'Email' },
              { type: 'string', name: 'github', label: 'GitHub' },
              { type: 'string', name: 'linkedin', label: 'LinkedIn' },
            ],
          },
          {
            type: 'object',
            name: 'stats',
            label: 'Statistik',
            list: true,
            ui: { itemProps: (item) => ({ label: item && item.label }) },
            fields: [
              { type: 'string', name: 'value', label: 'Angka' },
              { type: 'string', name: 'label', label: 'Label' },
            ],
          },
          {
            type: 'object',
            name: 'skills',
            label: 'Keahlian',
            list: true,
            ui: { itemProps: (item) => ({ label: item && item.title }) },
            fields: [
              { type: 'string', name: 'title', label: 'Kategori' },
              { type: 'string', name: 'tags', label: 'Tags', list: true },
            ],
          },
          {
            type: 'object',
            name: 'projects',
            label: 'Proyek',
            list: true,
            ui: { itemProps: (item) => ({ label: item && item.title }) },
            fields: [
              { type: 'image', name: 'coverUrl', label: 'Cover' },
              { type: 'string', name: 'title', label: 'Judul' },
              {
                type: 'string',
                name: 'description',
                label: 'Deskripsi',
                ui: { component: 'textarea' },
              },
              {
                type: 'string',
                name: 'status',
                label: 'Status',
                options: ['Aktif', 'Dalam progres', 'Selesai'],
              },
              { type: 'string', name: 'features', label: 'Fitur', list: true },
              { type: 'string', name: 'tags', label: 'Tags', list: true },
              { type: 'string', name: 'link', label: 'Link' },
            ],
          },
        ],
      },
    ],
  },
});
```

---

## Langkah 4 -- Bikin file datanya: `content/portfolio.json`

Buat folder `content/` dan file `portfolio.json` di dalamnya. Isi awal (kosong):

```json
{
  "profile": {
    "photoUrl": "",
    "name": "",
    "role": "",
    "tagline": "",
    "bio": "",
    "email": "",
    "github": "",
    "linkedin": ""
  },
  "stats": [],
  "skills": [],
  "projects": []
}
```

Ini file yang nanti diedit lewat panel Tina.

---

## Langkah 5 -- Baca data dari file (bukan lagi dari Supabase)

Karena datanya sekarang file, halaman tinggal meng-import JSON-nya langsung.
Ubah `app/page.js` supaya membaca file itu, lalu oper ke komponen `Portfolio`.

Contoh paling sederhana (server component):

```js
import data from '@/content/portfolio.json';
import PortfolioView from '@/components/PortfolioView';

export default function Home() {
  return <PortfolioView data={data} />;
}
```

Catatan:
- Komponen tampilan (`Portfolio.js`) yang kemarin dibuat **masih dipakai** untuk
  menampilkan hero, keahlian, proyek, dll -- cukup dijadikan komponen client
  kecil (`PortfolioView`) yang megang tombol tema.
- File Supabase/Cloudinary/Editor lama (`lib/supabase.js`, `lib/store.js`,
  `lib/cloudinary.js`, `components/Editor.js`) **tidak dipakai lagi** dan boleh
  dihapus -- panel editornya sekarang disediakan Tina di `/admin`.

> Bagian rewiring ini agak teknis. Kalau mau, aku bisa langsung rombakin
> project-nya biar 100% siap Tina -- tinggal bilang.

---

## Langkah 6 -- Coba di lokal

```bash
npm install
npm run dev
```

- Web: http://localhost:3000
- Panel editor: http://localhost:3000/admin

Di lokal, Tina jalan dalam "local mode" -- kamu bisa langsung edit dan lihat
file `content/portfolio.json` berubah. Belum perlu Tina Cloud di tahap ini.

> Kalau konten baru nggak langsung muncul, itu karena cache Next.js.
> Buka DevTools > Network > centang "Disable cache" saat development.

---

## Langkah 7 -- Daftar Tina Cloud (buat mode produksi)

1. Buka https://app.tina.io, login pakai GitHub.
2. Klik **Create Project** -> hubungkan ke repo `portfolio` kamu.
3. Setelah jadi, buka **Project > Overview / Tokens**, catat:
   - **Client ID**
   - **Read-only Token**
4. Pastikan `branch` = `main` (atau branch produksi kamu).

---

## Langkah 8 -- Isi environment variable

Buat file `.env.local`:

```
NEXT_PUBLIC_TINA_CLIENT_ID=isi_client_id_dari_tina_cloud
TINA_TOKEN=isi_read_only_token_dari_tina_cloud
NEXT_PUBLIC_TINA_BRANCH=main
```

(Jangan di-commit -- pastikan `.env.local` ada di `.gitignore`.)

---

## Langkah 9 -- Deploy ke Vercel

1. Buka https://vercel.com, **Import** repo `portfolio` dari GitHub.
2. Di **Settings > Environment Variables**, tambahkan 3 variable yang sama
   seperti di `.env.local`.
3. Deploy.

Vercel akan pakai script `build` (`tinacms build && next build`) otomatis.

---

## Langkah 10 -- Edit di produksi

- Web kamu: `https://namaproject.vercel.app`
- Panel editor: `https://namaproject.vercel.app/admin`

Masuk ke `/admin`, login pakai GitHub (lewat Tina Cloud). Tiap kali kamu klik
**Save**, Tina otomatis commit ke GitHub -> Vercel build ulang -> web update
dalam ~1-2 menit.

---

## Soal gambar

- Dengan konfigurasi di atas, upload gambar disimpan ke folder `public/uploads/`
  di repo (git-backed media). Cukup buat portfolio, nggak perlu Cloudinary.
- Kalau nanti gambarnya banyak/berat dan bikin repo gemuk, baru pertimbangkan
  media eksternal (Cloudinary/S3) -- Tina mendukung itu, tapi jangan sekarang.

---

## Kelemahan yang harus kamu terima (biar nggak kaget)

- **Update nggak instan**: tiap simpan memicu build Vercel, jadi perubahan baru
  kelihatan ~1-2 menit kemudian. Ini wajar untuk arsitektur git-based.
- **Ngedit enaknya dari laptop**, bukan HP.
- Setup awal (Tina Cloud + env) lebih panjang dari sekadar pakai localStorage,
  tapi ini sekali doang.

Setelah jalan, kamu praktis nggak perlu "jaga" apa-apa lagi -- nggak ada database
yang bisa ketiduran, dan semua datamu aman di GitHub.
