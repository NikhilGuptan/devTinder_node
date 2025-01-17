const mongoose = require('mongoose');


const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://nikhilGupta:somepassword@learing.v31ar.mongodb.net/?retryWrites=true&w=majority&appName=learing/devTinder")
}


module.exports = {
    connectDB
}