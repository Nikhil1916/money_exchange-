import { Button } from "./button";
// import { cookies } from 'next/headers'
interface AppBarProps {
  user:
    | {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        id?: string | null;
      }
    | undefined
    | boolean
    | null;
  onSignOut: () => void;
}
const Appbar = ({ user, onSignOut }: AppBarProps) => {
  console.log(user);
  return (
    <div className="flex-col justify-center items-center md:flex-row flex md:justify-between shadow-md px-5 fixed w-full z-10 bg-white">
      <div className="text-lg flex flex-col justify-center text-slate-500 font-bold">PulseWallet</div>
      <div className="flex flex-col justify-center pt-2">
        <Button className={"bg-black w-32 md:w-full"} onClick={onSignOut}>{"Sign Out"}</Button>
      </div>
    </div>
  );
};

export default Appbar;
