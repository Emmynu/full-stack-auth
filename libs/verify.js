"use client"

import { useEffect, useState } from "react"
import { auth } from "./firebase-config"
import { onAuthStateChanged } from "firebase/auth"

const VerifyEmail = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(null)

  useEffect(()=>{
     onAuthStateChanged(auth, user=>{
      setIsEmailVerified(user?.emailVerified)
     })
  })

  return (
    <>
      { !isEmailVerified ? <span className="font-bold text-yellow-500 tracking-wide">Verify your account</span> : <span className="font-bold text-green-100 tracking-wide">Account Verified </span>}
    </>
  )
}

export default VerifyEmail
