const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Inisialisasi Firebase Admin SDK
// Mendukung dua cara:
//   1. File JSON service account (firebase-adminsdk.json) — letakkan di folder apps/backend/
//   2. Environment variables FIREBASE_ADMIN_* di file .env
// Jika keduanya tidak ada/tidak valid, server tetap bisa jalan tapi fitur
// verifikasi token Firebase dinonaktifkan.
if (!admin.apps.length) {
    const serviceAccountPath = path.join(__dirname, '../../firebase-adminsdk.json');

    try {
        if (fs.existsSync(serviceAccountPath)) {
            // Cara 1: Gunakan file JSON jika ada
            const serviceAccount = require(serviceAccountPath);
            admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
            console.log('[Firebase Admin] ✅ Menggunakan service account file JSON.');

        } else if (
            process.env.FIREBASE_ADMIN_PROJECT_ID &&
            process.env.FIREBASE_ADMIN_PROJECT_ID !== 'your_project_id' &&
            process.env.FIREBASE_ADMIN_PRIVATE_KEY &&
            process.env.FIREBASE_ADMIN_PRIVATE_KEY.includes('BEGIN PRIVATE KEY')
        ) {
            // Cara 2: Gunakan environment variables (hanya jika bukan placeholder)
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
                }),
            });
            console.log('[Firebase Admin] ✅ Menggunakan environment variables.');

        } else {
            console.warn('[Firebase Admin] ⚠️  Credentials tidak ditemukan atau masih placeholder.');
            console.warn('[Firebase Admin]    → Letakkan file firebase-adminsdk.json di apps/backend/');
            console.warn('[Firebase Admin]    → ATAU isi FIREBASE_ADMIN_* di file apps/backend/.env');
            console.warn('[Firebase Admin]    → Fitur verifikasi token dinonaktifkan sementara.');
        }
    } catch (err) {
        console.error('[Firebase Admin] ❌ Gagal inisialisasi:', err.message);
        console.warn('[Firebase Admin]    Server tetap berjalan tanpa Firebase Admin.');
    }
}

module.exports = admin;
