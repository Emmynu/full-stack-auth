import mongoose, { Schema, mongo} from "mongoose";

const userSchema = new Schema({
  id: String,
  email:String,
  name:String,
  token:String,
  url:String
},
{
  timestamps:true
})


const friendsSchema = new Schema({
  userId:String,
  friends: [{
    id: String,
    email:String,
    name:String,
    url:String
  }],
  isArchived: Boolean,
  isBlocked: Boolean,
})
export const User = mongoose.models.User || mongoose.model("User", userSchema)
export const Friends = mongoose.models.Friends || mongoose.model("Friends", friendsSchema)