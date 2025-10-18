// seedWithPasswords.js
require("dotenv").config();
const mongoose = require("mongoose");
const { User, Admin, AvailableSeat, Plan, BankDetails } = require("./models");

mongoose.set("strictQuery", false);

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ Connected to MongoDB Atlas");
}

async function clearCollections() {
  await Promise.all([
    User.deleteMany({}),
    Admin.deleteMany({}),
    AvailableSeat.deleteMany({}),
    Plan.deleteMany({}),
    BankDetails.deleteMany({}),
  ]);
  console.log("🧹 Cleared target collections (users, admins, seats, plans, bankdetails)");
}

// ✅ valid shifts according to your schema
function generateUsers() {
  const users = [];
  const shifts = ["morning", "night", "full"];
  for (let i = 1; i <= 50; i++) {
    const name = `User${i}`;
    const email = `user${i}@example.com`;
    const number = `9${String(100000000 + i).padStart(9, "0")}`;
    const membershipType = i % 2 === 0 ? "reserved" : "non_reserved";
    const plan = i % 3 === 0 ? "part_time" : "full_time";
    const shift = shifts[i % 3]; // ✅ matches schema
    const fees = plan === "full_time" ? 1500 : 1000;
    const feeStatus = i % 4 !== 0; // 75% true
    const password = "password123";

    users.push({
      data: {
        name,
        email,
        number,
        membershipType,
        plan,
        shift,
        fees,
        feeStatus,
      },
      password,
    });
  }
  return users;
}

async function seedData() {
  try {
    await connectDB();
    await clearCollections();

    // --- SEATS ---
    await AvailableSeat.insertMany([
      { seatNo: 1, isBooked: false, timing: "full_time" },
      { seatNo: 2, isBooked: false, timing: "morning" },
      { seatNo: 3, isBooked: false, timing: "night" },
    ]);
    console.log("✅ Demo Seats added");

    // --- PLANS ---
    await Plan.insertMany([
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

    // --- USERS ---
    const demoUsers = generateUsers();
    const createdUsers = [];

    for (const u of demoUsers) {
      const newUser = new User(u.data);
      const created = await User.register(newUser, u.password); // passport-local-mongoose handles hashing
      createdUsers.push(created);
    }

    console.log("✅ 50 Users (with hashed passwords) added");

    // --- BANK DETAILS ---
    const bankRecords = createdUsers.map((user, index) => ({
      user: user._id,
      accountHolder: user.name,
      upiMobile: user.number,
      plan: user.plan === "full_time" ? "Gold Plan" : "Silver Plan",
      amount: user.fees,
      verified: index % 2 === 0,
    }));

    await BankDetails.insertMany(bankRecords);
    console.log("✅ 50 Bank Details linked to users added");

    // --- ADMINS ---
    const demoAdmins = [
      { data: { name: "Super Admin", mobile: "9999999999" }, password: "adminpass123" },
      { data: { name: "Staff Admin", mobile: "8888888888" }, password: "adminpass123" },
      { data: { name: "Finance Admin", mobile: "7777777777" }, password: "adminpass123" },
    ];

    for (const a of demoAdmins) {
      const newAdmin = new Admin(a.data);
      await Admin.register(newAdmin, a.password);
    }
    console.log("✅ Demo Admins added");

    console.log("\n🎉 All demo data inserted successfully!");
    console.log("Sample user credential (number : password):");
    console.log(`${createdUsers[0].number} : password123`);
  } catch (error) {
    console.error("❌ Error inserting demo data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
}

seedData();
