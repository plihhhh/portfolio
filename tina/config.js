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
