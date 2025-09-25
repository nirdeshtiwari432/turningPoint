const express = require("express");
const {User,AvailableSeat,Session, Admin} = require("../schema");
const router = express.Router();


//user 
router.get("/login",(req,res)=>{
    res.render("user/login.ejs")
})

router.post("/login",(req,res)=>{
    console.log(req.body.user)
})

router.get("/profile",(req,res)=>{
    //profile 
})

router.get("/fees",(req,res)=>{
    //pay fess 
})

router.get("/logout",(req,res)=>{
    //logout
})

router.get("/review",(req,res)=>{
    res.render("review.ejs");
})

module.exports =router;