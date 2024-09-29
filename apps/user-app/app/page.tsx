"use client"
import Appbar from "@repo/ui/Appbar";
import { Button } from "@repo/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session.data?.user);
  return (
    <div>
      <Appbar user={session?.data?.user} onSignin={()=>{}} onSignOut={()=>{}} />
    </div>
  );
}
