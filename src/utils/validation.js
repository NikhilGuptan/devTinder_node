const validate = require("validator");

const signUpbodyValidation = (req) =>{
    const {firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName || !emailId || !password){
        throw new Error("Some field are missign");
    }

    if(firstName.length<4 || firstName.length>50){
        throw new Error("the length of firstName should be 4 to 50 Cracter");
    }
    if(lastName.length<4 || lastName.length>50){
        throw new Error("the length of lastName should be 4 to 50 Cracter");
    }
    if(!validate.isEmail(emailId)){
        throw new Error("Email Id is not valid");
    }
}


module.exports = {
    signUpbodyValidation
}