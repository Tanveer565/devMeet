
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [50, 'First name cannot exceed 50 characters'],
  },
   lastName:{
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [50, 'Last name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    //validating the email formate
    validate(value){
        if(!(validator.isEmail(value))){
            throw new Error("Invalid email address: "+value);
        }
    },
  },

    password: {
    type: String,
    required: [true, 'Password is required'],
    //validating the passwords strength
    validate(value) {
        if(!validator.isStrongPassword(value)) {
            throw new Error("Password must be at least 8 characters with at least one uppercase, one lowercase, one number, and one special character (@$!%*?&)");
        }
      },
  },
    age: {
        type: Number,
        min: 18,
    },
    Gender: {
        type: String,
        lowercase: true,
        //validating the gender
        validate(value) {
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data is not validated");
            }
        },
    },
    photoUrl: {
        type: String,
        //default photo url
        default:"https://img.magnific.com/premium-vector/default-avatar-profile-icon-gray-placeholder-vector-illustration_514344-14759.jpg?semt=ais_hybrid&w=740&q=80",
        //validating the  photo url
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL: "+value);
            }
        }

    },
    about: {
        type: String,
        default: "This is the default about of the user!"
    },
    skills: {
        type: [
            {
                type:String,
                minLength:[3],
                maxLength:[20]
            }
        ],
        //validating the number elements in skills
        validate(value) {
            if(value.length>5){
                throw new Error("You can only put a maximum of 5 skills")
            }
        }
    }
},
{
    timestamps:true,
}
);

const User = mongoose.model("User",userSchema);

module.exports = User;

