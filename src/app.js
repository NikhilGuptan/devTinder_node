const express = require("express")

const app = express();


app.get("/user",(req,res)=>{
    res.send({username:"someUser",pass:"pass key"})
})


app.post("/user",(req,res)=>{
    res.send("Data added successfully")
})

app.delete("/user",(req,res)=>{
    res.send("Data Deleted successfully")
})


app.get("/test",(req,res)=>{
    res.send("calling for test")
})



app.listen(3000,()=>{
    console.log("server is runing on ",3000)
})
