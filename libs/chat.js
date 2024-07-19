import { ChatFilter } from "./chat-client"
import Image from "next/image"
import { searchFriends } from "@/server-actions/chat/friends"
import { currentUser } from "@/server-actions/auth/auth"
import chatImg from "@/public/no-friend.png"


export async function ChatFriends({ searchParams }){

    const user = await currentUser()
    const { query } = searchParams
    const friends = await searchFriends(user[0]?.id, query) 


  return  <>
        <section>
          <ChatFilter />
        </section>
        {/* friends added */}
        {friends.length > 0 ? <section className="overflow-scroll">
          {friends[0]?.length > 0 ? 
          friends[0]?.map(friend=>{
            return  <section  >
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
            </section>
          })
          :
          <section className="flex flex-col items-center justify-center" style={{marginTop: "50px"}}>
          {/* <br /> */}
          <Image src={chatImg} alt="img" className="w-[100px] h-[40%] md:w-[55%] md:h-[55%] cursor-pointer select-none" />
          <h3 className="mt-7 sm:-ml-7 font-bold text-lg font-[helvetica] tracking-wide">No Friends Found</h3>
        </section>
          }
       
        </section>
        : 
        <section className="flex flex-col items-center justify-center" style={{marginTop: "50px"}}>
            {/* <br /> */}
            <Image src={chatImg} alt="img" className="w-[100px] h-[40%] md:w-[55%] md:h-[55%] cursor-pointer select-none" />
            <h3 className="mt-7 sm:-ml-7 font-bold text-lg font-[helvetica] tracking-wide">No Friends Found</h3>
          </section>}
        {/* friends added */}
  </>
}