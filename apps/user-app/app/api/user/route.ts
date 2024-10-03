// import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
// import { authOptions } from "../../lib/auth";
export const GET = async() => {
    try {
    // const session = await getServerSession(authOptions);
    // if(session?.user) {
    //     return NextResponse.json({
    //         user: session.user
    //     })
    // }

    return NextResponse.json({
        message:"User not logged in"
    },{
        status: 403
    });
    } catch(e) {
        console.log(e);
        return NextResponse.json({
            message:"Error",
            e: JSON.stringify(e),
            // authOptions
        },{
            status: 403
        });
    }
}