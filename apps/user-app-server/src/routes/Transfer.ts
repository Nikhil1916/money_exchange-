import express from "express";
import authMiddleware from "../middleware/authmiddleware";
import client from "@repo/db/client";
import axios from "axios";
var zodSchemas: any;
(async () => {
  zodSchemas = await import("@repo/type-checks/zodSchemas");
})();
const transferRouter = express.Router();

transferRouter.use(authMiddleware);
transferRouter.post("/addToWallet", async (req: any, res: any) => {
  try {
    const body = req.body;
    console.log("done 1");
    const isInputValid = zodSchemas.addTOWalletBody.safeParse(body);
    console.log(isInputValid);
    if (!isInputValid?.success) {
      return res.status(403).json({
        msg: "Invalid inputs",
      });
    }
    const userId = req.userId;
    const token = Math.random().toString();
    await client.onRampTransaction.create({
      data: {
        provider: body?.name,
        startTime: new Date(),
        token: token,
        userId: Number(userId),
        amount: body?.amount * 100,
        status: "Processing",
      },
    });

//created hook in diff app as web hook should be deployed on diff server bcz we dont want to load as we dont want it to fail
    try {
      const data = JSON.stringify({
        token: token,
        amount: body?.amount * 100,
        userId: Number(userId),
      });
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:6000/hdfcwebhook",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      console.log(response);
    } catch (e) {
      console.log(e, "web hook error");
      return res.status(400).json({
        e,
      });
    }

    return res.json({
      msg: "captured",
    });
  } catch (e) {
    return res.status(400).json({
      e,
      msg: "error while ramping transaction",
    });
  }
});

transferRouter.post("/P2P", async(req: any, res: any) => {
  
    try {
        const { amount, to} = req.body;
        const userId = req.userId;
        const toUser = await client.user.findFirst({
          where:{
            number:to
          }
        });
        if(!toUser) {
          return res.status(404).json({
            msg:"User not found"
          })
        }
        await client.$transaction(async(tx)=>{
          await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`;
          const fromBalance = await tx.balance.findUnique({
            where:{
              userId
            }
          })
          if(!fromBalance || fromBalance.amount<amount) {
            return res.status(400).json({
              msg:"Insufficient Balance",
            })
          }
          await tx.balance.update({
            where: { userId: (userId) },
            data: { amount: { decrement: amount*100 } },
          });

          await tx.balance.update({
            where:{
              userId: toUser?.id
            },
            data:{
              amount:{
                increment: amount * 100
              }
            }
          })
        })
        return res.json({
          msg:"transaction completed"
        })
    } catch(e) {

    }
});

async function safeRawQuery(id: number) {
  const result = await client.$queryRaw`
    SELECT * FROM "Balance" WHERE "userId" = ${Number(id)} FOR UPDATE
  `;

  return result;
}

export default transferRouter;
