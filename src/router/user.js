const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const { User } = require("../models/user");
const userRouter = express.Router();


const USER_SAFE_DATA = ["firstName","lastName","photoUrl","age","gender","about","skills"];

//Find all user request API
userRouter.get("/user/requests/recieved", userAuth, async (req,res) => {
try {

    const logedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
        toUserId: logedInUser._id,
        status: "interested"
    }).populate("fromUserId",USER_SAFE_DATA);


    if(!connectionRequest){
        return res.status(404).json({message: "No request found!"});
    }
    res.json({
        Request: connectionRequest
    });} 
catch (err) {
        res.status(400).send("Error: "+err.message);
    }
});

//find all user connections API
userRouter.get("/user/connections",userAuth, async (req,res) => {
    try {

        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id, status: "accepted"},
                {toUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

        if(!connectionRequests){
            return res.status(404).json({message: "You have no connections"});
        }

        const data = connectionRequests.map((row) => {
           if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId;
           }
           return row.fromUserId;
        });

        res.json({
            data: data
        })
        
    } catch (err) {
        res.status(400).send("Error: "+err.message);
    }
});

//feed api to get all the user
userRouter.get("/feed",userAuth, async (req,res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = limit > 50 ? 50: limit;

        const skip = (page - 1) * limit;


        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        })
        .select("fromUserId toUserId status");

        const hideUserFromFeed = new Set();

        connectionRequest.forEach( (req) =>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const user = await User.find({
            $and: [
            {_id: {$nin: Array.from(hideUserFromFeed) }},
            {_id: {$ne: loggedInUser._id }},
            ],
        })
        .select(USER_SAFE_DATA)
        .skip(skip) 
        .limit(limit);;

        res.json({
            Users: user
        });

    } catch (err) {
        res.status(400).send("Error: "+err.message);
    }
});

module.exports = {userRouter};