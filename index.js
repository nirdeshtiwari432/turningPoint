const express = require("express");
const app = express();
const db = require("./db");
const {User,AvailableSeat,Session, Admin} = require("./schema");
const path = require("path");
const ejsMate = require("ejs-mate");
const { default: mongoose } = require("./db");


app.use(express.urlencoded({extended :true}));
app.use(express.json());


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}))
app.engine("ejs",ejsMate)

//helper function
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


//main website
app.get("/",(req,res)=>{
    res.render("index.ejs")

})

app.get("/pricing",(req,res)=>{
    res.render("pricing.ejs")
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
    res.render("./admin/dashboard.ejs")
})

app.get("/admin/new",(req,res)=>{
    //add new member in library
    console.log("new")
    res.render("./admin/new.ejs")
})

app.post("/admin/new",(req,res)=>{
    let member = req.body.member;
    console.log(member)

    
})

//show seat details
app.get("/admin/seats",asyncHandler(async(req,res)=>{
    const seats = await AvailableSeat.find({}).populate("bookedBy");;
    res.render("admin/seats.ejs",{seats});
}));

//show member details
app.get("/admin/members",asyncHandler(async(req,res)=>{
    const members = await User.find({}).populate("seat");;
    console.log(members)
    res.render("admin/members.ejs",{members})
}))

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
