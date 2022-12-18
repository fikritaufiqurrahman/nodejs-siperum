const config = require("../configs/database");

let mysql = require("mysql");
let pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  // Render tampilan untuk login yang ada didalam folder 'src/views/login.ejs'
  login(req, res) {
    res.render("login", {
      url: "http://localhost:5000/",
    });
  },
  // Post / kirim data yang diinput user
  loginAuth(req, res) {
    let username = req.body.username;
    let password = req.body.pass;
    if (username && password) {
      pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
          `SELECT * FROM users WHERE username = ? AND password = ?`,
          [username, password],
          function (error, results) {
            if (error) throw error;
            if (results.length > 0) {
              // Jika data ditemukan, set sesi user tersebut menjadi true
              req.session.loggedin = true;
              req.session.userid = results[0].id;
              req.session.name = results[0].nama_anggota;
              req.session.username = results[0].username;
              res.redirect("/");
            } else {
              // Jika data tidak ditemukan redirect ke hhalaman login

              res.redirect("/login");
            }
          }
        );
        connection.release();
      });
    } else {
      res.redirect("/login");
      res.end();
    }
  },
  // Fungsi untuk logout | Cara memanggilnya menggunakan url/rute 'http://localhost:5050/login/logout'
  logout(req, res) {
    // Hapus sesi user dari broser
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      // Hapus cokie yang masih tertinggal
      res.clearCookie("secretname");
      res.redirect("/login");
    });
  },
};
