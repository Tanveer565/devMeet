const express = require("express");
const {userAuth} = require("../middlewares/auth");
const {ConnectionRequest} = require("../models/connectionRequest");
const {User} = require("../models/user");


const requestRouter = express.Router();

//sendConnectionRequest
requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res) => {
   try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    //Validating status
    const allowedStatus = ["ignored","interested"];
    if(!allowedStatus.includes(status)){
        return res.status(400).json({message:status+" Status not allowed!"});
    }

    // validating the toUserId (is present)
    const toUser = await User.findById(toUserId);
    if(!toUser){
        return res.status(404).json({message: "User not found!!"});
    }

    //if a Connection request exisit already
    const exisitingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId},
        ]
    });

  
    if(exisitingConnectionRequest){
        throw new Error("Conncetion already exsist");
    }

    //Creating an instance connectionRequest 
    const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
    });

    const data = await connectionRequest.save();

    res.json({
        message:`${req.user.firstName} is ${status}`,
        User: toUser
    });


   } catch (err) {
    res.status(400).send("Error: "+err.message);
   }
});

//review Connection request
requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res) => {
    try {

        const logedInUser = req.user;
        const {status, requestId} = req.params;

        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(404).json({message: status+"Status not allowed!"});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId: logedInUser,
            status: "interested"
        });

        if(!connectionRequest){
            return res
            .status(404)
            .json({message: "Connection request not found"});
        }
        
        //replacing the status of the connection request
        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({
            message: logedInUser.firstName+" has "+status+ " the connection request",
            data
        });

    } catch (err) {
        res.status(400).send("Error: "+err.message);
    }
});

module.exports = {requestRouter};
