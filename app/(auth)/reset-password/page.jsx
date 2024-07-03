"use client"

import { Button } from "@/libs/button"
import { Toaster, toast } from 'sonner'
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
      const res = await fetch("/api/mail",{
        method:"POST",
        headers:{
          ContentType: "application/json"
        },
        body: JSON.stringify({ email:userInput?.data?.email })
      })
      if (res.ok) {
        toast.success("Sent reset password to your mail")
      } else {
        toast.error("An error Occured")
      }
    } else {
      
    }

  }

  return (
    <main className="ml-5">
       <h3 className="text-2xl font-bold my-3 cursor-pointer">Reset Password</h3>
       <form  method="post" action={resetPasswordAction}>
          <section className="my-1.5">
            <input className="border  border-gray-700 outline-none px-2 py-1 text-sm text-semibold " type="email" name="email" id="email" />
          </section>
          <Button />
       </form>
       
       <Toaster />
    </main>
  )
}

export default ResetPassword
