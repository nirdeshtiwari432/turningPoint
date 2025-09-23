const mongoose = require("./db");

//User Schema

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    number:{
        type:Number,
        required:true,
    },
    seat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AvailableSeat",
        required: true
    },
    membershipType: {
        type: String,
        enum: ["reserved", "non_reserved"],
        required: true
    },
    plan: {
        type: String,
        enum: ["full_time", "part_time"],
        required: true
    },
    shift: {
        type: String,
        enum: ["morning", "night","full"], // null if full_time
        default: "full"
    },
    password:{
        type:String,
        required:true
    },
    fees: {
         type: Number, 
         required: true 
        }
    
})


// Admin Schema

const admin = new mongoose.Schema({
    name:String,
    password:String,
    Number:Number
})


//session 

const session = new mongoose.Schema({
    session_id:{ 
        type: String,
        required: true 
    },
    user_id:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
         type: Date,
         default: Date.now,
         expires: "2h" }
});


//Available seat

const availableSeat = new mongoose.Schema({
  seatNo: {
     type: Number,
     required: true, 
     unique: true },
  isBooked: { 
    type: Boolean, 
    default: false
 },
  bookedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    default: null },
    
    timing: { 
        type: String, 
        enum: ["full_time", "morning", "night"], 
        default: "full_time" }
})






const User = mongoose.model("User",user)
const AvailableSeat = mongoose.model("AvailableSeat",availableSeat)
const Session = mongoose.model("Session",session)
const Admin = mongoose.model("Admin",admin)
const obj = {
  User,
  AvailableSeat,
  Session,
  Admin
};

// let newuser = new User({
//     name :"Nirdesh Tiwari",
//     email:"nirdesh26cs081@satiengg.in",
//     number:6268210264,
//     seatNo:20,
//     fees:550,
//     password:1234,
//     timing:"full time"

// })

// let addUser = async()=>{
//     let res = await newuser.save()
//     console.log(res)
// }
// addUser()







module.exports =obj



