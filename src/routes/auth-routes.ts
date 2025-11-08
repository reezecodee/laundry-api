import express from "express";
import AuthController from "../controllers/auth-controller";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post('/refresh-token', AuthController.handleRefreshToken);
router.delete('/logout', AuthController.handleLogout);

export default router;
