import { Router } from "express";
import { login, signup, check, logout, updateProfile } from "../controllers/auth.controller.js";
import { checkSchema } from "express-validator"
import { validationObj, validationObj2 } from "../utils/validationObject.js";
import { verifyToken } from "../middleware/token.verification.js";


const router = Router();

router.post("/signup", checkSchema(validationObj), signup);
router.post("/login", checkSchema(validationObj2), login);
router.get("/check", verifyToken, check)
router.post("/logout", verifyToken, logout);
router.patch("/updateProfile", verifyToken, updateProfile)

export default router

