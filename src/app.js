const express = require("express")

const app = express();


app.get("/user",(req,res,next)=>{
    next()
    // res.send("handle first route function")
},
(req,res,next)=>{
    next()
    // res.send("handle first route function 2")
},
(req,res,next)=>{
    next()
    // res.send("handle first route function 3")
},
(req,res,next)=>{
    next()
    // res.send("handle first route function 4")
},
(req,res,next)=>{
    next()
    res.send("handle first route function 5")
})



app.listen(3000,()=>{
    console.log("server is runing on ",3000)
})
