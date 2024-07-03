import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { connectDB } from "../../../libs/connect"
import { User } from "../../../libs/schema"

const transporter = nodemailer.createTransport({
  service:"Gmail",
  auth:{
    user: "loluwasimi54@gmail.com",
    pass: "yaxbidzoxdjsxowb"
  }
})

export async function POST(req,res){
 try {
  const { email } = await req.json()
  await connectDB()
  const user = await User.find({ email }).sort()
  if (user) {
    transporter.sendMail({
      from: "loluwasimi54@gmail.com",
      to:email,
      subject: "Password Recovery",
      html: `Hi ${user[0]?.name} ! Seems you forgot your password. <br> <br/>
      
      Use <h4 style="font-weight:700;">${user[0]?.id} <h4/> to login temporarily `
    })
    return NextResponse.json({status: 200 })

  } else {
    return NextResponse.json({status: 500 })
  }
 } catch (err) {
  return {
    error: err?.message
  }
 }
}