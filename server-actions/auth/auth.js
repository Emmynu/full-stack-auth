"use server"

import { connectDB } from "@/libs/connect"
import { User } from "@/libs/schema"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function registerAuth(data,id,token) {
 try {
  const { name, email, password} = data
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)
  const uid = id.toString()
  await connectDB()
  await User.create({name:name, email:email, password: hashedPassword, id:uid, token:token})
 } catch (error) {
  return {
    err: error?.message
  }
 }
}

export async function findUserInDb(password,email) {
  try {
    await connectDB() 
    const data = await User.find({ email }).sort()
    if(data){
     const isValid =  await bcrypt.compare(password,data[0]?.password)
     if(isValid){
      return data
     }else{
      return {
        err: "Incorrect Password"
      }
     }
    }else{
      return {
        err: "User not found"
      }
    }
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

export async function updatePasswordInDB(email, password) {
  try {
    await connectDB()
    const salt = await bcrypt.genSalt()
   const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.updateOne({ email }, { $set: { password:hashedPassword }})
      return user
  } catch (error) {
    return {
      err: error?.message
    }
  }
}

export async function saveUserInDB(user) {
  try {
    const { name, email,uid, token } = user
    await connectDB()
    await User.create({name:name, email:email,  id:uid, token:token})
  } catch (error) {
    return {
      err: error?.message
    }
  }
}