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
      return res.json({
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

transferRouter.post("/P2P", (req: any, res: any) => {
    try {
        const { amount, to} = req.body;
        const from = req.userId;
    } catch(e) {

    }
});

export default transferRouter;
