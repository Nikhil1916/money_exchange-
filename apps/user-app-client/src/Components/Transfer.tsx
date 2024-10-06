import { getBalance, getOnRampTransactions } from "../utils/functions";
import { AddMoney } from "./AddMoney";
import { BalanceCard } from "./Balancecard";
import  OnRampTransactions  from "./OnRampTransactions";
import {useEffect, useState} from "react";
import { toastEnum, toastHelper } from "../utils/toast";
import useBalance from "../utils/useBalance";
import {getBalanceResponseUi} from "@repo/type-checks/zodSchemas";

const Transfer = () => {
    const [transactions, setTransactions] = useState([]);
    // const [balance, setBalance] = useState();
    const balance:any | null = useBalance();
    console.log(balance);
    useEffect(()=>{
        fetchTransactions();
    },[]);
    const fetchTransactions = async() => {
        try {
            const data = await getOnRampTransactions();
            setTransactions(data?.transactions);
            // console.log(data);
        } catch(e:any) {
            toastHelper(e?.message, toastEnum.ERROR);
            return;
        }
    }
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={ balance ? balance?.balance?.amount : 0} locked={balance ? balance?.balance?.locked : 0} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}
export default Transfer;