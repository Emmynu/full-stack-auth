import chatImg from "@/public/start-chat.png"
import Image from "next/image"
import { searchFriends } from "@/server-actions/chat/friends"
import { currentUser } from "@/server-actions/auth/auth"
import { ChatFilter } from "../../libs/chat-client"


const Chats = async ({ searchParams }) => {

  const user = await currentUser()
  const { query } = searchParams
  const friends = await searchFriends(user[0]?.id, query) 
  
  console.log(friends[0]);
  return (
    <main className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-5 overflow-hidden">
      {/* friends */}
       <section className=" col-span-1 mx-5 md:ml-2 lg:ml-5 overflow-scroll">
        <section>
          <ChatFilter />
        </section>
        {/* friends added */}
        {friends.length > 0 ? <section>
          {friends[0]?.map(friend=>{
            return  <>
            <article className="flex items-center justify-between mt-5 hover:bg-green-100 p-2 cursor-pointer ">
            <main className="flex items-center">
              <section className="mr-3 w-[45px] h-[45px]">
                <Image src={friend?.url} alt="img" className="w-full h-full  object-cover" width={100} height={100}/>
              </section>
              <section className="mt-0">
                <h2 className="lg:text-base text-sm font-medium tracking-wide text-slate-700">{friend?.name}</h2>
                <h4 className="text-xs tracking-wide -ml-1 text-slate-600">Lorem ipsum dolor sit amet consectetur.</h4>
              </section>
            </main>
            <section className="ml-2">
              <div className="rounded-[50%] w-2 h-2 bg-green-600"></div>
            </section>
          </article>

          <article className="flex items-center justify-between mt-5 hover:bg-green-100 p-2 cursor-pointer ">
            <main className="flex items-center">
              <section className="mr-3 w-[45px] h-[45px]">
                <Image src={friend?.url} alt="img" className="w-full h-full  object-cover" width={100} height={100}/>
              </section>
              <section className="mt-0">
                <h2 className="lg:text-base text-sm font-medium tracking-wide text-slate-700">{friend?.name}</h2>
                <h4 className="text-xs tracking-wide -ml-1 text-slate-600">Lorem ipsum dolor sit amet consectetur.</h4>
              </section>
            </main>
            <section className="ml-2">
              <div className="rounded-[50%] w-2 h-2 bg-green-600"></div>
            </section>
          </article>


          <article className="flex items-center justify-between mt-5 hover:bg-green-100 p-2 cursor-pointer ">
            <main className="flex items-center">
              <section className="mr-3 w-[45px] h-[45px]">
                <Image src={friend?.url} alt="img" className="w-full h-full  object-cover" width={100} height={100}/>
              </section>
              <section className="mt-0">
                <h2 className="lg:text-base text-sm font-medium tracking-wide text-slate-700">{friend?.name}</h2>
                <h4 className="text-xs tracking-wide -ml-1 text-slate-600">Lorem ipsum dolor sit amet consectetur.</h4>
              </section>
            </main>
            <section className="ml-2">
              <div className="rounded-[50%] w-2 h-2 bg-green-600"></div>
            </section>
          </article>

          <article className="flex items-center justify-between mt-5 hover:bg-green-100 p-2 cursor-pointer ">
            <main className="flex items-center">
              <section className="mr-3 w-[45px] h-[45px]">
                <Image src={friend?.url} alt="img" className="w-full h-full  object-cover" width={100} height={100}/>
              </section>
              <section className="mt-0">
                <h2 className="lg:text-base text-sm font-medium tracking-wide text-slate-700">{friend?.name}</h2>
                <h4 className="text-xs tracking-wide -ml-1 text-slate-600">Lorem ipsum dolor sit amet consectetur.</h4>
              </section>
            </main>
            <section className="ml-2">
              <div className="rounded-[50%] w-2 h-2 bg-green-600"></div>
            </section>
          </article>
            </>
          })}
       
        </section>
        : <section className="flex flex-col items-center justify-center">
            <h3 className="mt-7 font-bold text-sm font-[helvetica] tracking-wide">No Friends Found</h3>
          </section>}
        {/* friends added */}
      </section>
      {/* end of friends  */}
      <section className="col-span-2 lg:col-span-3 bg-green-200 h-[100vh] justify-center flex-col items-center  w-full hidden  md:flex border border-green-600">
        
         <Image src={chatImg} alt="img" className="w-[45%] h-[45%] object-cover " />
          <h4 className="mt-5 text-xl font-bold">Select user to start chat</h4>
        
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
