"use client"
import { Button } from "./button";
interface AppBarProps {
    user?:{
        name?:string,
    },
    onSignin:()=>void,
    onSignOut:()=>void
}
const Appbar = ({
    user,onSignin,onSignOut
}:AppBarProps) => {
  return (
    <div className="flex justify-between shadow-md px-5 py-2">
        <div className="text-lg flex flex-col justify-center">PulseWallet</div>
        <div className="flex flex-col justify-center">
            <button onClick={user ? onSignin : onSignOut}>
                {
                    user ? "Sign Out": "Sign In"
                }
            </button>
        </div>
    </div>
  )
}

export default Appbar