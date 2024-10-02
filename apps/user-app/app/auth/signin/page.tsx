import { getServerSession } from "next-auth";
import Signin from "../../../components/Signin"
import { redirect } from 'next/navigation';
import { authOptions } from "../../lib/auth";

const page = async() => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if(session?.user) {
    redirect("/")
  }
  return (
    <div>
        <Signin/>
    </div>
  )
}

export default page