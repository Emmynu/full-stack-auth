"use client"
import { findUserInDb, updateCookie } from "@/server-actions/auth/auth"
import { z } from "zod"
import { toast, Toaster } from "sonner"
import {  loginUser } from "@/libs/auth"
import Cookies from "js-cookie"
import { auth } from "@/libs/firebase-config"
import { Button } from "@/libs/button"
import Link from "next/link"

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
     
    }else{

    }
  }

  return (
    <main className="ml-5">
       <h3 className="text-2xl font-bold my-3 cursor-pointer">Log in to account</h3>
       <form  method="post" action={loginAction}>
          <section className="my-1.5">
            <input className="border  border-gray-700 outline-none px-2 py-1 text-sm text-semibold " type="email" name="email" id="email" />
          </section>
          <section className="my-1.5">
           <input className="border  border-gray-700 outline-none px-2 py-1 text-sm text-semibold " type="password" name="password" id="" />
          </section>
          <h2 className="text-sm tracking-wide hover:underline mb-1 "><Link href={"/reset-password"}>Forgot Password?</Link></h2>
          <Button />
       </form>
       
       <Toaster />
    </main>
  )
}

export default Login
