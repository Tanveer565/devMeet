
const express = require("express");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const {User,userSchema} = require("../models/user");

const authRouter = express.Router();

//app. = authRouter.

authRouter.post("/signup",async (req,res) => {
    try{ 
        //Api level validation 
        validateSignUpData(req);

        const {firstName,lastName,email,password} = req.body;

        //Password encryption by .hash 
        const passwordHash = await bcrypt.hash(password,10);
        
    //Create a instance of the model User to add new user info
    // User provides ONLY what's needed to create an account
    const user = new User({
        firstName,
        lastName,
        email,
        password:passwordHash,
    });

         //The save function returns a promise so you have to use await
         await user.save();
         res.send("User Added Successfully!");
    }
    catch(err){
        res.status(400).send("Error: "+err.message);
    }
});

//login API
authRouter.post("/login", async (req,res) => {

    try {
        const {email , password} = req.body;

        //validaitng email
        const user = await User.findOne({email: email});

        if(!user){
            throw new Error("Invalid credentials");
        }

        //validating the password
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){
            //offloading the task oof creating a jwt token to the userschema file
            const token = await user.getJWT();
            res.cookie("token",token,{expires: new Date(Date.now() + 7 * 3600000)} );

            res.send("Login successful!");
        }else{
            throw new Error("Invalid credentials");
        }

    } catch (err) {
        res.status(400).send("Error: "+ err.message);
    }
});

//logout API:-
authRouter.post("/logout", async (req,res) => {
    res
    .cookie("token", null, {expires: new Date(Date.now())})
    .send("You are logout successfully!!");
});

module.exports = {authRouter};
