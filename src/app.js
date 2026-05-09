//Creating a Server With Express.js

const express = require("express");

const app = express();

app.use("/admin",(req,res) => {
    res.send("The page is only for admin!");l
});

app.use("/test",(req,res) => {
    res.send("Hello From the Server!");
});

app.use("/",(req,res) => {
    res.send("Hello from the dashBoard");
});

app.listen(3000,()=>{
    console.log("The server is successfully listening on port 3000... ")
});