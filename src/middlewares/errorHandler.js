// src/middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    // 1. Logging: Cetak error di terminal agar developer tahu
    console.error(`[ERROR] ${err.stack}`);

    // 2. Tentukan Status Code (Default 500 jika tidak ada)
    const statusCode = err.status || 500;

    // 3. Kirim Response JSON ke client
    res.status(statusCode).json({
        status: "error",
        statusCode: statusCode,
        message: err.message || "Internal Server Error",
        // Tampilkan stack trace hanya jika mode development (untuk keamanan)
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;