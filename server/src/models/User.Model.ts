import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, min: 2, max: 50 },
    lastName: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true, min: 2 },
    picturePath: { type: String,default:""},
    friends: { type: Array,default:[]},
    password: { type: String,required:true},
    location: { type: String},
    occupation: { type: String},
    viewedProfire:{type:Number},
    impressions: { type:Number}
},{timestamps:true})

 const User = mongoose.model("User",UserSchema)
 export default User