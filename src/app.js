const express = require("Express");
const connectdb = require("./config/database");
const User = require("./models/user");
const validateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();


// It takes the raw JSON string sent by the client (which is just a bunch of text traveling over the network)
// and converts it into a standard JavaScript object.
app.use(express.json());

//signup
app.post("/signup",async (req,res) => {


    try{ 
        //validation of data
        validateSignUpData(req);

        const {firstName,lastName,email,password} = req.body;

        //Password encryption by .hash 
        const passwordHash = await bcrypt.hash(password,10);
        
    //Create a new instance of the model User to add new user info
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

//user 
app.get("/user", async (req,res) => {

    const userEmail = req.body.email;
    try{

        //If you only want one user(this function not give an array)
    // const user = await User.findOne({email: userEmail});

    //It gives the one document by his unique id (uses findOne as middleware)
    // const user = await User.findById({email: userEmail});


    const users = await User.find({email: userEmail});
    throw new Error("Validation Failed: Email is required!");

    //if no email matches then and empty array will be returned send error
    if(users.length === 0){
        res.status(404).send("User not Found!");
    }
    else{
        res.send(users);
    }
    }
    catch{
        res.status(404).send("Something went wrong");
    }

});

//Feed API - Get /feed - Get all the user from the dataBase
app.get("/feed" , async (req,res) => {

    //The empty object for find all
    try{
    const users = await User.find({});
    res.send(users);
    }
    catch{
        res.status(404).send("Something Went Wrong");
    }

});

//Delete Api - Delete user by id
app.delete("/deleteuser" , async (req,res) => {

    const userId = req.body._id;

    try{
        //deleting user by his id
        const user = await User.findByIdAndDelete(userId);
        res.send("User Deleted Successfully!");
    }
    catch{
        res.status(400).send("Something Went Wrong!")
    }

});

//patch Api - TO Update the data of the user by id
app.patch("/user/:userId", async (req,res) => {
    const data = req.body;
    //taking the userId from the body
    const userId = req.params?.userId;


    try{
        //array list of fields allowed for update
        const ALLOWED_UPDATES = [
        "skills",
        "about",
        "photoUrl",
        "age",
        "gender"
    ];

    //ittraing throw every key passed to update and checking if 
    //the allowed update list includes it
    const isUpdateAllowed = Object.keys(data).every((k) =>  
        ALLOWED_UPDATES.includes(k));

    //if the field is not in the allowed update list then throw an error
    if(!isUpdateAllowed){
        throw new Error("Update not allowed");
    }
        //Matching the userId in the DB by checking every _id
        //And there are lot more options to use after the update 
        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument: 'after',
            //it will the validators on the updates.
            runValidators: true,
        });

        res.send("User updated successfully");
    }
    catch(err){
        res.status(400).send("Update Failed: "+ err.message);
    }
});



//connecting to Db before server start listening.
connectdb()
.then(() => {
    //Giving prior to the Db then only start listening to the server
    console.log("Database connection establish!");
    app.listen(1313,() => {
    console.log("The Server is listening on the port 1313");
});
})
.catch(err => {
    console.error("Database cannot be connected");
});

