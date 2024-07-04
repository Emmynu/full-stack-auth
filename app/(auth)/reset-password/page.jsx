"use client"

import { updateUserPassword } from "@/libs/auth"
import { Button } from "@/libs/button"
import { findUser, updatePasswordInDB } from "@/server-actions/auth/auth"
import { Toaster, toast } from 'sonner'
import Image from "next/image"
import Link from "next/link"
import image from "@/public/test.jpg"

import { z } from "zod"

const userInputeSchema = z.object({
  id: z.string().optional(),
  email: z.string().email().trim(),
})

const ResetPassword = () => {

  async function resetPasswordAction(formData) {
    const data = Object.fromEntries(formData)
    const userInput  = userInputeSchema.safeParse(data)
    if (userInput?.success) {
      const { email } = userInput?.data

      //  steps
      // 1. check if the user exists in the db
      const user = await findUser(email)
  
      // 2 . send a reset link  if the user exists
      if (user.length > 0) {
        const res = await updateUserPassword(email)
      // 3 . encrypt and update the password in the db
        if (res?.err) {
          toast.error(res?.err)
        } else {    
          const result = await updatePasswordInDB(email, user[0]?.id)
      // 4.  send the reset password to the user's mail
          if (result?.err) {
            toast.error(res?.err)
          }else{
            const res = await fetch("/api/mail",{
              method: "POST",
              headers:{
                ContentType: "application/json",
              },
              body: JSON.stringify({ email, user})      
            })

            if (res.ok) {
              toast.success("Sent reset link and password to your mail")
            } else {
              toast.error("An error Occured")
            }
          }
        }
      } else {
        toast.error("User not found")
      }
    } else if (userInput?.error) {
      userInput?.error?.issues?.map(issue=>{
        toast.error(issue?.message)
      })
    }

  }

  return (
    <main className="form-container">
       <section className="lg:col-span-2 ">
        <Image src={image} className="form-image"/>
      </section>
      <section  className="form-content-container">
        <h3 className="form-title">Reset Password</h3>
        <p className="form-label">Remember password? <span className="form-label-link"><Link href={"/login"}>Login</Link></span></p>
        <form  method="post" action={resetPasswordAction} className="my-3">
            <section className="my-2">
            <span className="form-input-label">Enter your email:</span><br/>
              <input className="form-input " type="email" name="email" id="email" />
            </section>
           <div className="mt-4 w-[90%] bg-green-600 flex flex-col items-center hover:bg-green-700 hover:opacity-90 transition-[all-2s-all]">
            <Button />
           </div>
        </form>
      </section>
       
       <Toaster />
    </main>
  )
}

export default ResetPassword
