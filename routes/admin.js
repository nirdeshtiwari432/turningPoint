const express = require("express");
const {User,AvailableSeat,Session, Admin} = require("../models/index");
const passport = require("passport");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin")

//helper function
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


 //admin login
router.get("/login",(req,res)=>{
    res.render("./admin/login.ejs")
})

router.post(
    "/login",
    passport.authenticate('admin-local',{failureRedirect:"/admin/login",failureFlash:true}),
    asyncHandler(async(req,res)=>{
    req.flash("success","Welcome Admin");
    res.render("admin/dashboard.ejs");
}))

//admin dashboard
router.get("/dashboard",isAdmin,(req,res)=>{
    res.render("admin/dashboard.ejs")
})

//add new member in library
router.get("/new/:id/:seatNo",isAdmin,(req,res)=>{ 
    let {id , seatNo} =  req.params;
    console.log(id)
    res.render("admin/new.ejs" , {id,seatNo})
})

router.post("/new",isAdmin,asyncHandler(async(req,res)=>{
    let member = req.body.member;
    let pass = req.body.pass;
    let addUser = new User(member)
    let newUser = await User.register(addUser,pass.password)
    console.log(newUser)
}))

//show seat details
router.get("/seats",isAdmin,asyncHandler(async(req,res)=>{
    const filter = req.query.filter;
    let query = {};

    if (filter === "booked") {
       query.isBooked = true;
       }
    else if (filter === "notBooked") {
      query.isBooked = false;
       } 
    else if (filter === "registered") {
       query.bookedBy = { $ne: null }; // has a user
       } 
    else if (filter === "notRegistered") {
    query.bookedBy = null; // no user
       }

     const seats = await AvailableSeat.find(query).populate("bookedBy");
     res.render("admin/seats", { seats, filter });
}));

//show member details
router.get("/members",isAdmin,asyncHandler(async(req,res)=>{
    const members = await User.find({}).populate("seat");;
    res.render("admin/members.ejs",{members})
}))

//user detail in particular
router.get("/users/:id",isAdmin,asyncHandler(async (req,res)=>{
    let {id} = req.params;
    let user = await User.findById(id).populate("seat");
    res.render("admin/show",{user})
}))



//edit user detail in particular
router.get("/users/:id/edit",isAdmin,(req,res)=>{  
})


//delete user detail in particular
router.get("/users/:id/delete",isAdmin,(req,res)=>{
})

//Logout
router.get("/logout",(req,res,next)=>{
    try{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","you are logged out")
        res.redirect("/")
    })}catch(err){
        console.log(err)
    }
})

module.exports = router;