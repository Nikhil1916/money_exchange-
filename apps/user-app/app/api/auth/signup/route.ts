import { NextRequest, NextResponse } from "next/server";
import client from "@repo/db/client";
import bcrypt from "bcrypt";

export const POST = async(req: NextRequest) => {
    try {
        const userBody = await req.json();
        console.log(userBody);
        const checkUser = await client.user.findFirst({
            where:{
                number: userBody.phoneNumber
            }
        });
        console.log(checkUser);
        if(checkUser) {
            return NextResponse.json({
                "error":"User already there"
            },{
                status: 400
            })
        }
        const hashedPassword = await bcrypt.hash(userBody.password,10);
        const user = await client.user.create({
            data:{
                number: userBody.phoneNumber,
                password:hashedPassword
            }
        });

        await client.balance.create({
            data:{
              amount:0,
              locked:0,
              userId: user?.id
            }
          });
        //   signin
        return NextResponse.json({
            id: user.id
        })
    } catch(e) {
        return NextResponse.json({
            error:"User creation api failed",
            e
        },{
            status: 400
        })
    }
    
}