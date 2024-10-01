import express from "express";
import client from "@repo/db/client";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());
app.post("/hdfcwebhook",async(req,res)=>{
    try {
        console.log(req.body);
        const paymentInformation = {
            token: req.body.token,
            userId: req.body.userId,
            amount: req.body.amount
        };
        console.log(paymentInformation);
        await client.balance.update({
            where: {
                userId: Number(paymentInformation.userId)
            },
            data:{
                amount:{
                    increment:Number(paymentInformation.amount)
                }
            }
        });
    
        await client.onRampTransaction.update({
            where:{
                token:paymentInformation.token
            },
            data:{
                status:"Success"
            }
        })
        res.json({
            message: "Captured"
        })
    } catch(e) {
        const paymentInformation = {
           ...req.body
        };
        console.log(e);
        res.json({
            e,
            paymentInformation
        })
    }
});

app.listen(5000,()=>{
    console.log("web hook handler listens on 5000")
});