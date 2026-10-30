const express = require("Express");
const connectdb = require("./config/database");
const cookieParser = require("cookie-parser");
const {authRouter,profileRouter,requestRouter,feedRouter,userRouter} = require("./router");
const app = express();



app.use(express.json());
app.use(cookieParser());

//It is like whenever a request comes go to auth router and check if the 
//request mathes a route and just send responnse from there.

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


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

