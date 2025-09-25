const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const user = require("./routes/user")
const admin = require("./routes/admin")
const main = require("./routes/main");


app.use(express.urlencoded({extended :true}));
app.use(express.json());


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}))
app.engine("ejs",ejsMate)

app.use("/",main)
app.use("/user",user);
app.use("/admin",admin);



app.listen(8080,()=>{
    console.log("listen..")
})
