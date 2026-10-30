const jwt = require("jsonwebtoken");
const {User} = require("../models/user");

const userAuth = async (req,res,next) => {
   try{
           const {token} = req.cookies;
   
           if(!token){
               throw new Error("Invalid token!!");
           }
   
           //validating the token
           const decodeMessage = await jwt.verify(token,"DEV@meet$786");
           const {_id} = decodeMessage;
   
           const user = await User.findById(_id);
            if(!user){
               throw new Error("User does not exist!!");
           }
           req.user = user;
           next();
       }
       catch (err) {
           res.status(400).send("Error: "+ err.message);
       }
}


module.exports = {userAuth};