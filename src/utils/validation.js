const validator = require("validator");


//Api level validation for signup api request data
const validateSignUpData = (req) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid!");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid!");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password!");
    }
};

const validateEditProfileDate = (req) => {

    const allowedEditFields = [
        "firstName",
        "lastname",
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills",
        "email",
    ];

    const isEditAllowed = Object.keys(req.body).every((fields) => allowedEditFields.includes(fields));

    return isEditAllowed;
}

//taking the new password and validating it is strong
const validateNewPassword = (newPassword) => {
    if(!validator.isStrongPassword(newPassword)){
        throw new Error("Enter a strong new password!");
    }
};

module.exports = {validateSignUpData,validateEditProfileDate,validateNewPassword};