const express = require("express");
const app = express();
const mongoose = require("mongoose")
mongoose.set('strictQuery', false);

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/turningpoint");
    
}

main().then((res)=>{
   console.log("success")
})
.catch((err)=>console.log(err))

module.exports = mongoose;
