const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
require("dotenv").config();

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "mysecret",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // Atlas connection
        collectionName: "sessions",
        ttl: 7 * 24 * 60 * 60, // 7 days
      }),
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // only HTTPS in prod
        sameSite: "lax",
      },
    })
  );

  app.use(flash());

  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
  });
};
