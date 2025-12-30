# Laporan Praktikum #7 - API Hardening (Security & Observability)

**Nama**: Febi Novia Putri 

**NIM**: 230104040055

## Deskripsi
Project ini adalah pengembangan dari sistem Task Management (UTS) yang telah ditingkatkan keamanannya menggunakan teknik Hardening.

## Fitur Keamanan & Monitoring (Hardening)
1.  **Helmet**: Melindungi HTTP Headers dari serangan umum.
2.  **CORS**: Mengatur izin akses resource antar domain.
3.  **Rate Limit**: Membatasi request (Max 100/15menit) untuk mencegah DDoS.
4.  **Morgan**: Logging setiap aktivitas request ke terminal.
5.  **Environment Variable**: Konfigurasi PORT dan sensitif data via `.env`.
6.  **Health Check**: Endpoint `/api/health` untuk monitoring uptime server.

## Cara Menjalankan
1.  Install dependencies: `npm install`
2.  Buat file `.env` (lihat `.env.example`).
3.  Jalankan: `npm run dev`

## Daftar Endpoint
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task |
| GET | /api/health | Server Health Check |
| GET | /api/info | Service Info |
