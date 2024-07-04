import { useFormStatus as formStatus } from "react-dom"


export function Button() {
  const { pending } = formStatus()

  return ( 
    <button type="submit" className=" px-5 tracking-wide font-bold py-1.5 rounded-[4px] text-white text-[15px] "> <span >{!pending ? "Submit": <span className="loading">Loading...</span>}</span></button>
    // <button type="submit" className="w-[90%]">Submit</button>
  )
}

