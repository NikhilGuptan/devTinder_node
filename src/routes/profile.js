const express = require("express");
const  {userAuth} = require("../middleWare/auth");
const {validateProfileUpdateReq} = require("../utils/validation")

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

  profileRouter.patch("/profile/edit", userAuth ,async (req, res) => {
    try {
        
        if(!validateProfileUpdateReq(req)){
            throw new Error("Update not allowed on this field.")
        }

      const logedInUser = req.user;
      Object.keys(req.body).forEach((key)=>(logedInUser[key]=req.body[key]));
      await logedInUser.save();
      res.send({
        message: "Profile data updated successfully",
        logedInUser,
      });
    } catch (err) {
      res.status(500).send("Something went wrong: " + err.message);
    }
  });


module.exports = profileRouter;