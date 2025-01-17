const mongoose =  require("mongoose");


const UserShema = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    }
})

const User = mongoose.model("User",UserShema);

module.exports = User;