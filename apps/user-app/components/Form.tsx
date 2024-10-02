"use client";
import { useRef, useState } from "react";
import "./Form.css";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import ErrorIcon from "@mui/icons-material/Error";
import { callOtp, signInFnc, signUp } from "../app/helpers/functions";
import axios from "axios";
import { signIn } from "next-auth/react";

interface formProps {
  onClickNext: (param: any) => boolean;
  onSubmit?: (isSignIn: boolean) => void;
  isSignIn: boolean;
}
const Form = async({ onClickNext, isSignIn }: formProps) => {
  const router = useRouter();
  const phoneNumber = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const otp = useRef<HTMLInputElement>(null);
  const [firstPage, setFirstPage] = useState(true);
  const [secondPage, setSecondPage] = useState(false);
  const [thirdPage, setThirdPage] = useState(false);
  const [twilioOtp, settwilioOtp] = useState();

  const [isPhoneNumberValid, setisPhoneNumberValid] = useState(true);
  const [isPhoneNumberTouched, setisPhoneNumberTouched] = useState(false);
  const [isOtpTouched, setIsOtpTouched] = useState(false);
  const [isOtpError, setOtpError] = useState(false);
  const handleWheel = (e: any) => {
    e.target.blur();
    e.preventDefault(); // Prevent the default wheel action
  };
  const handleBlur = () => {
    setisPhoneNumberTouched(true);
    validatePhoneNumber(true);
  };

  const handleOtpBlur = () => {
    setIsOtpTouched(true);
    if(otp.current?.value!=twilioOtp) {
      setOtpError(true);
    } else {
      setOtpError(false);
    }
  };

  const validatePhoneNumber = (isPhoneNumberTouched: boolean, e?: any) => {
    if (phoneNumber.current && isPhoneNumberTouched) {
      const value = phoneNumber.current.value;
      if (value.length === 10) {
        setisPhoneNumberValid(true); // Valid phone number
      } else {
        setisPhoneNumberValid(false); // Invalid phone number
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent typing 'e', 'E', and any non-numeric character
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const sendOtp = async () => {
    const otpResponse = await callOtp(phoneNumber?.current?.value as string);
    settwilioOtp(otpResponse);
  };

  const Signup = async () => {
    try {
      await signUp(
        phoneNumber.current?.value as string,
        password.current?.value as string
      );
      // router.push("/");
      // await signIn(phoneNumber.current?.value as string, password.current?.value as string);
      const result = await signIn("credentials", {
        number: phoneNumber.current?.value + "22",
        password: password.current?.value,
        redirect: false,
      });
      console.log(result);
      return true;
    } catch (e) {
      //do error handling
      return false;
    }
  };

  return (
    <div className="flex items-center justify-center mt-32">
      <div className="p-4 shadow-lg text-center">
        <h1 className="font-bold text-blue-500 text-2xl">venmo</h1>
        <div className={"pt-2 flex flex-col gap-2"}>
          <div>
            {
              <input
                ref={phoneNumber}
                onChange={(e) => {
                  // console.log(e);
                  validatePhoneNumber(isPhoneNumberTouched, e);
                }}
                onBlur={handleBlur}
                onWheel={handleWheel}
                onKeyPress={handleKeyPress}
                type="number"
                className={
                  "w-52 no-arrows border border-gray-400 rounded-md p-2 text-xs" +
                  ` ${isPhoneNumberValid ? "" : "border border-red-400"}` +
                  ` ${firstPage ? "" : " hidden"}`
                }
                placeholder="Enter Phone Number"
              />
            }
            {!isPhoneNumberValid && (
              <p className="ml-1 mt-1 text-xs text-red-400 text-left flex items-center">
                <span className="mb-[1px] pr-[1px]">
                  <ErrorIcon sx={{ fontSize: "16px" }} />
                </span>{" "}
                Phone Number Not Valid
              </p>
            )}
          </div>
          {
            <input
              ref={password}
              onWheel={handleWheel}
              type="password"
              className={
                "w-52 no-arrows border border-gray-400 rounded-md p-2 text-xs " +
                ` ${(secondPage && isSignIn) || (thirdPage && !isSignIn) ? "" : " hidden"}`
              }
              placeholder="Enter Password"
              onBlur={handleOtpBlur}
            />
          }
          {
            <div>
              <input
                ref={otp}
                onWheel={handleWheel}
                onChange={handleOtpBlur}
                type="number"
                className={
                  "w-52 no-arrows border border-gray-400 rounded-md p-2 text-xs " +
                  ` ${isOtpError && isOtpTouched ? "border border-red-400" : ""} ${secondPage && !isSignIn ? "" : " hidden"}`
                }
                placeholder="Enter OTP"
                onBlur={handleOtpBlur}
              />

              {secondPage && !isSignIn && isOtpError && isOtpTouched && (
                <p className="ml-1 mt-1 text-xs text-red-400 text-left flex items-center">
                  <span className="mb-[1px] pr-[1px]">
                    <ErrorIcon sx={{ fontSize: "16px" }} />
                  </span>{" "}
                  Otp Not Valid
                </p>
              )}
            </div>
          }

          {((firstPage && isSignIn) || (!thirdPage && !isSignIn)) && (
            <Button
              className={
                "bg-blue-500 w-52 rounded-full hover:bg-blue-500 hover:text-white mb-1"
              }
              onClick={() => {
                if (!isPhoneNumberValid) {
                  return;
                }
                // console.log(firstPage);
                if (firstPage && !isSignIn) {
                  // console.log(1);
                  sendOtp();
                }

                const moveToNextSection = onClickNext(
                  phoneNumber?.current?.value
                );
                if (moveToNextSection && firstPage) {
                  setFirstPage(false);
                  setSecondPage(true);
                } else if (secondPage) {
                  if (otp?.current?.value != twilioOtp) {
                    setOtpError(true);
                    return;
                  } else {
                    setOtpError(false);
                  }
                  setSecondPage(false);
                  setThirdPage(true);
                }
              }}
            >
              Next
            </Button>
          )}

          {((secondPage && isSignIn) || (thirdPage && !isSignIn)) && (
            <Button
              className={
                "bg-blue-500 w-52 rounded-full hover:bg-blue-500 hover:text-white mb-0"
              }
              onClick={async() => {
                if (!isPhoneNumberValid || !password?.current?.value) {
                  return;
                }
                if(isSignIn) {
                  const result = await signIn("credentials", {
                    phone: phoneNumber.current?.value,
                    password: password.current?.value,
                    redirect: false,
                  });
                  console.log(result);
                  router.push("/")
                } else {
                  Signup();
                }
              }}
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          )}
          {isSignIn ? (
            <p
              className="cursor-pointer text-sm mt-0 text-blue-500"
              onClick={() => {
                router.push("/auth/signup");
              }}
            >
              New to venmo? Sign Up Now!
            </p>
          ) : (
            <p
              className="cursor-pointer text-sm mt-0 text-blue-500"
              onClick={() => {
                router.push("/auth/signin");
              }}
            >
              Already a User? Sign in Now!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
