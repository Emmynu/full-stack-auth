import { NextResponse } from "next/server"
import nodemailer from "nodemailer"


 const transporter = nodemailer.createTransport({
  service:"Gmail",
  auth:{
    user: "loluwasimi54@gmail.com",
    pass: "yaxbidzoxdjsxowb"
  }
})

export async function POST(req:Request){
//   try {
//   const { email, user } = await req.json()

//    transporter.sendMail({
//       from: "loluwasimi54@gmail.com",
//       to:email,
//       subject: "Password Recovery",
//       html: `Hi ${user[0]?.name} ! Seems you forgot your password. <br> <br/>
      
//       Use <h4 style="font-weight:700;">${user[0]?.id} <h4/> to login temporarily into the reset link sent
      
//       Note: DONT USE ANY OTHER PASSWORD`
//     })
//  } catch (err) {
//   return {
//     error: err
//   }
//  }
 return NextResponse.json({status: "Success" })
}
