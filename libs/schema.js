import mongoose, { Schema} from "mongoose";

const userSchema = new Schema({
  id: String,
  email:String,
  name:String,
  token:String
},
{
  timestamps:true
})

export const User = mongoose.models.User || mongoose.model("User", userSchema)