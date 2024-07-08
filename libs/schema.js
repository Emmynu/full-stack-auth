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


// const todoSchema = new Schema({
//   userId: String,
//   todo: [{
//     title: String
//   }]
// },{
//   timestamps: true
// })

export const User = mongoose.models.User || mongoose.model("User", userSchema)
// export const Todo = mongoose.models.Todo || mongoose.model( "Todo", todoSchema)