import express from "express";
import client from "@repo/db/client";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());
app.post("/hdfcwebhook", async (req: any, res: any) => {
  try {
    console.log(req.body);
    const paymentInformation = {
      token: String(req.body.token),
      userId: req.body.userId,
      amount: req.body.amount,
    };
    await client.$transaction([
      client.balance.update({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      client.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    return res.json({
      message: "Captured",
    });
  } catch (e) {
    const paymentInformation = {
      ...req.body,
    };
    await client.onRampTransaction.update({
      where: {
        token: paymentInformation.token,
      },
      data: {
        status: "Failure",
      },
    });
    console.log(e, "hdfc web hook service failed");
    res.status(400).json({
      e,
    });
  }
});

app.listen(6000, () => {
  console.log("web hook handler listens on 6000");
});
