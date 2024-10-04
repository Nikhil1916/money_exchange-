import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "@repo/store/react-redux";
import {useEffect} from "react";

const Notification = () =>{
  const message = useSelector((app:any)=>app?.config?.notify);
  useEffect(()=>{
    if(message) {
        toast(message)
    }
  },[message])
  console.log(message);
//   if(!message) {
//     return;
//   }
//   console.log(message, 2);
//   const notify = (message:string) => toast(message);
//   notify(message);
  return (
    <div>
      <ToastContainer position="bottom-left"/>
    </div>
  );
};
export default Notification;
