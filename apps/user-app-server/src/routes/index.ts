import express from 'express';
import otpRouter from './send-otp';
import userRouter from './user';
const router = express.Router();
router.use("/send-otp",otpRouter);
router.use("/user",userRouter);
export default router;