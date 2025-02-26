import User from "../models/User.js";
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

dotenv.config({ path: "D:\\Mayank Data\\CODING\\MERN Projects\\Chat Express\\server\\.env" });

export const verifyToken = async (req, res, next)=>{
    const refreshToken = req.session.refreshToken;

    if(!refreshToken) return res.status(401).json({ msg: "Unauthorized" })

    const verification = jwt.verify(refreshToken, process.env.JWT_SECRET );

    // console.log(verification)

    const foundUser = await User.findById(verification.userId);

    if(!foundUser) return res.status(401).json({ msg: "Unauthorized" });

    req.session.user = foundUser;

    return next();
}