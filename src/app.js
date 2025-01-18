const express = require("express")
const {connectDB} = require("./config/database");

const app = express();

app.use(express.json());

const User = require("./models/user");

app.post("/signup",async (req,res)=>{
    const data = req.body;
    const user = new User(data);
    try{
        await user.save();
        res.send("user added succsfully")
    }
    catch(err){
        res.status(400).send("Some error while saving user")
    }
})


app.post("/users",async (req,res)=>{
    const email = req.body.emailId;

    try{
       const usersData =  await User.find({emailId:email});
       res.send(usersData);

    }catch(err){
        res.status(400).send("Something went wroung")
    }
})

app.post("/deleteUser",async (req,res)=>{
    const userId = req.body.userId;

    try{
       const deletedUser =  await User.findByIdAndDelete(userId);
       console.log("deleted user--------->",deletedUser)
       res.send("user Deleted successfyllu");

    }catch(err){
        res.status(400).send("Something went wroung")
    }
})


app.get("/feed",async (req,res)=>{
    const email = req.body.emailId;

    try{
       const usersData =  await User.find({});
       res.send(usersData);

    }catch(err){
        res.status(400).send("Something went wroung")
    }
})

app.post("/findDataById",async (req,res)=>{
    const id = req.body.id;

    try{
       const usersData =  await User.findById(id);
       res.send(usersData);

    }catch(err){
        res.status(400).send("Something went wroung")
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
