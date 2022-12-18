const router = require("express").Router();
const { user } = require("../controllers");
const verifyUser = require("../configs/verify.js").isLogin;

// index
router.get("/", verifyUser, user.getAllUser);

// Tambah data user
router.get("/add", verifyUser, user.formAddUser);
router.post("/add", verifyUser, user.addUser);

// edit data user
router.get("/edit/:id", verifyUser, user.formEditUser);
router.post("/edit", verifyUser, user.editUser);

// hapus data user
router.get("/delete/:id", verifyUser, user.deleteUser);

module.exports = router;
