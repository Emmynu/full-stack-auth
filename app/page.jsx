
import { currentUser } from "@/server-actions/auth/auth";
import Link from "next/link";
import VerifyEmail from "@/libs/verify"
import { auth } from "@/libs/firebase-config";
import { logOutUser } from "@/libs/auth";


export default async function Page(){
  const user = await currentUser()
  
  return <main className=" flex flex-col items-center mt-[15%]">
      <h3 className="text-2xl font-bold my-3">{user[0]?.name ? `Welcome ${user[0]?.name}` : "Welcome User"}</h3>
      
      <><VerifyEmail /></>
      
      <button className="bg-green-600 px-5 tracking-wide font-bold py-1.5 rounded-[4px] text-white text-lg hover:bg-green-700 hover:opacity-90 transition-[all-2s-all]">{!auth ? <Link href={"/register"}>Register</Link>: <span onClick={logOutUser}>Sign Out</span>}</button>
     </main>
}