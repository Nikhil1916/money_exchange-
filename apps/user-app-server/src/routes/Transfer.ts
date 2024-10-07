import express from "express";
import authMiddleware from "../middleware/authmiddleware";
import client from "@repo/db/client";
var zodSchemas:any;
(async () => {
  zodSchemas = await import('@repo/type-checks/zodSchemas');
})();
const transferRouter = express.Router();

transferRouter.use(authMiddleware);
transferRouter.post("/addToWallet",async(req:any, res:any)=>{
    try {
    const body = req.body;
    console.log("done 1")
    const isInputValid = zodSchemas.addTOWalletBody.safeParse(body);
    console.log(isInputValid);
    if(!isInputValid?.success) {
        return res.status(403).json({
            msg:"Invalid inputs"
        })
    }
    const userId = req.userId;
    const token = (Math.random()).toString();
    await client.onRampTransaction.create({
        data:{
            provider: body?.name,
            startTime: new Date(),
            token: token,
            userId: Number(userId),
            amount: body?.amount * 100,
            status: "Processing"
        }
    });
    return res.json({
        msg:"captured"
    })
    } catch(e) {
        return res.status(400).json({
            e,
            msg:"error while ramping transaction"
        })
    }

});

export default transferRouter;
