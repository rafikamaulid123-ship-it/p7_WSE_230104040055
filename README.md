# P7 - Hardening Web Service (Movies API)

Project ini adalah hasil praktikum Web Service Engineering Minggu ke-7. Fokus utama project ini adalah meningkatkan keamanan (*hardening*), observabilitas (*logging*), dan manajemen error pada RESTful API Movies yang telah dibuat sebelumnya.

## 🚀 Fitur Utama

Project ini telah dilengkapi dengan *middleware* dan konfigurasi standar industri:

### 1. Keamanan (Security)
* **Helmet:** Mengamankan HTTP Headers dari kerentanan umum.
* **CORS:** Membatasi akses resource hanya dari domain yang diizinkan (Origin Restriction).
* **Rate Limiting:** Mencegah serangan *Brute Force* dan *DDoS* dengan membatasi jumlah request per IP (Max 100 request/15 menit).

### 2. Observabilitas (Logging)
* **Morgan:** Mencatat log setiap request yang masuk (Method, URL, Status, Response Time) ke console untuk memudahkan debugging.
* **Health Check Endpoint:** Endpoint khusus (`/api/health`) untuk memantau status *uptime* server.

### 3. Arsitektur & Error Handling
* **Global Error Handler:** Menangkap semua error sistem dan menampilkannya dalam format JSON yang rapi dan konsisten.
* **Environment Variables:** Konfigurasi sensitif (Port, Limit, Origin) dipisah menggunakan file `.env`.
* **Modular Code:** Pemisahan *routes*, *controllers*, dan *middlewares* di dalam folder `src/`.

---

## 🛠️ Instalasi & Cara Menjalankan

Ikuti langkah berikut untuk menjalankan project di lokal:

1.  **Clone Repository** (atau ekstrak folder project)
2.  **Install Dependencies**
    ```bash
    npm install
    ```
3.  **Konfigurasi Environment**
    Buat file `.env` di root folder, lalu salin konfigurasi berikut:
    ```env
    PORT=3000
    NODE_ENV=development
    RATE_LIMIT_WINDOW_MS=900000
    RATE_LIMIT_MAX=100
    ALLOWED_ORIGIN=http://localhost:5173
    ```
4.  **Jalankan Server**
    ```bash
    npm start
    ```
    Output sukses: `✅ Server is running securely on port 3000`

---

## 🔌 API Endpoints

Berikut adalah daftar endpoint yang tersedia:

| Method | Endpoint | Deskripsi | Status Code |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Cek status server (Health Check) | 200 |
| **GET** | `/api/movies` | Mendapatkan semua data film | 200 |
| **GET** | `/api/movies/:id` | Mendapatkan detail film by ID | 200 / 404 |
| **POST** | `/api/movies` | Menambah data film baru | 201 / 400 |
| **PUT** | `/api/movies/:id` | Mengupdate data film | 200 / 404 |
| **DELETE** | `/api/movies/:id` | Menghapus data film | 204 / 404 |
| **ANY** | `/api/ngawur` | Test 404 Handler | 404 |

---

## 📂 Struktur Folder

Struktur project disusun secara modular di dalam folder `src`:

P7-Hardening-NIM/ 
├── src/ │ 
            ├── controllers/ # Logika Bisnis │ 
            ├── middlewares/ # Error Handler, Logger, Limiter │ 
            ├── routes/ # Definisi URL/Endpoint │ 
            ├── data/ # Mock Data Movies │ 
            └── app.js # Entry Point Server 
├── .env # Konfigurasi Environment 
├── .env.example # Contoh Konfigurasi 
└── package.json
