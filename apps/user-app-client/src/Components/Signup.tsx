import { useEffect } from "react";
import Form from "./Authform/Form";
import { useNavigate } from "react-router-dom";
import storageService, { StorageKeys } from "../utils/storageService";
const Signup = () => {
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
  const onClickNext = (phoneNumber: number) => {
    const number = phoneNumber?.toString();
    console.log(number, phoneNumber);
    if (number && number?.length == 10) {
      return true;
    }
    return false;
  };
  return <Form onClickNext={onClickNext} isSignIn={false} />;
};

export default Signup;
