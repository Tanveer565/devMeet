const express = require("express");
const {userAuth} = require("../middlewares/auth");
const {User,userSchema} = require("../models/user");
const {validateEditProfileDate,validateNewPassword} = require("../utils/validation");
const { ListCollectionsCursor } = require("mongodb");
const bcrypt = require("bcrypt");


const profileRouter = express.Router();

//pofile/view API 
profileRouter.get("/profile/view", userAuth ,async (req,res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch{
        res.status(400).send("Error: "+err.message);
    }
});

//profile/edit(update) API
profileRouter.patch("/profile/edit", userAuth, async (req,res) => {

    try {

        if(!validateEditProfileDate(req)){
            throw new Error("Invalid edit request");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => {loggedInUser[key] = req.body[key]});

        await loggedInUser.save();

        res.send({message: `${loggedInUser.firstName}, your profile updated successfully`,
        data: loggedInUser,});

    } catch (err) {
        res.status(400).send("Error: "+err.message);
    }

});

//profile/password API

profileRouter.patch("/profile/password", userAuth, async (req,res) => {

    try {

    const user = req.user;
    const {exsistingPassword , newPassword} = req.body;

    const vlaidatePass = await user.validatePassword(exsistingPassword);

    if(!vlaidatePass){
        throw new Error("Invalid password!!");
    }

    validateNewPassword(newPassword);

    const passwordHash = await bcrypt.hash(newPassword,10);

    Object.keys(req.body).forEach((key) => {user.password = passwordHash});

    await user.save();


    res.cookie("token", null, {expires: new Date(Date.now())});

    res.send({message: `${user.firstName}, your password is changed successfully, loggin again with new password`});


    } catch (err) {
        res.status(400).send("Error: "+err.message);
    }
});

module.exports = {profileRouter};
