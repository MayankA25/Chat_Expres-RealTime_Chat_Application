import { Router } from "express";
import { getMessages, getUsers, sendMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/token.verification.js";

const router2 = Router();

router2.post("/getmessages",verifyToken, getMessages);
router2.get("/getusers",verifyToken, getUsers)
router2.post("/sendmessage",verifyToken, sendMessage);


export default router2;