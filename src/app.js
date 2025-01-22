const express = require("express");
const { connectDB } = require("./config/database");
const { signUpbodyValidation } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken'); 
const  {userAuth} = require("./middleWare/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());


const User = require("./models/user");

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth ,async (req, res) => {
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

app.get("/sendConcetionRequest", userAuth ,async (req, res) => {
    try {
  
      const user = req.user;
      res.send(`concetion Request send from : ${user.firstName}`);
    } catch (err) {
      res.status(500).send("Something went wrong: " + err.message);
    }
  });


app.post("/users", async (req, res) => {
  const email = req.body.emailId;

  try {
    const usersData = await User.find({ emailId: email });
    res.send(usersData);
  } catch (err) {
    res.status(400).send("Something went wroung");
  }
});

app.post("/deleteUser", async (req, res) => {
  const userId = req.body.userId;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log("deleted user--------->", deletedUser);
    res.send("user Deleted successfyllu");
  } catch (err) {
    res.status(400).send("Something went wroung");
  }
});

app.post("/updateUser", async (req, res) => {
  const userId = req.body._id;
  const body = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, body);
    if (updatedUser) {
      res.send("user Updated successfyllu");
    } else {
      res.status(401).send("User not found");
    }
  } catch (err) {
    res.status(400).send("Something went wroung");
  }
});

app.get("/feed", async (req, res) => {
  const email = req.body.emailId;

  try {
    const usersData = await User.find({});
    res.send(usersData);
  } catch (err) {
    res.status(400).send("Something went wroung");
  }
});

app.post("/findDataById", async (req, res) => {
  const id = req.body.id;

  try {
    const usersData = await User.findById(id);
    res.send(usersData);
  } catch (err) {
    res.status(400).send("Something went wroung");
  }
});

connectDB()
  .then(() => {
    console.log("database connect succefuly");
    app.listen(3000, () => {
      console.log("server is runing on ", 3000);
    });
  })
  .catch((err) => {
    console.log("some error while connecting DB");
  });
