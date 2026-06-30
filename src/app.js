const express = require("Express");
const connectdb = require("./src/config/database");
const User = require("./src/models/user");
const app = express();


// It takes the raw JSON string sent by the client (which is just a bunch of text traveling over the network)
// and converts it into a standard JavaScript object.
app.use(express.json());

//signup
app.post("/signup",async (req,res) => {
    //Create a new instance of the model User to add new user info
    //taking the json data from req using req.body
    const user = new User(req.body);
    try{ 
         //The save function returns a promise so you have to use await
         await user.save();
         res.send("User Added Successfully!");
    }
    catch(err){
        res.status(400).send("Error in saving the user!"+err.message);
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
app.patch("/user", async (req,res) => {
    const updateData = req.body;
    //taking the userId from the body
    const userId = req.body.userId;

    try{
        //Matching the userId in the DB by checking every _id
        //And there are lot more options to use after the update 
        const user = await User.findByIdAndUpdate({_id: userId} , updateData, {
            returnDocument: 'after',
            //it will the validators on the updates.
            runValidators: true,
        });
        console.log(user);

        res.send("User updated successfully");
    }
    catch(err){
        res.status(400).send("Update Failed "+ err.message);
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

