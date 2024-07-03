"use client"
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { auth } from "./firebase-config"
import Cookies from "js-cookie"

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

export async function logOutUser() {
  try {
    await signOut(auth)
    Cookies.remove("token")
    window.location = "/"
  } catch (error) {
    
  }
}


