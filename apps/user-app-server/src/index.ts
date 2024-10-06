import bodyParser from "body-parser";
import express from "express";
import router from "./routes";
import cors from "cors";
const app = express();
const PORT = 7000;
app.use(bodyParser.json());
const corsOptions = { 
    origin : ['http://localhost:5174'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
    credentials: true, // Allow sending cookies and credentials if needed
} 
app.use(cors(corsOptions))
app.get("/api/healthy-server",(req:any,res:any)=>{
    return res.json({
        msg:"healthy server"
    })
})
app.use("/api/v1",router);


app.listen(PORT, () => {
	// if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});