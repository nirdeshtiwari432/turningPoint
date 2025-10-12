const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User, Admin } = require("../models");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // User strategy
  passport.use("user-local", new LocalStrategy(
    { usernameField: "number", passwordField: "password" },
    async (number, password, done) => {
      try {
        const user = await User.findOne({ number });
        if (!user) return done(null, false, { message: "Number not registered" });

        const isMatch = await user.authenticate(password);
        if (!isMatch.user) return done(null, false, { message: "Incorrect password" });

        return done(null, isMatch.user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  // Admin strategy
  passport.use("admin-local", new LocalStrategy(
    { usernameField: "mobile", passwordField: "password" },
    async (mobile, password, done) => {
      try {
        const admin = await Admin.findOne({ mobile });
        if (!admin) return done(null, false, { message: "Number not registered" });

        const isMatch = await admin.authenticate(password);
        if (!isMatch.user) return done(null, false, { message: "Incorrect password" });

        return done(null, isMatch.user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  // Serialize & deserialize
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

  // Set locals
  app.use((req, res, next) => {
    res.locals.currentUser = req.user instanceof User ? req.user : null;
    res.locals.currentAdmin = req.user instanceof Admin ? req.user : null;
    next();
  });
};
