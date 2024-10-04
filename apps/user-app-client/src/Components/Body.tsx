import { useNavigate } from "react-router-dom";
import storageService, { StorageKeys } from "../utils/storageService";
import { useEffect } from "react";
import Appbar from "@repo/ui/Appbar";
const Body = () => {
    const navigate = useNavigate();
    const isToken = storageService.getItem<string | null>(StorageKeys.TOKEN);
    useEffect(() => {
        if (isToken) {
            // Navigate to the home page or another route
            navigate("/");
        } else {
            // Navigate to the sign-in page
            console.log("Redirecting to Signin");
            navigate("/Signin");
        }
    }, [isToken]);
    return(
        <div>
            <Appbar user={Boolean(isToken)} onSignOut={
                ()=>{
                    storageService.clear();
                    navigate("/signin");
                }
            }  />
            body
        </div>
    )
}
export default Body;