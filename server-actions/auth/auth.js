"use server"

import { connectDB } from "@/libs/connect"
import { User } from "@/libs/schema"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function saveUserInDB(data,id,token) {
 try {
  const { name, email} = data
  // const salt = await bcrypt.genSalt()
  // const hashedPassword = await bcrypt.hash(password, salt)
  const uid = id.toString()
  await connectDB()
  await User.create({name:name, email:email, id:uid, token:token})
 } catch (error) {
  return {
    err: error?.message
  }
 }
}


export async function findUser(email) {
  try {
    await connectDB()
    const user = await User.find({ email }).sort()
    return user
  } catch (error) {
    return {
      err: error?.message
    }
  }
}

export async function currentUser(){
  try {
    await connectDB()
   const cookie = cookies()
   const token =  cookie.get("token")
   const user = await User.find({ token:token?.value }).sort()
   if (user) {
    return user
   }else{
    redirect("/login")
   }
  } catch (error) {
    return {
      err: error?.message
    }
  }
}


export async function updateCookie(id,cookie) {
  try {
    await connectDB()
    await User.updateOne({ id },{ $set:{ token: cookie }})
  } catch (error) {
    return {
      err: error?.message
    }
  }
}


