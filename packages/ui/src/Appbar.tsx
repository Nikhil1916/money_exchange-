"use client"
import { Button } from "./button";
interface AppBarProps {
    user:{
        name?: string | null;
        email?: string | null;
        image?: string | null;
        id?:string | null;
    } | undefined
    onSignin:()=>void,
    onSignOut:()=>void
}
const Appbar = ({
    user,onSignin,onSignOut
}:AppBarProps) => {
  return (
    <div className="flex justify-between shadow-md px-5 ">
        <div className="text-lg flex flex-col justify-center">PulseWallet</div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignin : onSignOut}>
                {
                    user ? "Sign Out": "Sign In"
                }
            </Button>
        </div>
    </div>
  )
}

export default Appbar