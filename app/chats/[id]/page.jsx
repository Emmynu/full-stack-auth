"use client"

import { useParams } from "next/navigation"

const ChatDetailed = () => {
  const params = useParams()
  console.log(params);
  return (
    <div>
      chat detailed goes her
    </div>
  )
}

export default ChatDetailed
