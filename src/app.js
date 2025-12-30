require('dotenv').config(); // 1. Load Env
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const taskRoutes = require('./routes/tasks.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// --- MIDDLEWARES (Urutan Penting!) ---

// 2. Helmet: Amankan HTTP Headers (Sembunyikan info server, XSS protection, dll)
app.use(helmet());

// 3. CORS: Batasi siapa yang bisa akses API (Cth: hanya localhost:5173)
app.use(cors()); 
// Jika mau ketat: app.use(cors({ origin: 'http://localhost:5173' }));

// 4. Rate Limiter: Batasi spam request
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: process.env.RATE_LIMIT_MAX || 100, // Maks 100 request
    message: { status: "fail", message: "Terlalu banyak request, coba lagi nanti." }
});
app.use(limiter);

// 5. Morgan: Logging request ke terminal
app.use(morgan("dev")); // atau "combined" untuk log lebih detail

// 6. Parsing Body
app.use(express.json());

// --- ROUTES ---

// Route Utama (Tasks)
app.use('/api/tasks', taskRoutes);

// Endpoint Monitoring (Health Check) - Wajib ada di P7
app.get('/api/health', (req, res) => {
    res.json({ 
        status: "ok", 
        timestamp: new Date().toISOString(),
        server: "Task Service Hardened"
    });
});

// Endpoint Info Service
app.get('/api/info', (req, res) => {
    res.json({ 
        serviceName: "Task Management API",
        version: "1.0.0",
        maintainedBy: "Mahasiswa WSE"
    });
});

// 404 Handler (Untuk route yang tidak dikenal)
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// --- GLOBAL ERROR HANDLER ---
app.use(errorHandler);

// --- SERVER START ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));