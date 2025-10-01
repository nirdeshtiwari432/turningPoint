const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./error");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173", // React dev server
    credentials: true,               // allow cookies/sessions
  })
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Custom middlewares
require("./middleware/session")(app);
require("./middleware/passport")(app);



// Routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const mainRoutes = require("./routes/main");
app.use("/", mainRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

// 404 handler
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Global error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
