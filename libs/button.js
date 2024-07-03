import { useFormStatus as formStatus } from "react-dom"


export function Button() {
  const { pending } = formStatus()

  return ( 
    <button type="submit" className="bg-green-600 px-5 tracking-wide font-bold py-1.5 rounded-[4px] text-white text-[15px] hover:bg-green-700 hover:opacity-90 transition-[all-2s-all]"> <span className={pending && "loading"}>{pending || "submit"}</span></button>
  )
}

