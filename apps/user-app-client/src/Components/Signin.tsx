import { useEffect } from "react";
import Form from "./Authform/Form";
import { useNavigate } from "react-router-dom";
import storageService, { StorageKeys } from "../utils/storageService";
const Signin = () => {
  const navigate = useNavigate();
  const isToken = storageService.getItem<string | null>(StorageKeys.TOKEN);
  useEffect(() => {
    if (isToken) {
      // Navigate to the home page or another route
      navigate("/");
    }
  }, [isToken]);
  const onClickNext = (phoneNumber: number) => {
    const number = phoneNumber.toString();
    console.log(number, phoneNumber);
    if (number && number?.length == 10) {
      return true;
    }
    return false;
  };
  return <Form onClickNext={onClickNext} isSignIn={true} />;
};
export default Signin;
