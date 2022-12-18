module.exports = {
  home(req, res) {
    res.render("index", {
      url: "http://localhost:5000/",
      userName: req.session.username,
      name: req.session.name,
    });
  },
};
