import { useFormStatus as formStatus } from "react-dom"
import { FcGoogle } from "react-icons/fc";

export function Button() {
  const { pending } = formStatus()

  return ( 
    <button type="submit" className=" text-white text-[15px] "> <span >{!pending ? "Submit": <span className="loading">Loading...</span>}</span></button>
  )
}

export function GoogleButton() {
  const { pending } = formStatus()
  return <>
    {!pending ? <><div className=""><FcGoogle /></div>
      <h2 className="text-slate-700 font-bold font-[helvetica] text-[15px] ml-2 py-2.5">Continue with Google</h2></>: <span className="loading loading-spinner loading-xs text-slate-700 "></span>}</>
}

