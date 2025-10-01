const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User, Admin } = require("../models");

module.exports = (app) => {
  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Set up strategies
  passport.use("user-local", new LocalStrategy(User.authenticate()));
  passport.use("admin-local", new LocalStrategy(Admin.authenticate()));

  // Serialize / deserialize
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

  // Make currentUser / currentAdmin available in all templates
  app.use((req, res, next) => {
    res.locals.currentUser = req.user instanceof User ? req.user : null;
    res.locals.currentAdmin = req.user instanceof Admin ? req.user : null;
    next();
  });
};
