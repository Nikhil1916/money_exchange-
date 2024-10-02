"use client"
import { Button } from "./button";
// import { cookies } from 'next/headers'
interface AppBarProps {
    user:{
        name?: string | null;
        email?: string | null;
        image?: string | null;
        id?:string | null;
    } | undefined
    onSignin:()=>void,
    onSignOut:(...params:any)=>void
}
const Appbar = ({
    user,onSignin,onSignOut
}:AppBarProps) => {
    console.log(user);
  return (
    <div className="flex justify-between shadow-md px-5 ">
        <div className="text-lg flex flex-col justify-center">PulseWallet</div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignin : ()=>{
                onSignOut({ redirect: false });
                // window.location.reload();
                // const cookieStore = cookies()
                // cookieStore.getAll().forEach((cookie) => {
                //     cookieStore.delete(cookie.name);
                //   });
            }}>
                {
                    user ? "Sign Out": "Sign In"
                }
            </Button>
        </div>
    </div>
  )
}

export default Appbar