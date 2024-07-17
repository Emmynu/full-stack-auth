"use client"

import { RiChatSmile2Fill, RiContactsFill } from "react-icons/ri";

import { MdNotificationsActive } from "react-icons/md";
import Image from "next/image"
import { auth } from "./firebase-config";



export  function ChatHeader() {
  return <main className="flex items-center justify-between px-5 py-1.5  border ">
    <section className="flex items-center ">
      <section>
        <h3 className="font-bold tracking-wide font-[arial]" style={{fontSize: "20px"}}>LOGO</h3>
      </section> {/* logo section */}
      {/* icon section */}
    </section>
    {/* profile section */}
   <section className="flex items-center"> 
    
    <div className=" text-green-600 hover:bg-green-100 cursor-pointer p-2 rounded-[50%]"><RiChatSmile2Fill size={20} /></div>
        <div className=" text-green-600 hover:bg-green-100 cursor-pointer p-2 rounded-[50%]"><RiContactsFill size={20}/></div>
        <div className="mr-2 text-green-600 hover:bg-green-100 cursor-pointer p-2 rounded-[50%]"><MdNotificationsActive size={20}/></div>
      <Image src={auth?.currentUser?.photoURL} alt="profile image" width={45} height={45} className="object-cover " style={{borderRadius: "50%", boxSizing:"border-box"}}/>
    </section> 
  </main>
}

