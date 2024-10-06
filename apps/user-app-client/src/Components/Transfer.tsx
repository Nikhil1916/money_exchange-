import { AddMoney } from "./AddMoney";
import { BalanceCard } from "./Balancecard";
import  OnRampTransactions  from "./OnRampTransactions";


const Transfer = () => {
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={20000} locked={0} />
                <div className="pt-4">
                    <OnRampTransactions transactions={[]} />
                </div>
            </div>
        </div>
    </div>
}
export default Transfer;