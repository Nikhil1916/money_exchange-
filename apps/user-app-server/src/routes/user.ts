import express from "express";
import client from '@repo/db/client';
import bcrypt from "bcrypt";
const userRouter = express.Router();
userRouter.post("/signup",async (req:any, res:any)=>{
    console.log("okokokokokokoko");
    try {
        const userBody = req.body;
        console.log(userBody);
        const checkUser = await client.user.findFirst({
            where:{
                number: userBody.phoneNumber
            }
        });
        console.log(checkUser);
        if(checkUser) {
            return res.status(400).json({
                "error":"User already there"
            })
        }
        const hashedPassword = await bcrypt.hash(userBody.password,10);
        const user = await client.user.create({
            data:{
                number: userBody.phoneNumber,
                password:hashedPassword
            }
        });

        await client.balance.create({
            data:{
              amount:0,
              locked:0,
              userId: user?.id
            }
          });
        //   signin
        return res.json({
            id: user.id
        })
    } catch(e) {
        return res.status(400).json({
            error:"User creation api failed",
            e
        })
    }
});

export default userRouter;