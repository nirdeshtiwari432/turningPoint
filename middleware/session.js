const session = require("express-session");
const flash = require("connect-flash");

const sessionOptions = {
  secret: "mysecret",
  resave: false,
  saveUninitialized: false, // changed
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
  },
};

module.exports = (app) => {
  app.use(session(sessionOptions));
  app.use(flash());

  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
  });
};
