const express = require("express")
const {connectDB} = require("./config/database");

const app = express();




connectDB().then(()=>{
    console.log("database connect succefuly");
    app.listen(3000,()=>{
        console.log("server is runing on ",3000)
    })
}).catch((err)=>{
    console.log("some error while connecting DB");
})
