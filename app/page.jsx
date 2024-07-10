import { currentUser } from "@/server-actions/auth/auth";
import image from "@/public/test.jpg"
import Image from "next/image"
import  { FiLogOut } from "react-icons/fi"
import { logOutUser } from "@/libs/auth";
import { ActiveStatus, IsVerfied, SearchUserForm } from "@/libs/client"


export default async function Page(){
  const user = await currentUser()


  return <main className="bg-white shadow-md w-[95%] md:w-7/12 lg:w-[50%] m-[13%_auto_0] p-7 h-fit">
    <section className="flex items-center md:items-start justify-between">
      <section className="flex items-center">
        <section >
          <Image src={user[0]?.url || image } width={100} height={100} alt="img" className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] rounded-[50%] object-cover"/>
        </section>
        <section className="ml-4 ">
          <div className="flex items-center">
            <h3 className="font-bold tracking-wide text-base md:text-[17px] mr-1">{user[0]?.name || "User"}</h3>
            <IsVerfied />
          </div>
          <ActiveStatus />
        </section>
        </section>
      <section className="flex items-center text-white outline-none bg-green-600 px-4  py-1.5 rounded-[4px]" onClick={logOutUser}>
        <FiLogOut/>
        <button className="ml-1 font-medium text-sm">Log Out</button>
      </section>
    </section>

    <section>
      <SearchUserForm />
    </section>
  </main>
}