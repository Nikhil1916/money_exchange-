// "use client";

import { useSelector } from "@repo/store/react-redux";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick:()=>void;
  className?:string
}


export const Button = ({ children, onClick,className }: ButtonProps) => {
  className = className ? "text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "+className : "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};