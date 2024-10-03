// import { getSession } from "next-auth/react";
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// // import { getServerSession } from "next-auth/next"
// import { authOptions } from "../../lib/auth";

// export const POST = async(req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const session = await getServerSession();
//     console.log(session,"sesssssssssssiin");
//     if (session) {
//       // Clear cookies
//       const headers = new Headers();
//       headers.set("Set-Cookie", 
//         "next-auth.session-token=; Max-Age=0; path=/;," +
//         "next-auth.csrf-token=; Max-Age=0; path=/;"
//       );
  
//       // Send a success response
//       return NextResponse.json({ message: "Signed out and cookies cleared" }, {
//         status: 200,
//         headers: headers,
//       });
//     } else {
//       // Handle case where no session is active
//       return NextResponse.json({ error: "No active session" }, { status: 400 });
//     }
//   } catch(e) {
//     return NextResponse.json({
//       e
//     },
//   {
//     status:400
//   })
//   }
// }
