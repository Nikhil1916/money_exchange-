import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import  db from "@repo/db/client";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "phone number",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const user = {
          id:"1",
          phone:"12",
          password:"23"
        }
        // const user = { id: "1", phone: "J Smith", password: "jsmith@example.com" }
        if(user) {
          return user;
        } else {
          return null;
        }

  
        // const hashedPassword = await bcrypt.hash(credentials.password,10);
        // const existingUser = await db.user.findUnique({
        //     where:{
        //         number: credentials.phone
        //     }
        // });

        // if(existingUser) {
        //     const comparePassword = await bcrypt.compare(credentials.password, existingUser.password);
        //     if(comparePassword) {
        //         return {
        //             id: existingUser.id.toString(),
        //             name: existingUser.name,
        //             phonenumber: existingUser.number
        //         }
        //     }
        //     return null;
        // }

        // try {
        //     const user = await db.user.create({
        //         data:{
        //             number: credentials.phone,
        //             password: hashedPassword
        //         }
        //     })
        //     return {
        //         id: user.id.toString(),
        //             name: user.name,
        //             phonenumber: user.number
        //     }
        // } catch(e) {
        //     console.error(e);
        // }

        // return null;
      },
    }
),
],
secret: process.env.JWT_SECRET || "secret",
callbacks: {
  // TODO: can u fix the type here? Using any is bad
  async session({ token, session }: any) {
    console.log(token, session);
      session.user.id = token.sub
      session.user.name = "nk";
      return session
  }
}
};
// import CredentialsProvider from "next-auth/providers/credentials";
// export const authOptions = {
//     providers: [
//         CredentialsProvider({
//           // The name to display on the sign in form (e.g. "Sign in with...")
//           name: "Credentials",
//           // `credentials` is used to generate a form on the sign in page.
//           // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//           // e.g. domain, username, password, 2FA token, etc.
//           // You can pass any HTML attribute to the <input> tag through the object.
//           credentials: {
//             username: { label: "Username", type: "text", placeholder: "jsmith" },
//             password: { label: "Password", type: "password" }
//           },
//           async authorize(credentials, req) {
//             // Add logic here to look up the user from the credentials supplied
//             const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
      
//             if (user) {
//               // Any object returned will be saved in `user` property of the JWT
//               return user
//             } else {
//               // If you return null then an error will be displayed advising the user to check their details.
//               return null
      
//               // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//             }
//           }
//         })
//       ]
      
// }