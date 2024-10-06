import express from "express";
import client from "@repo/db/client";
import authMiddleware from "../middleware/authmiddleware";
const transactionRouter = express.Router();

transactionRouter.use(authMiddleware);
transactionRouter.get("/",async(req:any, res:any)=> {
    const userId = req?.userId;
    console.log(userId, "reached transaction");
    try {
        const transactions = await client.onRampTransaction.findMany({
            where: {
                userId
            }
        });
        return res.json({
            transactions
        })
    } catch(e) {
        return res.status(400).json({
            e
        })
    }
});

export default transactionRouter;