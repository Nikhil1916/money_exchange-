import {useState, useEffect} from "react";
import { getBalance } from "./functions";
const useBalance = () => {
 const [balance, setBalance] = useState(null);
 useEffect(()=>{
    fetchBalance();
 },[]);
 const fetchBalance = async() => {
    try {
        const balance = await getBalance();
        console.log(balance);
        setBalance(balance);
    } catch(e:any) {
        throw Error(e?.message)
    }
 }

 return balance;
}

export default useBalance