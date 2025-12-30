const express = require('express');
const router = express.Router();

// Impor controller yang akan kita buat
const controller = require('../controllers/movies.controller.js');

/* * Definisi 5 Endpoint Wajib Sesuai Dokumen
 * Prinsip: Resource-Oriented URI & Proper HTTP Methods
 */

// GET /api/movies (Ambil semua data)
router.get('/', controller.getAllMovies);

// GET /api/movies/:id (Ambil data berdasarkan id)
router.get('/:id', controller.getMovieById);

// POST /api/movies (Tambah data baru)
router.post('/', controller.createMovie);

// PUT /api/movies/:id (Update data)
router.put('/:id', controller.updateMovie);

// DELETE /api/movies/:id (Hapus data)
router.delete('/:id', controller.deleteMovie);


// Ini adalah baris KUNCI agar router-nya bisa diimpor di app.js
module.exports = router;