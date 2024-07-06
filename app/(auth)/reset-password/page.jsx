"use client"

import { updateUserPassword } from "@/libs/auth"
import { Button } from "@/libs/button"
import { findUser } from "@/server-actions/auth/auth"
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
      const user = await findUser(email)
      if (user.length>0) {
        await updateUserPassword(email)
        toast.success("We sent a reset link to your mail!")
      } else {
        toast.error("User not Found!")
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
        <Image src={image} className="form-image" alt="img"/>
      </section>
      <section  className="form-content-container">
        <h3 className="form-title">Reset Password</h3>
        <p className="form-label">Remember password? <span className="form-label-link"><Link href={"/login"}>Login</Link></span></p>
        <form  method="post" action={resetPasswordAction} className="my-3">
            <section className="my-2">
            <span className="form-input-label">Enter your email:</span><br/>
              <input className="form-input " type="email" name="email" id="email" />
            </section>
            <div className="hover:bg-green-700 hover:opacity-90 transition-[all-2s-all] w-[90%] bg-green-600 flex flex-col items-center px-5 tracking-wide font-bold py-3 rounded-[4px] mt-5">
              <Button />
            </div>
        </form>
      </section>
       
       <Toaster />
    </main>
  )
}

export default ResetPassword



