// seedWithPasswords.js
require("dotenv").config();
const mongoose = require("mongoose");
const { User, Admin, AvailableSeat, Plan, BankDetails } = require("./models"); // adjust path if needed

mongoose.set("strictQuery", false);

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("✅ Connected to MongoDB Atlas");
}

async function clearCollections() {
  // only remove demo data to be safe in production (use with caution)
  await Promise.all([
    User.deleteMany({}), // remove all users (if you only want demo users, change the filter)
    Admin.deleteMany({}),
    AvailableSeat.deleteMany({}),
    Plan.deleteMany({}),
    BankDetails.deleteMany({}),
  ]);
  console.log("🧹 Cleared target collections (users, admins, seats, plans, bankdetails)");
}

async function seedData() {
  try {
    await connectDB();

    // OPTIONAL: clear existing demo data
    // Be careful: this deletes all documents in these collections.
    await clearCollections();

    // --- SEATS ---
    const seats = await AvailableSeat.insertMany([
      { seatNo: 1, isBooked: false, timing: "full_time" },
      { seatNo: 2, isBooked: false, timing: "morning" },
      { seatNo: 3, isBooked: false, timing: "night" },
    ]);
    console.log("✅ Demo Seats added");

    // --- PLANS ---
    const plans = await Plan.insertMany([
      {
        title: "Full-Time Plan",
        price: 1500,
        category: "seat",
        timing: "full_time",
        duration: "30 days",
        reserved: true,
      },
      {
        title: "Part-Time Plan",
        price: 1000,
        category: "seat",
        timing: "morning",
        duration: "15 days",
        reserved: false,
      },
      {
        title: "Long-Term Plan",
        price: 4000,
        category: "longterm",
        duration: "90 days",
        reserved: true,
      },
    ]);
    console.log("✅ Demo Plans added");

    // --- USERS (create with passport-local-mongoose so password hashing works) ---
    // Example plain-text passwords (change before production)
    const demoUsers = [
      {
        data: {
          name: "Rohit Sharma",
          email: "rohit@example.com",
          number: "9990001111",
          membershipType: "reserved",
          plan: "full_time",
          shift: "morning",
          fees: 1500,
          feeStatus: true,
        },
        password: "password123",
      },
      {
        data: {
          name: "Priya Verma",
          email: "priya@example.com",
          number: "8881112222",
          membershipType: "non_reserved",
          plan: "part_time",
          shift: "night",
          fees: 1000,
          feeStatus: false,
        },
        password: "password123",
      },
      {
        data: {
          name: "Aman Gupta",
          email: "aman@example.com",
          number: "7773334444",
          membershipType: "reserved",
          plan: "full_time",
          shift: "full",
          fees: 2000,
          feeStatus: true,
        },
        password: "password123",
      },
    ];

    const createdUsers = [];
    for (const u of demoUsers) {
      // create user instance (do NOT include password field here)
      const newUser = new User(u.data);
      // register user with passport-local-mongoose which hashes the password
      const created = await User.register(newUser, u.password);
      createdUsers.push(created);
    }
    console.log("✅ Demo Users (with hashed passwords) added");

    // --- BANK DETAILS (reference users) ---
    const bankDetails = await BankDetails.insertMany([
      {
        user: createdUsers[0]._id,
        accountHolder: "Rohit Sharma",
        upiMobile: "9990001111",
        plan: "Gold Plan",
        amount: 1500,
        verified: true,
      },
      {
        user: createdUsers[1]._id,
        accountHolder: "Priya Verma",
        upiMobile: "8881112222",
        plan: "Silver Plan",
        amount: 1000,
        verified: false,
      },
      {
        user: createdUsers[2]._id,
        accountHolder: "Aman Gupta",
        upiMobile: "7773334444",
        plan: "Platinum Plan",
        amount: 2000,
        verified: true,
      },
    ]);
    console.log("✅ Demo Bank Details added");

    // --- ADMINS (also register so password is hashed) ---
    const demoAdmins = [
      { data: { name: "Super Admin", mobile: "9999999999" }, password: "adminpass123" },
      { data: { name: "Staff Admin", mobile: "8888888888" }, password: "adminpass123" },
      { data: { name: "Finance Admin", mobile: "7777777777" }, password: "adminpass123" },
    ];

    const createdAdmins = [];
    for (const a of demoAdmins) {
      const newAdmin = new Admin(a.data);
      const createdAdmin = await Admin.register(newAdmin, a.password);
      createdAdmins.push(createdAdmin);
    }
    console.log("✅ Demo Admins (with hashed passwords) added");

    console.log("\n🎉 All demo data inserted successfully!");
    console.log("Demo user credentials (number : password):");
    demoUsers.forEach((u) => console.log(`${u.data.number} : ${u.password}`));
    console.log("Demo admin credentials (mobile : password):");
    demoAdmins.forEach((a) => console.log(`${a.data.mobile} : ${a.password}`));
  } catch (error) {
    console.error("❌ Error inserting demo data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
}

seedData();
