import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import {useEffect} from "react";

const Notification = () =>{
  const message = useSelector((app:any)=>app?.config?.notify);
  console.log(message);
  useEffect(()=>{
    if(message) {
        toast(message)
    }
  },[message])
  return (
    <div>
      <ToastContainer position="bottom-left"/>
    </div>
  );
};
export default Notification;
