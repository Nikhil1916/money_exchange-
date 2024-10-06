import jwt , {JwtPayload} from "jsonwebtoken";
const authMiddleware = (req:any, res:any, next:any) => {
    console.log("middleware start")
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            error: "Token is missing",
        })
    }
    const token = authHeader?.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log(decoded, "okokok");
        if((decoded as JwtPayload)?.userId) {
            console.log("done");
            req.userId = (decoded as JwtPayload)?.userId;
            next();
        }
    } catch(e) {
        return res.status(403).json({
            error: "token expired",
            isLoggedIn: false
        });
    }
}

export default authMiddleware;