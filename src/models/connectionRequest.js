const mongoose = require("mongoose");

//schema for connection requests
const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        //creating reference to the user collection
        ref:"User",
        required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    status:{
        type: String,
        required:true,
        enum:{
            values: ["ignored","interested","accepted","rejected"],
            message: `{VALUE} is not supported`
        }
    },
},{
    timestamps:true,
}
);

//Adding the index on fromUserId and toUserId
connectionRequestSchema.index({fromUserId: 1, toUserId: 1});



const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

connectionRequestSchema.pre("save", function (next){
    const connectioRequest = this;
    
     if (connectioRequest.fromUserId.equals(connectioRequest.toUserId)) {
        throw new Error("You cannnot send connection request to yourself!!");
    }
    next();
});

module.exports = {ConnectionRequest};