import { IoFilterOutline, IoSearch } from "react-icons/io5"
import image2 from "@/public/test.jpg"
import Image from "next/image"

const Chats = () => {
  return (
    <main className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-12 ">
      {/* friends */}
        <section className=" col-span-1 mx-5 md:mx-2 lg:mx-5 overflow-scroll">
          <header className="flex items-center justify-between ">
            <h4 className="text-lg font-medium text-slate-700">Chats</h4>
            <h5 className="flex items-center cursor-pointer">
              <IoFilterOutline className="mr-1"/>
              <span className="font-medium text-[15px] text-slate-600 tracking-wide">Filter</span>
            </h5>
          </header>
          {/* input box */}
          <section className="flex items-center  bg-green-200 mt-3 px-2 py-1.5 rounded-md">
            <IoSearch className="text-slate-600"/>
            <input type="text" name="search" id="search" className="h-fit bg-green-200 outline-none ml-1 text-slate-600 font-medium tracking-wide text-sm " placeholder="Search friends"/>  
          </section> 
          {/* input box */}
          {/* friends added */}
          <section className="overflow-hidden">
            <article className="flex items-center justify-between mt-5 hover:bg-green-100 p-2 cursor-pointer ">
              <main className="flex items-center">
                <section className="mr-3 w-[45px] h-[45px]">
                  <Image src={image2} alt="img" className="w-full h-full  object-cover"/>
                </section>
                <section className="mt-0">
                  <h2 className="lg:text-base text-sm font-medium tracking-wide text-slate-700">Jasmine Henderson</h2>
                  <h4 className="text-xs tracking-wide -ml-1 text-slate-600">Lorem ipsum dolor sit amet consectetur.</h4>
                </section>
              </main>
              <section className="ml-2">
                <div className="rounded-[50%] w-2 h-2 bg-green-600"></div>
              </section>
            </article>
            

            <article className="flex items-center justify-between mt-5 hover:bg-green-100 p-2 cursor-pointer">
              <main className="flex items-center">
                <section className="mr-3 w-[45px] h-[45px]">
                  <Image src={image2} alt="img" className="w-full h-full  object-cover"/>
                </section>
                <section className="mt-0">
                  <h2 className=" lg:text-base text-sm font-medium tracking-wide text-slate-700">Jasmine Henderson</h2>
                  <h4 className="text-xs tracking-wide -ml-1 text-slate-600">Lorem ipsum dolor sit amet consectetur.</h4>
                </section>
              </main>
              <section className="ml-2">
                <div className="rounded-[50%] w-2 h-2 bg-green-600"></div>
              </section>
            </article>



            <article className="flex items-center justify-between mt-5 hover:bg-green-100 p-2 cursor-pointer">
              <main className="flex items-center">
                <section className="mr-3 w-[45px] h-[45px]">
                  <Image src={image2} alt="img" className="w-full h-full  object-cover"/>
                </section>
                <section className="mt-0">
                  <h2 className="lg:text-base text-sm font-medium tracking-wide text-slate-700">Jasmine Henderson</h2>
                  <h4 className="text-xs tracking-wide -ml-1 text-slate-600">Lorem ipsum dolor sit amet consectetur.</h4>
                </section>
              </main>
              <section className="ml-2">
                <div className="rounded-[50%] w-2 h-2 bg-green-600"></div>
              </section>
            </article>


            <article className="flex items-center justify-between mt-5 hover:bg-green-100 p-2 cursor-pointer">
              <main className="flex items-center">
                <section className="mr-3 w-[45px] h-[45px]">
                  <Image src={image2} alt="img" className="w-full h-full  object-cover"/>
                </section>
                <section className="mt-0">
                  <h2 className="font-medium lg:text-base text-sm tracking-wide text-slate-700">Jasmine Henderson</h2>
                  <h4 className="text-xs tracking-wide -ml-1 text-slate-600">Lorem ipsum dolor sit amet consectetur.</h4>
                </section>
              </main>
              <section className="ml-2">
                <div className="rounded-[50%] w-2 h-2 bg-green-600"></div>
              </section>
            </article>



            <article className="flex items-center justify-between mt-5 hover:bg-green-100 p-2 cursor-pointer">
              <main className="flex items-center">
                <section className="mr-3 w-[45px] h-[45px]">
                  <Image src={image2} alt="img" className="w-full h-full  object-cover"/>
                </section>
                <section className="mt-0">
                  <h2 className="font-medium lg:text-base text-sm tracking-wide text-slate-700">Jasmine Henderson</h2>
                  <h4 className="text-xs tracking-wide -ml-1 text-slate-600">Lorem ipsum dolor sit amet consectetur.</h4>
                </section>
              </main>
              <section className="ml-2">
                <div className="rounded-[50%] w-2 h-2 bg-green-600"></div>
              </section>
            </article>


          </section>
          {/* friends added */}
        </section>
      {/* end of friends  */}
      <section className="col-span-2 lg:col-span-3 bg-green-300 h-[100vh] w-full hidden  md:block border border-green-600">
        <nav className="flex items-center justify-between bg-white p-3">
        <main className="flex items-center">
          <section className="mr-3 w-[45px] h-[45px]">
            <Image src={image2} alt="img" className="w-full h-full  object-cover"/>
          </section>
          <section className="mt-0">
            <h2 className="font-medium tracking-wide text-slate-700">Jasmine Henderson</h2>
            <h4 className="text-xs tracking-wide -ml-1 text-green-600">Active now</h4>
          </section>
        </main>
        </nav>
        <footer className="fixed bottom-0 left-0 right-0 bg-white">
          TEXT
        </footer>
      </section>
    </main>
  )
}

export default Chats
