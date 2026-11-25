
- **Nama:** Muhammad Zaki
- **NIM:** 103022400141
- **Mata kuliah:** Pemrograman Web

# 🎞️ FilmVault — Katalog Film Favorit
 
Aplikasi katalog film fullstack yang dikembangkan bertahap sepanjang semester.
 
| Bagian | Teknologi | Folder |
|---|---|---|
| Frontend | React + Vite | `katalog-film-frontend/` |
| Backend (REST API) | NestJS + Prisma ORM | `katalog-film-backend/` |
| Database | PostgreSQL | - |
 
> Entitas data utama: **Film** (`judul`, `sutradara`, `tahun`, `genre`, `rating`, `cover`, `sinopsis`).

### Tugas 

Selangkap nya ada di dokumen

| Tahap | Screenshot |
|---|---|
| `npm run dev` di `localhost:5173` | ![alt text](image.png) |



**Tugas**
- Enam component terpisah di `src/components/`
- Daftar film disimpan sebagai state (array) di `App.jsx`
- Render list dengan `.map()` dan `key` unik
- Form tambah film (controlled component) dengan tombol **Tambah**
- Conditional rendering: teks **"Belum ada data film"** saat daftar kosong
- Tambahan: pencarian, filter genre, pengurutan, dan slot gambar cover


---
## 🧰 Prasyarat
 
Pastikan sudah terpasang:
 
- [Node.js](https://nodejs.org/) versi LTS terbaru (disarankan v22) dan npm
- [PostgreSQL](https://www.postgresql.org/download/) (diuji dengan versi 18) beserta pgAdmin
- [Git](https://git-scm.com/)
---

## 🚀 Cara Menjalankan Secara Lokal
 
### 1. Clone repository
 
```bash
git clone https://github.com/Redflare3/Film-Web.git
cd Film-Web
```
 
### 2. Buat database PostgreSQL
 
Lewat **pgAdmin**: klik kanan **Databases → Create → Database**, isi nama `film_db`, lalu **Save**.
 
Atau lewat `psql`:
 
```sql
CREATE DATABASE film_db;
```
 
### 3. Siapkan backend
 
```bash
cd katalog-film-backend
npm install
```
 
Salin file contoh environment, lalu isi dengan data koneksi PostgreSQL kamu:
 
```bash
# Windows (cmd)
copy .env.example .env
 
# macOS / Linux
cp .env.example .env
```
 
Isi `.env`:
 
```env
DATABASE_URL="postgresql://postgres:PASSWORD_KAMU@localhost:5432/film_db?schema=public"
```
 
> Ganti `PASSWORD_KAMU` dengan password user `postgres`. Kalau password mengandung karakter khusus, ubah ke bentuk URL-encode (contoh: `@` menjadi `%40`, `!` menjadi `%21`). Port default PostgreSQL adalah `5432`.
 
Jalankan migrasi (membuat tabel `film`) dan isi data awal:
 
```bash
npx prisma migrate dev
npm run seed
```
 
Jalankan server backend:
 
```bash
npm run start:dev
```
 
Backend berjalan di **http://localhost:3000**. Cek dengan membuka http://localhost:3000/film, yang menampilkan 8 film dalam format JSON.
 
### 4. Siapkan frontend
 
Buka terminal baru (biarkan backend tetap berjalan):
 
```bash
cd katalog-film-frontend
npm install
npm run dev
```
 
Buka **http://localhost:5173** di browser.
 
> Frontend memanggil backend di `http://localhost:3000/film`, dan backend hanya mengizinkan CORS dari `http://localhost:5173`. Pastikan kedua port itu tidak dipakai aplikasi lain.
 
### Ringkasan perintah
 
| Terminal | Folder | Perintah |
|---|---|---|
| 1 (backend) | `katalog-film-backend` | `npm run start:dev` |
| 2 (frontend) | `katalog-film-frontend` | `npm run dev` |
 
---
 
## 🗄️ Skema Database
 
Model Prisma di `katalog-film-backend/prisma/schema.prisma`:
 
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | Int | Primary key, auto increment |
| `judul` | String | Judul film |
| `sutradara` | String | Default `"Tidak diketahui"` |
| `tahun` | Int | Tahun rilis |
| `genre` | String | Genre film |
| `rating` | Float | Rating 0 sampai 10 |
| `cover` | String? | URL atau path gambar cover (opsional) |
| `sinopsis` | String? | Ringkasan cerita (opsional) |
| `createdAt` | DateTime | Diisi otomatis |
| `updatedAt` | DateTime | Diperbarui otomatis |
 
Tabel di database bernama `film` (`@@map("film")`). Riwayat migrasi ada di `katalog-film-backend/prisma/migrations/`.
 
---

### Ringkasan Component

| Component | Props | Fungsi |
|---|---|---|
| `Navbar` | `kataKunci`, `onUbahKataKunci`, `daftarGenre`, `genreAktif`, `onUbahGenre` | Navigasi, pencarian, filter genre |
| `FormTambahFilm` | `onTambah` | Form tambah film baru |
| `CariFilmAPI` | `onTambah`, `judulTersimpan` | Cari film dari TVMaze API |
| `DaftarFilm` | `daftarFilm`, `totalFilm` | Render list film + kondisi kosong |
| `KartuFilm` | `judul`, `tahun`, `genre`, `sutradara`, `rating`, `cover` | Kartu satu film |
| `Poster` | `cover`, `judul` | Gambar cover, fallback jika gagal dimuat |
| `Footer` | `namaApp` | Footer aplikasi |

---
## 🌐 Dokumentasi REST API (Backend)
 
Base URL: `http://localhost:3000`
 
| Method | Endpoint | Fungsi |
|---|---|---|
| `POST` | `/film` | Tambah film baru |
| `GET` | `/film` | Ambil semua film (urut rating tertinggi) |
| `GET` | `/film?genre=Sci-Fi` | Filter berdasarkan genre |
| `GET` | `/film?cari=nolan` | Cari di judul atau sutradara |
| `GET` | `/film/statistik` | Statistik: total, rata-rata rating, jumlah per genre |
| `GET` | `/film/:id` | Ambil satu film |
| `PATCH` | `/film/:id` | Ubah sebagian data film |
| `DELETE` | `/film/:id` | Hapus film |

## Validasi input
 
| Field | Aturan |
|---|---|
| `judul` | Wajib, teks |
| `tahun` | Wajib, bilangan bulat 1888 sampai 2100 |
| `genre` | Wajib, teks |
| `rating` | Wajib, angka 0 sampai 10 |
| `sutradara`, `cover`, `sinopsis` | Opsional, teks |
 
Input yang tidak valid dijawab dengan status `400`. Film dengan `id` yang tidak ada dijawab dengan status `404`.
 
---

### Endpoint
 
```
GET https://api.tvmaze.com/search/shows?q={kata kunci}
```
---
 | Kondisi | Screenshot |
|---|---|
| Loading | !![alt text](image-1.png) |
| Success | !![alt text](image-2.png)|
| Error + tombol "Coba Lagi" | !![alt text](image-3.png)|
 
---
## 🛠️ Teknologi
 
- [React](https://react.dev/) dan [Vite](https://vite.dev/)
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/) (v6)
- [PostgreSQL](https://www.postgresql.org/)
- [class-validator](https://github.com/typestack/class-validator)
- [TVMaze API](https://www.tvmaze.com/api)
---