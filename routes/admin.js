const express = require("express");
const {User,AvailableSeat,Session, Admin} = require("../schema");
const router = express.Router();

//helper function
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


 //admin login
router.get("/login",(req,res)=>{
    res.render("./admin/login.ejs")
})

router.post("/login",(req,res)=>{
    res.render("admin/login.ejs")
})

//admin dashboard
router.get("/dashboard",(req,res)=>{
    res.render("admin/dashboard.ejs")
})

//add new member in library
router.get("/new",(req,res)=>{ 
    console.log("new")
    res.render("admin/new.ejs")
})

router.post("/new",(req,res)=>{
    let member = req.body.member;
    console.log(member)
})

//show seat details
router.get("/seats",asyncHandler(async(req,res)=>{
    const seats = await AvailableSeat.find({}).populate("bookedBy");;
    res.render("admin/seats.ejs",{seats});
}));

//show member details
router.get("/members",asyncHandler(async(req,res)=>{
    const members = await User.find({}).populate("seat");;
    console.log(members)
    res.render("admin/members.ejs",{members})
}))

//user detail in particular
router.get("/users/:id",(req,res)=>{
    let {id} = req.params;
    res.render("user.ejs")
})

//edit user detail in particular
router.get("/users/:id/edit",(req,res)=>{  
})


//delete user detail in particular
router.get("/users/:id/delete",(req,res)=>{
})

module.exports = router;