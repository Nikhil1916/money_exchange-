import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextComponent";
import { useState } from "react";
import { toastEnum, toastHelper } from "../utils/toast";
import { P2PtransferHelper } from "../utils/functions";

const P2Ptransactions = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  const transfer = async () => {
    if (!amount) {
      toastHelper("please add amount", toastEnum.ERROR);
    } else if (!number) {
      toastHelper("please add number", toastEnum.ERROR);
    } else if (number && number.length != 10) {
      toastHelper("please add valid number", toastEnum.ERROR);
    } else {
      try {
        await P2PtransferHelper(number, amount);
        toastHelper("P2P transfer success", toastEnum.SUCCESS);
      } catch (e:any) {
        // console.log(e?.message);
        toastHelper(e?.message, toastEnum.ERROR);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="h-[90vh] ml-0 md:ml-28">
        <Center>
          <Card title="Person to Person transfer">
            <div className="min-w-72 pt-2">
              <TextInput
                placeholder={"Number"}
                label="Number"
                onChange={(value) => {
                  setNumber(value);
                }}
                type="phonenumber"
              />
              <TextInput
                type="number"
                placeholder={"Amount"}
                label="Amount"
                onChange={(value: any) => {
                  const regex = /^\d*\.?\d{0,2}$/;
                  console.log(value);
                  if (regex.test(value.toString())) {
                    // setNumber(value);
                    setAmount(value);
                  }
                }}
              />
              <div className="pt-4 flex justify-center">
                <Button onClick={transfer}>Send</Button>
              </div>
            </div>
          </Card>
        </Center>
      </div>
    </div>
  );
};
export default P2Ptransactions;
