
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim:true,
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 30,
        trim:true
    },
    email:{
        type:String,
         required:true,
         unique: true,
         lowercase: true,
         trim: true,
    },
    password: {
        type: String,
         required:true,
         minLength: 8
    },
    age: {
        type: Number,
        min: 18,
    },
    Gender: {
        type: String,
        lowercase: true,
        validate(value) {
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data is not validated");
            }
        },
    },
    photoUrl: {
        type: String,
        default:"https://img.magnific.com/premium-vector/default-avatar-profile-icon-gray-placeholder-vector-illustration_514344-14759.jpg?semt=ais_hybrid&w=740&q=80"

    },
    about: {
        type: String,
        default: "This is the default about of the user!"
    },
    skills: {
        type: [String],
    }
},{
    timestamps:true,
});

const User = mongoose.model("User",userSchema);

module.exports = User;

