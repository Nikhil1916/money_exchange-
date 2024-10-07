import { Button } from "@repo/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToWallet } from "../utils/functions";
import { toastEnum, toastHelper } from "../utils/toast";
const BankUI = () => {
    const navigate = useNavigate();
  const addMoneyToWallet = async() => {
    try {
        setTimeout(()=>{},100);
        await addToWallet(searchParams.get("amount") as string,searchParams.get("name") as string);
        toastHelper("transaction completed", toastEnum.SUCCESS);
        navigate("/transfer")
    } catch(e) {
        toastHelper("transaction failed", toastEnum.ERROR);
    }
  }
  const [searchParams] = useSearchParams();
  return (
    <div className="d-flex justify-center mt-32 shadow-xl p-8 ml-72 rounded-sm">
      <div>
        <h1 className="text-xl font-semibold text-slate-500">
          Do You want to Authorize transaction of {searchParams.get("amount")}
        </h1>
        <div className="flex justify-center mt-6">
          <Button onClick={() => {
            addMoneyToWallet();
          }}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default BankUI;
