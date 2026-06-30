
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

    firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [50, 'First name cannot exceed 50 characters'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z\s\-']+$/.test(v);
      },
      message: 'First name can only contain letters, spaces, hyphens, and apostrophes'
    },
    // Sanitization: Trim and normalize spaces
    set: function(value) {
      return value.trim().replace(/\s+/g, ' ');
    }
  },
   lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [50, 'Last name cannot exceed 50 characters'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z\s\-']+$/.test(v);
      },
      message: 'Last name can only contain letters, spaces, hyphens, and apostrophes'
    },
    // Sanitization: Trim and normalize spaces
    set: function(value) {
      return value.trim().replace(/\s+/g, ' ');
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return validator.isEmail(v);
      },
      message: 'Please provide a valid email address'
    },
    // Sanitization: Trim and convert to lowercase
    set: function(value) {
      return value.trim().toLowerCase();
    }
  },

    password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false, // Don't return password in queries by default
    validate: {
      validator: function(v) {
        // Password must contain at least one uppercase, one lowercase, one number, and one special character
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
      },
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }
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
        type: [
            {
                type:String,
                minLength:[3],
                maxLength:[20]
            }
        ],
        validate(value) {
            if(value.length>5){
                throw new Error("You can only put a maximum of 5 skills")
            }
        }
    }
},{
    timestamps:true,
});

const User = mongoose.model("User",userSchema);

module.exports = User;

