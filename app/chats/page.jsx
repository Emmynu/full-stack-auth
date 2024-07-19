import chatImg from "@/public/chat.png"
import Image from "next/image"
import { ChatFriends } from "@/libs/chat"


const Chats = async ({ searchParams }) => {

  
  return (
    <main className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-5">
      {/* friends */}
       <section className=" col-span-1 mx-5 md:ml-2 lg:ml-5">
        <ChatFriends searchParams={ searchParams }/> 
      </section>
      {/* end of friends  */}
      <section className="col-span-2 lg:col-span-3 bg-green-200 h-[100vh] flex-col items-center justify-center w-full hidden  md:flex border border-green-600">
        
         <Image src={chatImg} alt="img" className="w-[75%] lg:w-[50%] h-[55%] md:h-[50%] object-cover cursor-pointer select-none" />
          <h4 className="mt-5 text-lg font-bold font-[helvetica] text-slate-700 tracking-wide">Select user to start chat</h4>
        
        {/* <nav className="flex items-center justify-between bg-white p-3">
        <main className="flex items-center">
          <section className="mr-3 w-[45px] h-[45px]">
          </section>
          <section className="mt-0">
            <h2 className="font-medium tracking-wide text-slate-700">Jasmine Henderson</h2>
            <h4 className="text-xs tracking-wide -ml-1 text-green-600">Active now</h4>
          </section>
        </main>
        </nav>
        <footer className="fixed bottom-0 left-0 right-0 bg-white">
          TEXT
        </footer> */}
      </section>
    </main>
  )
}

export default Chats
