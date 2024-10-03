import express from "express";
const app = express();
const otpRouter = express.Router();

otpRouter.post("/",(req:any,res:any)=>{
    const {body} = req;
    return res.json({
        code:"123456"
    })
});

export default otpRouter;