const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getAllUser(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      var query = "SELECT * FROM users";

      connection.query(query, function (error, results) {
        if (error) throw error;
        res.render("userlist", {
          data: results,
          url: "http://localhost:5000/",
          userName: req.session.username,
        });
      });
      connection.release();
    });
  },
  // Ambil data user berdasarkan ID
  getUserById(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
                SELECT * FROM users WHERE id = ?;
                `,
        [id],
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil ambil data!",
            data: results,
          });
        }
      );
      connection.release();
    });
  },
  // Form add User
  formAddUser(req, res) {
    res.render("tambahuser", {
      // Definisikan semua varibel yang ingin ikut dirender kedalam register.ejs
      url: "http://localhost:5000/",
      userName: req.session.username,
    });
  },
  // Simpan data user
  addUser(req, res) {
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
          res.redirect("/penduduk");
        }
      );
      // Koneksi selesai
      connection.release();
    });
  },
  // Form add User
  formEditUser(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      let query = `select * from users where id = ${id}`;
      connection.query(query, function (error, results) {
        if (error) throw error;
        // console.log({data: results});
        res.render("edituser", {
          id: results[0].id,
          nama_anggota: results[0].nama_anggota,
          nik: results[0].nik,
          no_tlp: results[0].no_tlp,
          gender: results[0].gender,
          username: results[0].username,
          no_rumah: results[0].no_rumah,
          password: results[0].password,
          url: "http://localhost:5000/",
          userName: req.session.username,
        });
      });
      connection.release();
    });
  },
  // Update data penduduk
  editUser(req, res) {
    let dataEdit = {
      nama_anggota: req.body.name,
      nik: req.body.nik,
      no_tlp: req.body.no_tlp,
      gender: req.body.gender,
      no_rumah: req.body.no_rumah,
      username: req.body.username,
      password: req.body.password,
    };
    let id = req.body.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
                UPDATE users SET ? WHERE id = ?;
                `,
        [dataEdit, id],
        function (error, results) {
          if (error) throw error;
          res.redirect("/penduduk");
        }
      );
      connection.release();
    });
  },
  // Delete data penduduk
  deleteUser(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
                DELETE FROM users WHERE id = ?;
                `,
        [id],
        function (error, results) {
          if (error) throw error;
          res.redirect("/");
        }
      );
      connection.release();
    });
  },
};
