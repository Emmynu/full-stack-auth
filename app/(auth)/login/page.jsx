"use client"
import { findUserInDb, updateCookie } from "@/server-actions/auth/auth"
import { z } from "zod"
import { toast, Toaster } from "sonner"
import {  loginUser } from "@/libs/auth"
import Cookies from "js-cookie"
import { auth } from "@/libs/firebase-config"
import { Button } from "@/libs/button"
import Link from "next/link"
import Image from "next/image"
import image from "@/public/test.jpg"


const userInputeSchema = z.object({
  id: z.string().optional(),
  email: z.string().email().trim(),
  password: z.string().trim()
})

const Login = () => {

 async function loginAction(formData) {
    const data = Object.fromEntries(formData)
    const userInput = userInputeSchema.safeParse(data)
    if(userInput?.success){
      const { email, password } = userInput?.data
      const res = await loginUser(email,password)
      if (!res?.err){
        const result = await findUserInDb(password,email)
        if(result?.err){
          toast.error(result?.err)
        }else{
          await updateCookie(auth?.currentUser?.uid,auth?.currentUser?.refreshToken)
          Cookies.set("token", auth?.currentUser?.refreshToken) 
          setTimeout(() => {
            window.location = "/"
          }, 3000)
          toast.success("Successfully logged in ")
        }
      }else{
        toast.error(res.err)
      }
     
    }else if (userInput?.error){
     userInput?.error?.issues.map(issue=>{
      toast.error(issue?.message)
      });
    }
  }

  return (
    <main className="form-container">
      <section className="lg:col-span-2">
        <Image src={image} className="form-image" alt="image"/>
      </section>
      <section className="form-content-container">
        <h3 className="form-title">Log in to account</h3>
        <p className="form-label">Don't have an account? <span className="form-label-link"><Link href={"/register"}>Register</Link></span></p>
        <form  method="post" action={loginAction} className="my-3">
          <section className="my-2">
            <span className="form-input-label">Email:</span><br/>
            <input className="form-input " type="email" name="email" id="email" />
          </section>
          <section className="my-2">
            <span className="form-input-label">Password:</span><br/>
            <input className="form-input " type="password" name="password" id="" />
          </section>
          <h2 className="text-sm tracking-wide hover:underline mt-3 "><Link href={"/reset-password"}>Forgot Password?</Link></h2>
          <div className="mt-4 w-[90%] bg-green-600 flex flex-col items-center hover:bg-green-700 hover:opacity-90 transition-[all-2s-all]">
            <Button />
          </div>
        </form>
      </section>
       
       <Toaster />
    </main>
  )
}

export default Login
