const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User, Admin } = require("../models");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // User strategy (login with mobile)
  passport.use(
    "user-local",
    new LocalStrategy(
      { usernameField: "mobile", passwordField: "password" }, // use mobile
      async (mobile, password, done) => {
        try {
          const user = await User.findOne({ mobile });
          if (!user) return done(null, false, { message: "Mobile not registered" });

          const isMatch = await user.authenticate(password); // passport-local-mongoose authenticate
          if (!isMatch.user) return done(null, false, { message: "Incorrect password" });

          return done(null, isMatch.user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Admin strategy (same as before)
  passport.use(
    "admin-local",
    new LocalStrategy(
      { usernameField: "mobile", passwordField: "password" },
      async (mobile, password, done) => {
        try {
          const admin = await Admin.findOne({ mobile });
          if (!admin) return done(null, false, { message: "Mobile not registered" });

          const isMatch = await admin.authenticate(password);
          if (!isMatch.user) return done(null, false, { message: "Incorrect password" });

          return done(null, isMatch.user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((entity, done) => {
    done(null, { id: entity.id, type: entity instanceof User ? "User" : "Admin" });
  });

  passport.deserializeUser((obj, done) => {
    if (obj.type === "User") {
      User.findById(obj.id).then(user => done(null, user)).catch(done);
    } else {
      Admin.findById(obj.id).then(admin => done(null, admin)).catch(done);
    }
  });

  app.use((req, res, next) => {
    res.locals.currentUser = req.user instanceof User ? req.user : null;
    res.locals.currentAdmin = req.user instanceof Admin ? req.user : null;
    next();
  });
};
