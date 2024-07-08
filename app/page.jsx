import { currentUser } from "@/server-actions/auth/auth";
import image from "@/public/test.jpg"
import Image from "next/image"
import  { FiLogOut } from "react-icons/fi"
import  { FaSearch } from "react-icons/fa"
import { logOutUser } from "@/libs/auth";
import { auth } from "@/libs/firebase-config";


export default async function Page(){
  const user = await currentUser()
  console.log(user)

  return <main className="bg-white shadow-md w-[95%] md:w-7/12 lg:w-[50%] m-[13%_auto_0] p-7">
    <section className="flex items-center md:items-start justify-between">
      <section className="flex items-center">
        <section >
          <Image src={image} alt="img" className="w-[45px] h-[45px] md:w-[70px] md:h-[70px] rounded-[50%] object-cover"/>
        </section>
        <section className="ml-4 ">
          <h3 className="font-bold tracking-wide text-base md:text-[19px] ">{user[0]?.name || auth?.currentUser?.displayName || "John"}</h3>
          <h5 className="text-xs md:text-sm text-green-600 -mt-1 font-medium tracking-wide">Active now</h5>
        </section>
        </section>
      <section className="flex items-center text-white bg-green-600 px-4 py-1.5 rounded-[4px]" onClick={logOutUser}>
        <FiLogOut/>
        <button className="ml-1 font-medium text-sm">Log Out</button>
      </section>
    </section>

    <section className="flex items-center justify-center m-3 md:m-5 lg::m-7 border-[2px] border-black">
      <input type="text" name="query" placeholder="Search by email or username" className="py-1.5 outline-none  w-full mr-2 text-sm font-medium"/>
     <span className="mr-2"> <FaSearch /></span>
    </section>
  </main>
}