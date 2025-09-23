const mongoose = require("./db");
const { User, AvailableSeat, Session, Admin } = require("./schema"); // adjust path if needed
const { v4: uuidv4 } = require("uuid");

async function seedData() {
  try {
    // 1️⃣ Connect to DB
    await mongoose.connection;

    // 2️⃣ Clear old data
    await User.deleteMany({});
    await AvailableSeat.deleteMany({});
    await Session.deleteMany({});
    await Admin.deleteMany({});

    // 3️⃣ Insert 10 seats
    const seats = [];
    for (let i = 1; i <= 10; i++) {
      seats.push({
        seatNo: i,
        isBooked: false,
        timing: i % 3 === 0 ? "morning" : i % 2 === 0 ? "night" : "full_time",
      });
    }
    const savedSeats = await AvailableSeat.insertMany(seats);

    // 4️⃣ Insert 10 admins
    const admins = [];
    for (let i = 1; i <= 10; i++) {
      admins.push({
        name: `Admin${i}`,
        password: `admin${i}pass`,
        Number: 9000000000 + i,
      });
    }
    await Admin.insertMany(admins);

    // 5️⃣ Insert 10 users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const plan = i % 3 === 0 ? "part_time" : "full_time"; // choose plan
      const shift = plan === "part_time" ? (i % 2 === 0 ? "morning" : "night") : "full";

      users.push({
        name: `User${i + 1}`,
        email: `user${i + 1}@example.com`,
        number: 8000000000 + i,
        seat: savedSeats[i]._id,
        membershipType: i % 2 === 0 ? "reserved" : "non_reserved",
        plan: plan,
        shift: shift,
        password: `user${i + 1}pass`,
        fees: 500 + i * 50,
      });
    }
    const savedUsers = await User.insertMany(users);

    // 6️⃣ Insert 10 sessions (one per user)
    const sessions = [];
    for (let i = 0; i < 10; i++) {
      sessions.push({
        session_id: uuidv4(),
        user_id: savedUsers[i]._id,
      });
    }
    await Session.insertMany(sessions);

    console.log("✅ Seeding completed successfully!");
    process.exit(0);

  } catch (err) {
    console.error("❌ Error while seeding:", err);
    process.exit(1);
  }
}

seedData();
