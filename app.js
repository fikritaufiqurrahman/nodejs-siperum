const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("req-flash");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Router
const userRoute = require("./routes/route-user");
const loginRoutes = require("./routes/route-login");
const registerRoutes = require("./routes/route-register");
const appRoutes = require("./routes/route-app");

// Setting folder views
app.set("views", path.join(__dirname, "./views"));

// File Assets
app.use(express.static(path.join(__dirname, "static/assets")));

// Configurasi library session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "t@1k0ch3ng",
    name: "secretName",
    cookie: {
      sameSite: true,
      maxAge: 60000,
    },
  })
);
app.use(flash());

app.set("view engine", "ejs");

app.use("/", appRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/penduduk", userRoute);

app.listen(5000, () => {
  console.log("Server Berjalan di Port : 5000");
});
