const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require('cookie-parser') 
const  {userAuth} = require("./middleWare/auth");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/", userRouter);


const User = require("./models/user");

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
