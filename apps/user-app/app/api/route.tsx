import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client";


const client = new PrismaClient();
export const GET = async() => {
    try {
        await client.user.create({
            data:{
                email:"nikhil",
                name:"nikhil"
            }
        })
    } catch(e) {
        console.log(e);
        return NextResponse.json({
            msg:"error"
        })
    }

    return NextResponse.json({
        msg:"user created"
    })
}