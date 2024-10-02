/* eslint-disable turbo/no-undeclared-env-vars */
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Twilio } from "twilio";
export const POST = async (req: NextRequest) => {
  return NextResponse.json({
    code:"123456"
  })
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
  const authToken = process.env.TWILIO_AUTH_TOKEN as string;
  const { phoneNumber } = await req.json();
//   console.log(phoneNumber,req.body,"okoko");
  if(!phoneNumber) {

    return NextResponse.json({
        'error':"phone number not supplied"
    },{
        status:400
    })
  }
  try {
    const client = new Twilio(accountSid, authToken);
    // console.log(accountSid, authToken , "authtocke");
    let otp = Math.random()?.toString()?.split(".")?.join("")?.slice(0,6);
    await client.messages.create({
        body: otp,
        from: "+13866631256",
        to: "+91"+phoneNumber,
      })
      .then((message) => {
        // messageSid= message.sid;
    });
    return NextResponse.json({
      code: otp,
    });
  } catch (e) {
    return NextResponse.json({
      e,
    });
  }
};
