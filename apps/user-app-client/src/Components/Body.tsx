import { Outlet, useNavigate } from "react-router-dom";
import storageService, { StorageKeys } from "../utils/storageService";
import { useEffect, useState } from "react";
import Appbar from "@repo/ui/Appbar";
import Sidebar from "./Sidebar";
import { isUserLoggedInFnc } from "../utils/functions";
const Body = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    isUserLoggedIn();
  }, []);
  
  const isUserLoggedIn = async() => {
    const token = storageService.getItem<string | null>(StorageKeys.TOKEN);
    if(!token) {
      signOut();
    } else {
      const data  = await isUserLoggedInFnc(token);
      if(!data) {
        signOut();
      } else {
        setIsLoggedIn(true);
      }
      console.log(data);
    }
  }

  const signOut = () => {
    storageService.clear();
    navigate("/signin");
    window.location.reload();
  };
  return (
    <div>
      <Appbar user={Boolean(isLoggedIn)} onSignOut={signOut} />
      <div className="flex">
        <Sidebar />
        <div className="ml-60 p-2">
        <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Body;
