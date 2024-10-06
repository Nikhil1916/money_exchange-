import express from "express";
import client from "@repo/db/client";
import authMiddleware from "../middleware/authmiddleware";
const balanceRouter = express.Router();

balanceRouter.use(authMiddleware);
balanceRouter.get("/",async(req:any, res:any)=> {
    const userId = req?.userId;
    console.log(userId, "reached Balance");
    try {
        const balance = await client.balance.findFirst({
            where: {
                userId
            }
        });
        return res.json({
            balance
        })
    } catch(e) {
        return res.status(400).json({
            e
        })
    }
});

export default balanceRouter;