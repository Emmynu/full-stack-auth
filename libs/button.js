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
      <h2 className=" font-bold font-[helvetica] text-[14px] leading-snug ml-2">Continue with Google</h2></>: <span className="loading loading-spinner loading-xs  "></span>}</>
}

