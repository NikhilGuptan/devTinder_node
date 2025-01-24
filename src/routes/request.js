const express = require("express");
const  {userAuth} = require("../middleWare/auth");

const requestRouter = express.Router();


requestRouter.get("/sendConcetionRequest", userAuth ,async (req, res) => {
    try {
  
      const user = req.user;
      res.send(`concetion Request send from : ${user.firstName}`);
    } catch (err) {
      res.status(500).send("Something went wrong: " + err.message);
    }
  });



module.exports = requestRouter;
