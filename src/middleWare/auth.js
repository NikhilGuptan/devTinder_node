const User = require("../models/user");
const jwt = require('jsonwebtoken'); 

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    let decoded;
    try {
      decoded = jwt.verify(token, "mydev@tinder"); // Replace with your actual secret key
    } catch (err) {
      return res.status(401).send("Unauthorized: Invalid token=");
    }

    // Retrieve user ID from the decoded token
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    req.user = user;
    next()
  } catch (err) {
    res.status(400).send("err :", err.message);
  }
};
module.exports = {
  userAuth,
};
