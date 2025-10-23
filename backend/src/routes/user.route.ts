import express from "express";
import  {registerUser , UserLogin} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", registerUser);
router.post('/login', UserLogin)

export default router