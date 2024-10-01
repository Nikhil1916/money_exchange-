"use client";
import { useRef, useState } from "react";
import "./Form.css";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

interface formProps {
  onClickNext: (param: any) => boolean;
  onSubmit?:(isSignIn:boolean) => void;
  isSignIn: boolean
}
const Form = ({ onClickNext , isSignIn }: formProps) => {
  const router = useRouter();
  const phoneNumber = useRef<HTMLInputElement>(null);
  const password = useRef(null);
  const [firstPage, setFirstPage] = useState(true);
  const [isPhoneNumberValid, setisPhoneNumberValid] = useState(true);
  const [isPhoneNumberTouched, setisPhoneNumberTouched] = useState(false);
  const handleWheel = (e: any) => {
    e.target.blur();
    e.preventDefault(); // Prevent the default wheel action
  };
  const handleBlur = () => {
    setisPhoneNumberTouched(true);
    validatePhoneNumber(true);
  };

  const validatePhoneNumber = (isPhoneNumberTouched: boolean) => {
    if (phoneNumber.current && isPhoneNumberTouched) {
      const value = phoneNumber.current.value;
      if (value.length === 10) {
        setisPhoneNumberValid(true); // Valid phone number
      } else {
        setisPhoneNumberValid(false); // Invalid phone number
      }
    }
  };
  return (
    <div className="flex items-center justify-center mt-32">
      <div className="p-4 shadow-lg text-center">
        <h1 className="font-bold text-blue-500 text-2xl">venmo</h1>
        <div className={"pt-2 flex flex-col gap-2"}>
          <div>
            {firstPage && (
              <input
                ref={phoneNumber}
                onChange={() => {
                  validatePhoneNumber(isPhoneNumberTouched);
                }}
                onBlur={handleBlur}
                onWheel={handleWheel}
                type="number"
                className={
                  "w-52 no-arrows border border-gray-400 rounded-md p-2 text-xs" +
                  ` ${isPhoneNumberValid ? "" : "border border-red-400"}`
                }
                placeholder="Enter Phone Number"
              />
            )}
            {!isPhoneNumberValid && (
              <p className="ml-1 mt-1 text-xs text-red-400 text-left">
                Phone Number Not Valid
              </p>
            )}
          </div>
          {!firstPage && (
            <input
              ref={password}
              onWheel={handleWheel}
              type="password"
              className="w-52 no-arrows border border-gray-400 rounded-md p-2 text-xs "
              placeholder="Enter Password"
            />
          )}
         {
            firstPage &&  <Button
            className={
              "bg-blue-500 w-52 rounded-full hover:bg-blue-500 hover:text-white mb-1"
            }
            onClick={() => {
              if (!isPhoneNumberValid) {
                return;
              }
              const moveToNextSection = onClickNext(
                phoneNumber?.current?.value
              );
              console.log(moveToNextSection);
              if (moveToNextSection) {
                setFirstPage(false);
              }
            }}
          >
            Next
          </Button>
         }

          {
            !firstPage &&  <Button
            className={
              "bg-blue-500 w-52 rounded-full hover:bg-blue-500 hover:text-white mb-0"
            }
            onClick={() => {
              if (!isPhoneNumberValid) {
                return;
              }
              const moveToNextSection = onClickNext(
                phoneNumber?.current?.value
              );
              console.log(moveToNextSection);
              if (moveToNextSection) {
                setFirstPage(false);
              }
            }}
          >
            Sign In
          </Button>
         }

         
          {/* <Button
            className={
              "bg-white text-blue-600 border border-blue-500 w-52 rounded-full hover:bg-blue-500 hover:text-white"
            }
            onClick={() => {}}
          >
            Sign Up
          </Button> */}
          {
            isSignIn ? <p className="cursor-pointer text-sm mt-0 text-blue-500" onClick={
              ()=>{
                router.push("/auth/signup")
              }
            }>New to venmo? Sign Up Now!</p> : <p className="cursor-pointer text-sm mt-0 text-blue-500" onClick={  ()=>{
              router.push("/auth/signin")
            }}>Already a User? Sign in Now!</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Form;
