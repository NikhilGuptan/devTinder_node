const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const { signUpbodyValidation } = require("../utils/validation");
const  {userAuth} = require("../middleWare/auth");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
      signUpbodyValidation(req);
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      console.log("passwordHash----->", passwordHash);
      const data = req.body;
      const user = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        emailId: data.emailId,
        password: passwordHash,
      });
      const skills = (data.skills || [])?.length;
      if (skills > 10) {
        throw new Error("Skills can not be more then 10");
      }
      const response = await user.save();
      res.send("user added succsfully");
    } catch (err) {
      res.status(400).send("Some error while saving user" + err.message);
    }
  });

  authRouter.post("/login", async (req, res) => {
    console.log("called is here-----------");
    try {
      const { emailId, password } = req.body;
  
      // Find user by email ID
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        return res.status(400).send("Invalid Credential");
      }
  
      // Check password validity
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).send("Invalid Credential");
      }
      const token = jwt.sign(
        { id: user._id },"mydev@tinder",{ expiresIn: "7d" });
      res.cookie("token", token);
  
      res.send("Login successfully");
    } catch (err) {
      res.status(400).send("Some error while logging in: " + err.message);
    }
  });


module.exports = authRouter;