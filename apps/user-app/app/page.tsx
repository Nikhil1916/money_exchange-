"use client"
import Appbar from "@repo/ui/Appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <Appbar user={session?.data?.user} onSignin={signIn} onSignOut={signOut} />
    </div>
  );
}
