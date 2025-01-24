const express = require("express");
const  {userAuth} = require("../middleWare/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth ,async (req, res) => {
    try {
  
      const user = req.user;
      res.send({
        message: "Profile data retrieved successfully",
        user,
      });
    } catch (err) {
      res.status(500).send("Something went wrong: " + err.message);
    }
  });


module.exports = profileRouter;