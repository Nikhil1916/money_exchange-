import Form from "./Authform/Form";
const Signup = () => {
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
