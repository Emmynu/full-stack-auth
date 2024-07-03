"use client"
import { registerAuth } from "@/server-actions/auth/auth"
import { z } from "zod"
import { toast, Toaster } from "sonner"
import { authenticateUser, sendEmailVerficationLink } from "@/libs/auth"
import Cookies from "js-cookie"
import { auth } from "@/libs/firebase-config"
import { deleteUser } from "firebase/auth"
import { Button } from "@/libs/button"
 
const userInputSchema= z.object({
    id: z.number().optional(),
    name: z.string().min(1,{message:"Cannot be less than 1"}).max(10,{message: "Name is too Long"}).trim(),
    email: z.string().email().trim(),
    password: z.string().min(1,{message: "Password is too short"}).max(8,{message: "Password is too long"}).trim()
}) // zod schema

const Register = () => {
  return (
    <main className="ml-5">
       <h3 className="text-2xl font-bold my-3 cursor-pointer">Create account</h3>
       <form action={async(formData)=>{
        const data = Object.fromEntries(formData) // getting user input through formData
        const validateUserInput = userInputSchema.safeParse(data) // validate data with zod
        
        if(validateUserInput?.success){
          const { name,email,password } = validateUserInput?.data
          const authResult =  await authenticateUser(name, email, password) // authenticate the user using firebase auth
          
         if(authResult?.error){
          toast.error(authResult?.error) // display if theres an error
         }
         else{
          const result = await registerAuth(validateUserInput?.data,auth?.currentUser?.uid,auth?.currentUser?.refreshToken) // send the data to the server for processing
          if(result?.err){
            deleteUser(auth?.currentUser)
            toast.error(result?.err)
          }else{
            await sendEmailVerficationLink()
            // create a cookie
            Cookies.set("token", auth?.currentUser?.refreshToken) 
            setTimeout(() => {
              window.location = "/"
            }, 3000)
            toast.success("Saved to Db")
          }
         }
          
          
        }else if(validateUserInput?.error){
          console.log(validateUserInput?.error?.flatten()?.fieldErrors);
        }
        
       }} method="post">
          <section className="my-1.5">
            <input className="border  border-gray-700 outline-none px-2 py-1 text-sm text-semibold " type="text" name="name" id="name" />
          </section>
          <section className="my-1.5">
            <input className="border  border-gray-700 outline-none px-2 py-1 text-sm text-semibold " type="email" name="email" id="email" />
          </section>
          <section className="my-1.5">
           <input className="border  border-gray-700 outline-none px-2 py-1 text-sm text-semibold " type="password" name="password" id="" />
          </section>
          <Button />
       </form>
       <Toaster />
    </main>
  )
}

export default Register
