import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import  db from "@repo/db/client";
import { cookies } from 'next/headers'
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
        const hashedPassword = await bcrypt.hash(credentials.password,10);
        try {
          const existingUser = await db.user.findUnique({
            where:{
                number: credentials.phone
            }
        });
        if(existingUser) {
          const comparePassword = await bcrypt.compare(credentials.password, existingUser.password);
          if(comparePassword) {
              return {
                  id: existingUser.id.toString(),
                  name: existingUser.name,
                  phonenumber: existingUser.number
              }
          }
          return null;
      }
      } catch(e) {

      }

      //TODO:create separate signup page 
        try {
            const user = await db.user.create({
                data:{
                    number: credentials.phone,
                    password: hashedPassword
                }
            });
            await db.balance.create({
              data:{
                amount:0,
                locked:0,
                userId: user?.id
              }
            });
            return {
                id: user.id.toString(),
                    name: user.name,
                    phonenumber: user.number
            }
        } catch(e) {
            console.error(e);
        }

        return null;
      },
    }
),
],
secret: process.env.NEXTAUTH_SECRET || "secret",
callbacks: {
  // TODO: can u fix the type here? Using any is bad
  async session({ token, session }: any) {
    console.log(token, session);
    if(session) {
      session.user.id = token.sub
      session.user.name = "nk";
    }
      return session
  },
},
pages:{
  signIn: '/auth/signin',
},
};