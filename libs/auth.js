"use client"
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile, sendPasswordResetEmail, signInWithPopup } from "firebase/auth"
import { auth, provider } from "./firebase-config"
import Cookies from "js-cookie"
import { findUser, saveUserInDB, updateCookie } from "@/server-actions/auth/auth"
import { toast } from "sonner"

export async function authenticateUser(name, email,password){
  try {
    await createUserWithEmailAndPassword(auth,email,password).then(res=>{
      updateProfile(auth?.currentUser,{
        displayName:name,
        photoURL: ""
      })
    })
  } catch (err) {
    return {
      error: err?.message
    }
  };
}

export async function loginUser(email,password){
  try {
    await signInWithEmailAndPassword(auth,email,password)
  } catch (error) {
    return{
      err:error?.message
    }
  }
}

export async function sendEmailVerficationLink() {
  try {
    await sendEmailVerification(auth?.currentUser);
  } catch (err) {
    return {
      err:err?.message
    }
  }
}

export async function updateUserPassword(email) {
  try {
    await sendPasswordResetEmail(auth,email)
  } catch (error) {
    return {
      err: error?.message
    }
  }
}

export async function signInWithGmail() {
  try {
    await signInWithPopup(auth,provider)
  } catch (error) {
    return {
      err: error?.message
    }
  }
}

export async function logOutUser() {
  try {
    await signOut(auth)
    Cookies.remove("token")
    window.location = "/"
  } catch (error) {
    return {
      err: error?.message
    }
  }
}


export async function googleAction(){
  const res = await signInWithGmail()
  
  if (res?.err) {
    toast.error(res?.err)
  } else {
  
   const user =  await findUser(auth?.currentUser?.email)
   if (user?.err) {
    toast.error(user?.err)
   } else {
    if (user.length > 0) {
      await updateCookie(auth?.currentUser?.uid,auth?.currentUser?.refreshToken)
      Cookies.set("token", auth?.currentUser?.refreshToken) 
      setTimeout(() => {
        window.location = "/"
      }, 3000)
      toast.success("Successfully logged in ")
    } else {
      const user = {
        email:auth?.currentUser?.email,
        name:auth?.currentUser?.displayName,
      }
     const result =  await saveUserInDB(user, auth?.currentUser?.uid,auth?.currentUser?.refreshToken)
     if (result?.err) {
      toast.error(result?.err)
     } else {
        await sendEmailVerficationLink()
        // create a cookie
        Cookies.set("token", auth?.currentUser?.refreshToken) 
        setTimeout(() => {
          window.location = "/"
        }, 3000)
        toast.success("Saved to Db")
     }
    }
   }
  }
}