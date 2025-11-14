import express from "express";
import  {registerUser , UserLogin} from "../controllers/auth.controller.js";
import passport from "../lib/passport.js";
import { FRONTEND_URL } from "../lib/config.js";
const router = express.Router();

router.post("/register", registerUser);
router.post('/login', UserLogin)

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {session:false}),
  (req, res) => {
    res.redirect(FRONTEND_URL + 'dashboard');
  }
);

export default router