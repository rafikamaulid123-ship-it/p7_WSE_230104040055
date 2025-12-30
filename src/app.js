// =========================================
// 1. IMPORTS & CONFIGURATION
// =========================================
require('dotenv').config(); // Load file .env [cite: 52]
const express = require('express');
const helmet = require('helmet');       // Security Headers [cite: 54]
const cors = require('cors');           // Origin Restriction [cite: 55]
const morgan = require('morgan');       // Logging [cite: 56]
const rateLimit = require('express-rate-limit'); // Anti-Spam [cite: 57]

// Import Routes & Middleware
// PASTIKAN nama file route di bawah ini sesuai dengan file Anda
const movieRoutes = require('./routes/movies.routes'); 
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// =========================================
// 2. SECURITY & LOGGING MIDDLEWARES
// =========================================

// A. Helmet: Amankan Header HTTP
app.use(helmet()); 

// B. CORS: Izinkan akses hanya dari domain tertentu
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// C. Logging: Catat request yang masuk
app.use(morgan('combined')); 

// D. Rate Limiter: Batasi jumlah request (Anti DDoS) [cite: 67-71]
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 menit
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // Limit request
    message: {
        status: "error",
        message: "Terlalu banyak permintaan, silakan coba lagi nanti."
    }
});
app.use(limiter);

// E. Body Parser (Agar bisa baca JSON)
app.use(express.json());

// =========================================
// 3. ROUTES
// =========================================

// Endpoint Monitoring (Health Check) [cite: 77-79]
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: "ok", 
        timestamp: new Date().toISOString(),
        service: "Movies API Service"
    });
});

// Route Utama Movies
app.use('/api/movies', movieRoutes);

// =========================================
// 4. ERROR HANDLING (Wajib Paling Bawah)
// =========================================

// Handler 404 (Jika route tidak ditemukan)
app.use((req, res, next) => {
    const error = new Error("Resource not found");
    error.status = 404;
    next(error); // Lempar ke global error handler
});

// Global Error Handler [cite: 82]
app.use(errorHandler);

// =========================================
// 5. START SERVER
// =========================================
app.listen(PORT, () => {
    console.log(`✅ Server is running securely on port ${PORT}`);
});