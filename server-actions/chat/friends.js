// "use server"
// import { Todo } from "@/libs/schema"
// import { revalidatePath } from "next/cache"

// export async function saveTodo(title,user) {
//  try {
//   await connectDB()
 
//   const users = await getTodo(user[0]?.id)
//   console.log(users,user[0]?.id);
//   if (users.length > 0) {
//     await Todo.updateOne({ userId: user[0]?.id},{$push:{ todo: [{ title:title}]}})
//   } else {
//     await Todo.create({ 
//       userId: user[0]?.id, 
//       todo: [{ title: title }] 
//     })
//   }
//   revalidatePath("/")
//  } catch (error) {
//   console.log(error);
//  }
// }

// export async function getTodo(id){
//   try {
//     await connectDB()
//     const  user = await Todo.find({ userId: id }).sort()
//     return user.length > 0 ? user : []
//   } catch (error) {
//     return error?.message
//   }
// }

// export async function deleteTodo(id,docId){
//   try {
//     await connectDB()
//     await Todo.findOneAndUpdate(
//       { _id: docId},
//       {$pull: {todo: {_id: id}}}
// )
//     revalidatePath("/")
//   } catch (error) {
//     return error?.message
//   }
// }
 "use server"
 import { connectDB } from "@/libs/connect"
 import { Friends } from "@/libs/schema"
import { revalidatePath } from "next/cache"



 export async function addFriendsDB(uid,user) {
  try {
    await connectDB()
    const { id, email, name, url } = user
    const users = await getFriendsDB(uid)
    const isUserInFriendList = await friendExist(id)
    if (users.length > 0) {
      if (!isUserInFriendList ) {
        await Friends.updateOne({ userId: uid }, {$push: {friends: [{id,email,name,url}]}})
      } else {
        return {
          error: "User already in friendsList"
        }
      }
    } else {
      await Friends.create({ userId: uid , friends: {id,email,name,url}})
    }
    revalidatePath("/")
  } catch (error) {
    return {
      error: error?.message
    }
  }
 }

 export async function getFriendsDB(id){
  try {
    await connectDB()
    const friends = await Friends.find({ userId: id }).sort()
    return friends
  } catch (error) {
    return {
      error:error?.message
    }
  }
 }

 export async function friendExist(id){
  try {
    await connectDB()
    const isUserInFriendList = await Friends.findOne({ "friends.id" : id})
    return isUserInFriendList
  } catch (error) {
    return {
      error:error?.message
    }
  }
 }