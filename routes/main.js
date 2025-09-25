const express = require("express");
const router = express.Router();
const path = require("path");
//main website


router.get("/",(req,res)=>{
    res.render("index.ejs")

})

router.get("/pricing",(req,res)=>{
    res.render("pricing.ejs")
})

router.get("/privacy",(req,res)=>{

    res.sendFile(path.join(__dirname, "../public/html/privacy.html"));
})

router.get("/term",(req,res)=>{
    res.sendFile(path.join(__dirname, "../public/html/term.html"));
})

module.exports = router;