// Impor data dari "database" dummy kita
// Gunakan 'let' agar bisa dimodifikasi
let movies = require('../data/movies.data.js');

// Helper function untuk mencari ID baru
const getNewId = () => {
  if (movies.length > 0) {
    return movies[movies.length - 1].id + 1;
  } else {
    return 1;
  }
};

/* * Ini adalah 5 fungsi Controller
 * (sesuai yang kita daftarkan di routes.js)
 */

// 1. GET /api/movies (Ambil semua data)
exports.getAllMovies = (req, res) => {
  res.status(200).json({ // Status 200: OK
    status: "success",
    message: "Data semua movies berhasil diambil",
    data: movies
  });
};

// 2. GET /api/movies/:id (Ambil data berdasarkan id)
exports.getMovieById = (req, res) => {
  const id = parseInt(req.params.id); // Ambil ID dari parameter URL
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    // Jika data tidak ditemukan, kirim 404
    return res.status(404).json({ // Status 404: Not Found
      status: "fail",
      message: `Movie dengan ID ${id} tidak ditemukan`
    });
  }

  // Jika data ditemukan, kirim 200
  res.status(200).json({ // Status 200: OK
    status: "success",
    message: `Data movie dengan ID ${id} berhasil diambil`,
    data: movie
  });
};

// 3. POST /api/movies (Tambah data baru)
exports.createMovie = (req, res) => {
  const { title, genre, year } = req.body;

  // == VALIDASI WAJIB == [cite: 68, 69]
  // Field wajib untuk movies: 'title' dan 'genre'
  if (!title || !genre) {
    return res.status(400).json({ // Status 400: Bad Request
      status: "fail",
      message: "Field 'title' dan 'genre' wajib diisi" //
    });
  }

  const newId = getNewId();
  const newMovie = {
    id: newId,
    title,
    genre,
    year: year || new Date().getFullYear() // Kasih nilai default jika 'year' tidak diisi
  };

  movies.push(newMovie); // Tambahkan data baru ke array

  res.status(201).json({ // Status 201: Created
    status: "success",
    message: "Data movie berhasil dibuat",
    data: newMovie // Tampilkan data yang baru dibuat
  });
};

// 4. PUT /api/movies/:id (Update data)
exports.updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const movieIndex = movies.findIndex(m => m.id === id);

  // Cek jika data tidak ada
  if (movieIndex === -1) {
    return res.status(404).json({ // Status 404: Not Found
      status: "fail",
      message: `Movie dengan ID ${id} tidak ditemukan, update gagal`
    });
  }

  // == VALIDASI WAJIB ==
  const { title, genre, year } = req.body;
  if (!title || !genre) {
    return res.status(400).json({ // Status 400: Bad Request
      status: "fail",
      message: "Field 'title' dan 'genre' wajib diisi"
    });
  }

  // Lakukan update data
  const updatedMovie = {
    id: id,
    title: title,
    genre: genre,
    year: year || movies[movieIndex].year // Gunakan tahun lama jika tahun baru tidak diisi
  };
  
  movies[movieIndex] = updatedMovie; // Timpa data lama dengan data baru

  res.status(200).json({ // Status 200: OK
    status: "success",
    message: `Data movie dengan ID ${id} berhasil diupdate`,
    data: updatedMovie
  });
};

// 5. DELETE /api/movies/:id (Hapus data)
exports.deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const movieIndex = movies.findIndex(m => m.id === id);

  // Validasi: Cek jika data TIDAK ada
  if (movieIndex === -1) {
    return res.status(404).json({ // Status 404: Not Found
      status: "fail",
      message: `Movie dengan ID ${id} tidak ditemukan, hapus gagal`
    });
  }

  // (Opsional) Simpan data yang akan dihapus untuk ditampilkan di respons
  const deletedMovie = movies[movieIndex];

  // Proses hapus data dari array
  movies.splice(movieIndex, 1);

  // Kirim respons 200 OK dengan pesan sukses
  res.status(200).json({ // Status 200: OK
    status: "success",
    message: `Data movie dengan ID ${id} (Judul: ${deletedMovie.title}) berhasil dihapus.`
  });
};