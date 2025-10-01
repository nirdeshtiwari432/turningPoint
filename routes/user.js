const express = require("express");
const {User,AvailableSeat,Session, Admin} = require("../models/index");
const passport = require("passport");
const router = express.Router();
const upload = require("../middleware/upload");


//helper function
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

//user 
router.get("/login",(req,res)=>{
    res.render("user/login.ejs")
})

router.post("/login",
    passport.authenticate('user-local',{failureRedirect:"/user/login",failureFlash:true}),
    asyncHandler(async (req,res)=>{
            let user = await req.user
            req.flash("success","Welcome User");
            console.log(user)
            res.render("user/user.ejs",{user}); 
}))

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

const fs = require("fs");
const path = require("path");

router.post("/profile-pic", upload.single("profilePic"), async (req, res) => {
  try {
    if (!req.file) {
      req.flash("error", "Please upload an image!");
      return res.render("user/user.ejs",{user: req.user});
    }
    let user = req.user
    // Delete previous profile picture if exists
    if (user.profilePic) {
      const oldPath = path.join(__dirname, "../public", user.profilePic);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Save new profile picture
    user.profilePic = "/uploads/" + req.file.filename;
    await user.save();

    req.flash("success", "Profile picture updated!");
    return res.render("user/user.ejs",{user: req.user});
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong!");
    return res.render("user/user.ejs",{user: req.user});
  }
});


module.exports =router;