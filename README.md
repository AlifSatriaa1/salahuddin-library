# Salahuddin Library - Platform Perpustakaan Digital & Katalog Buku Aceh

[![Domain Live](https://img.shields.io/badge/Live-salahuddinlibrary.my.id-047857?style=for-the-badge)](https://salahuddinlibrary.my.id)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Express%20%7C%20Firebase-0284c7?style=for-the-badge)](#-arsitektur-dan-teknologi)

**Salahuddin Library** adalah sebuah platform perpustakaan digital terintegrasi yang dirancang khusus untuk mendigitalisasi katalog buku, mempermudah manajemen transaksi peminjaman buku fisik secara *realtime*, serta mengotomatisasi verifikasi berkas keanggotaan (KTP) masyarakat di Kota Banda Aceh.

Platform ini dideploy penuh secara produksi di domain resmi: **[salahuddinlibrary.my.id](https://salahuddinlibrary.my.id)**

---

## 🚀 Fitur Utama Sistem

### 👤 Sisi Anggota (User / Member)
* **Katalog Buku Digital**: Pencarian buku interaktif, filter kategori buku (tagging), deskripsi buku, dan status stok buku *realtime*.
* **Manajemen Peminjaman**: Riwayat peminjaman buku aktif, tanggal jatuh tempo otomatis, dan sistem kalkulasi denda denda keterlambatan buku (Rp 5.000 / hari).
* **Verifikasi Anggota (KTP Upload)**: Pengunggahan kartu identitas (KTP) dengan kompresi gambar *client-side* sebelum diunggah ke Cloudinary demi efisiensi bandwidth.
* **Pembayaran Keanggotaan Manual**: Integrasi WhatsApp Click-to-Chat API untuk instruksi pembayaran keanggotaan Rp 50.000 seumur hidup dan denda langsung ke WhatsApp Admin.

### 👑 Sisi Admin (Dashboard Administrator)
* **Dashboard Statistik**: Panel kontrol ringkasan total buku, total anggota, peminjaman aktif, KTP pending, dan riwayat buku kembali.
* **Manajemen Katalog**: Operasi CRUD (Tambah, Edit, Hapus) katalog buku, stok, dan tag kategori.
* **Verifikasi KTP**: Panel persetujuan (Approve/Reject) berkas KTP pendaftar.
* **Manajemen Peminjaman & Pengembalian**: Validasi buku keluar, pengembalian stok otomatis ketika buku dikembalikan, serta penanganan perpanjangan peminjaman (+5 hari).
* **SMTP Email Notification**: Pengiriman email notifikasi verifikasi sukses secara otomatis ke email pengguna setelah Admin menyetujui KTP mereka.
* **Feedback Management**: Menerima dan mengarsipkan masukan saran dari pengunjung perpustakaan.

---

## 🛠️ Arsitektur dan Teknologi

Aplikasi ini dibangun menggunakan arsitektur **Monorepo** yang memisahkan aplikasi frontend dengan backend notifikasi:

```text
salahuddin-library/
├── apps/
│   ├── frontend/         # React.js SPA (Vite) - Frontend utama aplikasi
│   └── backend/          # Node.js + Express.js - Layanan pengiriman notifikasi email
```

### 💻 Frontend Tech Stack
* **Framework**: React.js (Single Page Application via React Router v6)
* **Build Tool**: Vite (Superfast Compilation)
* **State & Connection**: Firebase Client SDK
* **Aesthetics / UI**: Vanilla CSS Premium & Responsive Grid System (Mobile First)
* **Image Compression**: `browser-image-compression` (Kompresi gambar di browser)

### 🖥️ Backend Tech Stack
* **Platform**: Node.js
* **Framework**: Express.js
* **Email Transporter**: Nodemailer (SMTP Service via Gmail Secure API)
* **CORS**: Dikontrol ketat untuk keamanan akses antar domain

### 💾 Cloud & Database (Hybrid Serverless)
* **Firebase Authentication**: Manajemen user session aman secara cloud.
* **Firebase Realtime Database (RTDB)**: Database NoSQL realtime berkinerja tinggi untuk sinkronisasi inventaris buku dan transaksi peminjaman.
* **Cloudinary REST API**: Manajemen *Image Cloud Storage* untuk penyimpanan foto KTP dan optimalisasi format gambar otomatis ke **WebP** (`f_auto, q_auto`).

---

## 📁 Peta Struktur Kode Penting (Untuk Penguji Sidang)

Bagi dosen penguji atau developer yang ingin memeriksa kode program utama, berikut adalah peta lokasi kodenya:

### 📱 Frontend (`apps/frontend/`)
1. **Konfigurasi Firebase & SDK**:  
   * **[apps/frontend/src/config/firebase.js](file:///d:/project/salahuddin%20library/apps/frontend/src/config/firebase.js)**
2. **Context Manajemen Sesi Pengguna**:  
   * **[apps/frontend/src/context/AuthContext.jsx](file:///d:/project/salahuddin%20library/apps/frontend/src/context/AuthContext.jsx)** (Melakukan inisialisasi status login secara global).
3. **Logika Halaman Member & Profil**:  
   * **[apps/frontend/src/pages/Profile.jsx](file:///d:/project/salahuddin%20library/apps/frontend/src/pages/Profile.jsx)** (Berisi upload KTP dengan kompresi lokal, pengajuan denda, ganti password, dan integrasi WhatsApp API).
4. **Logika Dashboard Administrator**:  
   * **[apps/frontend/src/pages/AdminDashboard.jsx](file:///d:/project/salahuddin%20library/apps/frontend/src/pages/AdminDashboard.jsx)** (Berisi penanganan CRUD buku, perpanjangan, pengembalian buku, dan penanganan persetujuan KTP serta memanggil REST API backend email).
5. **Utilitas Cloudinary (Optimasi Gambar)**:  
   * **[apps/frontend/src/utils/cloudinary.js](file:///d:/project/salahuddin%20library/apps/frontend/src/utils/cloudinary.js)** (Mengubah URL gambar ke format WebP berkualitas otomatis).

### 🖥️ Backend (`apps/backend/`)
1. **Express Server Entry Point**:  
   * **[apps/backend/server.js](file:///d:/project/salahuddin%20library/apps/backend/server.js)** (Setup CORS, Express routes, kompresi respons, dan registrasi API email).
2. **API Router & NodeMailer Controller**:  
   * **[apps/backend/src/modules/email/email.routes.js](file:///d:/project/salahuddin%20library/apps/backend/src/modules/email/email.routes.js)** (Mendaftarkan endpoint `/api/email/send-verification-email`).
   * **[apps/backend/src/modules/email/email.controller.js](file:///d:/project/salahuddin%20library/apps/backend/src/modules/email/email.controller.js)** (Konfigurasi SMTP Google Account, pembuatan template HTML email notifikasi dinamis, dan pengiriman email).

---

## ⚙️ Petunjuk Menjalankan Proyek Secara Lokal

### Prasyarat
* Node.js versi 18 ke atas terinstall di komputer.

### 1. Jalankan Backend (Express)
1. Buka terminal baru dan masuk ke direktori backend:
   ```bash
   cd apps/backend
   ```
2. Install dependensi backend:
   ```bash
   npm install
   ```
3. Salin `.env.example` ke `.env` dan lengkapi konfigurasi email SMTP Anda:
   ```bash
   cp .env.example .env
   ```
4. Jalankan server backend dalam mode pengembangan:
   ```bash
   npm run dev
   ```
   Server akan berjalan di `http://localhost:5000`.

### 2. Jalankan Frontend (React + Vite)
1. Buka terminal baru dan masuk ke direktori frontend:
   ```bash
   cd apps/frontend
   ```
2. Install dependensi frontend:
   ```bash
   npm install
   ```
3. Buat file `.env` di direktori frontend dan arahkan URL API ke port backend:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Jalankan server pengembangan frontend:
   ```bash
   npm run dev
   ```
   Situs web akan berjalan di `http://localhost:5173`.
