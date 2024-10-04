import express from "express";
import client from '@repo/db/client';
import bcrypt from 'bcryptjs';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
const userRouter = express.Router();
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string; 
userRouter.post("/signup",async (req:any, res:any)=>{
    // console.log(JWT_SECRET);
    // return res.json({
    //     JWT_SECRET
    // })
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
          const token = jwt.sign({ userId:user?.id }, JWT_SECRET , {
            expiresIn:"2 hours"
          });
        return res.json({
            id: user.id,
            token
        })
    } catch(e) {
        console.log(e);
        return res.status(400).json({
            error:"User creation api failed",
            e
        });
    }
});

export default userRouter;