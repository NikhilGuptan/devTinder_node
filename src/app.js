const express = require("express")
const {connectDB} = require("./config/database");

const app = express();

const User = require("./models/user");

app.post("/signup",async (req,res)=>{
    const userData = {
        firstName:"rohanji",
        lastName:"pandayji",
        emailId:"rohan@panday.com",
        password:"rohanPanday@"
    }

    const user = new User(userData);

    try{
        await user.save();
        res.send("user added succsfully")
    }
    catch(err){
        res.status(400).send("Some error while saving user")
    }
})


connectDB().then(()=>{
    console.log("database connect succefuly");
    app.listen(3000,()=>{
        console.log("server is runing on ",3000)
    })
}).catch((err)=>{
    console.log("some error while connecting DB");
})
