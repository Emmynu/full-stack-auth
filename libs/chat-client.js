"use client"

import { IoFilterOutline, IoSearch } from "react-icons/io5"
import { useSearchParams, usePathname, useRouter } from "next/navigation"


export function ChatFilter() {
  const searchParams = useSearchParams()
  const pathname =  usePathname()
  const { replace } = useRouter()

  function searchUser(value) {
    const params = new URLSearchParams(searchParams)
    console.log(value);
    if(value){
      params.set("query", value)
    }
    else{
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  }

 

  return <>
    <header className="flex items-center justify-between ">
      <h4 className="font-medium text-slate-700" style={{fontSize: "17px"}}>Chats</h4>
      <h5 className="flex items-center cursor-pointer">
      <IoFilterOutline className="mr-1"/>
      <span className="font-medium text-[15px] text-slate-600 tracking-wide">Filter</span>
    </h5>
  </header>
  {/* input box */}
    <section className="flex items-center mt-3 py-1.5 rounded-md" style={{backgroundColor: "#bbf7d0", paddingLeft:"3px"}}>
        <IoSearch className="text-slate-600"/>
        <input type="text" name="search" id="search" className="h-fit w-full bg-green-200 outline-none ml-1 text-slate-600 font-medium tracking-wide text-sm " placeholder="Search friends" onChange={(e)=>searchUser(e.target.value)} style={{backgroundColor:"#bbf7d0"}} defaultValue={searchParams.get("query")?.toString()}/>  
      </section> 
  {/* input box */}

  </>
}