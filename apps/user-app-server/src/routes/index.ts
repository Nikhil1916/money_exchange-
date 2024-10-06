import express from 'express';
import otpRouter from './send-otp';
import userRouter from './user';
import transactionRouter from './onRampTransactions';
const router = express.Router();
router.use("/send-otp",otpRouter);
router.use("/user",userRouter);
router.use("/onRampTransactions", transactionRouter)
export default router;