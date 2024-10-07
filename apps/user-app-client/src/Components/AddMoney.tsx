
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/Select";
import { useState } from "react";
import { TextInput } from "@repo/ui/TextComponent";
import { useNavigate } from "react-router-dom";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "/transaction/bank?name=hdfc"
}, {
    name: "Axis Bank",
    redirectUrl: "/transaction/bank?name=axis"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount , setAmount]= useState(0);
    const navigate = useNavigate();
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val:any) => {
        setAmount(val);
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value:any) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={() => {
                // window.location.href = redirectUrl || "";
                navigate(redirectUrl+`&amount=${amount}`);
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}