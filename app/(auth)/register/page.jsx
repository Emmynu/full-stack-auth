"use client"
import { saveUserInDB } from "@/server-actions/auth/auth"
import { useState } from "react"
import { z } from "zod"
import { toast, Toaster } from "sonner"
import { authenticateUser, sendEmailVerficationLink, googleAction } from "@/libs/auth"
import Cookies from "js-cookie"
import { auth } from "@/libs/firebase-config"
import { deleteUser } from "firebase/auth"
import { Button, GoogleButton } from "@/libs/button"
import Image from "next/image"
import image from "@/public/test.jpg"
import Link from "next/link"
import { FaEye, FaEyeSlash } from "react-icons/fa"



const userInputSchema= z.object({
    id: z.number().optional(),
    name: z.string().min(1,{message:"Name cannot be empty"}).max(20,{message: "Name is too Long"}).trim(),
    email: z.string().email().trim(),
    password: z.string().min(1,{message: "Password is too short"}).max(8,{message: "Password is too long"}).trim()
}) // zod schema


const Register = () => {
  const [isOpen, setIsOpen] = useState(null)
  
  async function registerAction(formData) {
    const data = Object.fromEntries(formData) // getting user input through formData
          const validateUserInput = userInputSchema.safeParse(data) // validate data with zod
          if(validateUserInput?.success){
            const { name,email,password } = validateUserInput?.data
            const authResult =  await authenticateUser(name, email, password) // authenticate the user using firebase auth
            
            

          if(authResult?.error){
            toast.error(authResult?.error) // display if theres an error
          }
          else{
            setTimeout(() => {
              const result =  saveUserInDB(validateUserInput?.data,auth?.currentUser?.uid,auth?.currentUser?.refreshToken,auth?.currentUser?.photoURL) // send the data to the server for processing
              if(result?.err){
                deleteUser(auth?.currentUser)
                toast.error(result?.err)
              }else{
                 sendEmailVerficationLink()
                // create a cookie
                Cookies.set("token", auth?.currentUser?.refreshToken) 
                setTimeout(() => {
                  window.location = "/"
                }, 3000)
                toast.success("Saved to Db")
              }
            }, 3000);
            
          }
            
          }else if(validateUserInput?.error){
          validateUserInput?.error?.issues.map(issue=>{
            toast.error(issue?.message)
          })
          }
  }
  
 

  return (
    <main className="form-container">
      <section className="lg:col-span-2">
        <Image src={image} className="form-image" alt="img" />
      </section>
      {/* helvetica */}
      <section className="form-content-container">
        <h3 className="form-title">Create an account</h3>
        <p className="form-label">Already have a account? <span className="form-label-link"><Link href={"/login"}>Login</Link></span></p>
        <form className="my-3 "
        action={registerAction} method="post">
            <section className="my-2">
              <span className="form-input-label">Username:</span>
              <input className="form-input"  type="text" name="name" id="name" />
            </section>

            <section className="my-2">
            <span className="form-input-label">Email:</span><br/>
              <input className="form-input"  type="email" name="email" id="email" />
            </section>
            
            <section className="my-2 ">
            <span className="form-input-label">Password:</span>
            <main className="form-input flex items-center justify-between">
              <input className="w-full outline-none"  type={isOpen ? "text" : "password"} name="password" id="" />
              <span className="cursor-pointer" onClick={()=>setIsOpen(!isOpen)}>{isOpen ? <FaEyeSlash/> :<FaEye />}</span>
            </main>
            </section>
            <div className="hover:bg-green-700 hover:opacity-90 transition-[all-2s-all] w-[90%] bg-green-600 flex flex-col items-center px-5 tracking-wide font-bold py-3 rounded-[4px] mt-5 text-white">
              <Button />
            </div>
        </form>
        <h3 className="text-center mb-2 font-bold text-slate-600">OR</h3>
       
        <section className="flex items-center justify-center text-slate-700 tracking-wide rounded-[4px] border py-2.5 border-slate-400  cursor-pointer" onClick={googleAction}>
           <GoogleButton />
        </section>
        <footer className="mt-2"> 
          <h3 className="text-center text-sm  font-medium">By continuing, you agree to our <span className="text-green-600 font-bold underline"><Link href={""}>Privacy Policy & Terms and Condition</Link></span></h3>
        </footer>
      </section>
       <Toaster />
    </main>
  )
}

export default Register

