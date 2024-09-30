import express from "express";
// import {webHookSchema} from "@repo/type-checks/zodSchemas";

const app = express();

app.post("/hdfcwebhook",(req,res)=>{
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    // console.log(webHookSchema);
})