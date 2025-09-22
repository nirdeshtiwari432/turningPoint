const express = require("express");
const app = express();
const db = require("./db");
const {User,AvailableSeat,Session, Admin} = require("./schema");
const path = require("path");
const ejsMate = require("ejs-mate")


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}))
app.engine("ejs",ejsMate)


//main website
app.get("/",(req,res)=>{
    res.render("index.ejs")

})

app.get("/pricing",(req,res)=>{
    res.sendFile(path.join(__dirname, "public/html/pricing.html"));
})

app.get("/privacy",(req,res)=>{
    
    res.sendFile(path.join(__dirname, "public/html/privacy.html"));
})

app.get("/term",(req,res)=>{
    res.sendFile(path.join(__dirname, "public/html/term.html"));
})

//admin
app.get("/admin/login",(req,res)=>{
    //admin login
    res.render("./admin/login.ejs")
})
app.post("/admin/login",(req,res)=>{
    //admin login
    res.render("./admin/login.ejs")
})

app.get("/admin/dashboard",(req,res)=>{
    //admin dashboard
})

app.get("/admin/new",(req,res)=>{
    //add new member in library
    res.render("./admin/new.ejs")
})

app.post("/admin/new",(req,res)=>{
    //save new member in db

    
})

app.get("/admin/seat",(req,res)=>{
    //show all seat detail
})

app.get("/admin/users",(req,res)=>{
    //show all user detail in table format
})

app.get("/admin/users/:id",(req,res)=>{
    //user detail in particular
    let {id} = req.params;
    res.render("user.ejs")
})
app.get("/admin/users/:id/edit",(req,res)=>{
    //edit user detail in particular
  
})

app.get("/admin/users/:id/delete",(req,res)=>{
    //delete user detail in particular
  
})

//user 
app.get("/user/login",(req,res)=>{
    res.render("login.ejs")
})

app.post("/user/login",(req,res)=>{
    console.log(req.body.user)
})

app.get("/user/profile",(req,res)=>{
    //profile 
})

app.get("/user/fees",(req,res)=>{
    //pay fess 
})

app.get("/user/logout",(req,res)=>{
    //logout
})



app.listen(8080,()=>{
    console.log("listen..")
})
