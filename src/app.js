const express = require("express")

const app = express();

app.use("/test",(req,res)=>{
    res.send("sended some data")
})

app.listen(3000,()=>{
    console.log("server is runing on ",3000)
})
