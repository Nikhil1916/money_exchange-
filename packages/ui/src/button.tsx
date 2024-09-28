"use client";

import { useSelector } from "@repo/store/react-redux";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}


export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};

export const buttonChild = () => {
  const selector = useSelector((store:any)=>store.balance);
  console.log(selector);
  return (
    <div>Button Child</div>
  )
}