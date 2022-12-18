// Definisikan configurasi Database
const config = require("../configs/database");
// Gunakan library mysql
let mysql = require("mysql");
// Buat koneksi
let pool = mysql.createPool(config);

// Kirim error jika koneksi gagal
pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  // Fungsi untuk merender file register yang ada pada folder 'src/views/register.ejs'
  formRegister(req, res) {
    res.render("register", {
      // Definisikan semua varibel yang ingin ikut dirender kedalam register.ejs
      url: "http://localhost:5000/",
    });
  },
  // Fungsi untuk menyimpan data
  saveRegister(req, res) {
    let data = {
      nama_anggota: req.body.name,
      nik: req.body.nik,
      no_tlp: req.body.no_tlp,
      gender: req.body.gender,
      username: req.body.username,
      password: req.body.password,
      no_rumah: req.body.no_rumah,
    };
    // Panggil koneksi dan eksekusi query
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO users set ?`,
        [data],
        function (error, results) {
          if (error) throw error;
          // Kembali kehalaman login
          res.redirect("/login");
        }
      );
      // Koneksi selesai
      connection.release();
    });
  },
};
