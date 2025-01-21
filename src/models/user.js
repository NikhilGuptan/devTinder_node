const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    skills: {
      type: [String],
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      validate: {
        validator: function (v) {
          return ["male", "female", "others"].includes(v.toLowerCase());
        },
        message: (props) => `${props.value} is not a valid gender!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
