// "use client"
import Signin from "../../../components/Signin"
import { redirect } from 'next/navigation';
// import { authOptions } from "../../lib/auth";

const page = async() => {
  return (
    <div>
        <Signin/>
    </div>
  )
}

export default page