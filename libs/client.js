"use client"

import { useEffect, useState, useRef } from "react"
import { auth } from "./firebase-config"
import { onAuthStateChanged } from "firebase/auth"
import  { FaSearch } from "react-icons/fa"
import { z } from "zod"
import image from "@/public/test.jpg"
import { Toaster, toast } from "sonner"
import Image  from "next/image"
import { findUser } from "@/server-actions/auth/auth"
import  { addFriendsDB } from "@/server-actions/chat/friends"
import { MdVerified } from "react-icons/md"
import { HiUserAdd } from "react-icons/hi"
import Link from "next/link"
import Moment from "react-moment"


export const IsVerfied = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(null)

  useEffect(()=>{
     onAuthStateChanged(auth, user=>{
      setIsEmailVerified(user?.emailVerified)
     })
  })

  return (
    <>
      { isEmailVerified && <MdVerified />} 
    </>
  )
}

// console.log(auth?.currentUser?.metadata?.lastSignInTime)

export function ActiveStatus(){
  return  <h5 className="text-xs  text-green-600 mt-0 font-medium tracking-wide">Active <Moment fromNow>{auth?.currentUser?.metadata?.lastSignInTime}</Moment></h5>
}



const querySchema =  z.object({
  id:z.string().optional(),
  query:z.string().email().trim()
})

export const SearchUserForm = () => {
  const [users, setUsers] = useState([])
  const [IsError, setIsError] = useState(false)
  const formRef = useRef()

// console.log(auth?.currentUser?.metadata.lastSignInTime);
  async function searchUser(formData) {
    formRef?.current?.reset()
    setIsError("Loading")
    const data = Object.fromEntries(formData)
    const userInput = querySchema.safeParse(data)
    if (userInput?.error) {
      userInput?.error?.issues?.map(issue=>{
        toast.error(issue?.message)
        setIsError(issue?.message)
      })
    } else {
      const { query } = data
      const user = await findUser(query)
      console.log(user);
      if (user?.length > 0 ) {
          if (user[0]?.id === auth?.currentUser?.uid) {
            setIsError("Cannot add self to friendList")
            setUsers([])
          } else {
            setUsers(user)
            console.log(user);
            setIsError("")
          }
      } else {
        toast.error("User not Found!")
        setUsers([])
        setIsError("User not Found!")
      }
    }
    
  }

  async function addUser(user) {
    const res = await addFriendsDB(auth?.currentUser?.uid, user)
    const { name } = user
    if(res?.error){
      toast.error(res?.error)
    }else{
      toast.success(`${name} to FriendsList`)
    }
  }
  
  return <main >
    <form method="POST" ref={formRef} action={searchUser} className="flex items-center justify-center w-[100%] rounded-[4px] border border-black py-1.5 mt-5 ">
      <input type="email" placeholder="Search users by email" name="query" className="outline-none w-[90%]  ml-2 text-sm font-medium tracking-wide "/>
      <FaSearch />
    </form>
    <section className="mt-5">
      {IsError ? <h2 className="text-center font-medium text-slate-700 font-[arial] tracking-wide">{IsError}</h2>: 
      users?.map(user=>{
        return <main className="flex items-center justify-between">
          <section className="flex items-center gap-2">
            <Image src={user?.url || image} alt={user?.id} width={100} height={100} className="w-[45px] h-[45px] rounded-[50%] object-cover mr-2"/>
            <article className="ml-4">
              <h3 className="font-bold tracking-wide text-sm ">{user?.name}</h3>
              <h5 className="text-xs  text-green-600 mt-0 font-medium tracking-wide"><Moment fromNow>{user?.updatedAt}</Moment></h5>
            </article>
          </section>
          <section className="text-white outline-none bg-green-600 px-4  py-1.5 rounded-[4px] flex items-center" onClick={()=>addUser(user)}>
            <button className="font-medium text-sm mr-1">Add User</button>
            <HiUserAdd />
          </section>

          
        </main>
      })}
    </section>
    <h4 className="text-center mt-5 sm:text-sm text-green-600 font-medium hover:underline transition-[all_1s_linear]"><Link href={"/chats"}>Go to chats</Link></h4>
    <Toaster />
  </main>
}