const mongoose = require("./db"); // adjust path if needed
const Admin = require("./models/admin"); // adjust path if needed

async function createDemoAdmin() {
  try {
    await mongoose.connection; // ensure DB connection

    // Check if demo admin already exists
    const existing = await Admin.findOne({ mobile: "123456789" });
    if (existing) {
      console.log("Demo admin already exists!");
      return process.exit(0);
    }

    // Create demo admin
    const admin = new Admin({ name: "Demo Admin", mobile: "123456789" });
    await Admin.register(admin, "1234"); // passport-local-mongoose method

    console.log("Demo admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createDemoAdmin();
