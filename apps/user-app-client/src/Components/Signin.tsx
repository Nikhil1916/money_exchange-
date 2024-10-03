import Form from "./Authform/Form";
const Signin = () => {
    const onClickNext = (phoneNumber:number) => {
        const number = phoneNumber.toString();
        console.log(number,phoneNumber);
        if(number && number?.length == 10) {
            return true;
        }
        return false;
    }
  return (
    <Form onClickNext={onClickNext} isSignIn={true}/>
  );
};
export default Signin;