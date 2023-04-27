const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
    Bio:String,
    Phone:String,
    Photo:String
})
const UserModel=mongoose.model("user",UserSchema);

module.exports={UserModel}