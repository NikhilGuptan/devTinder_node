

const adminAuth = (req,res,next)=>{
    const token = "abcfdfds";
    const isTokenValid = token==="abc";

    if(isTokenValid){
        next();
    }else{
        res.status(401).send("token is not valid")
    }
}


const userAuth = (req,res,next)=>{
    const token = "abcfdfds";
    const isTokenValid = token==="abc";

    if(isTokenValid){
        next();
    }else{
        res.status(401).send("token is not valid")
    }
}

module.exports = {
    adminAuth,
    userAuth
}