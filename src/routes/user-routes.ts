import express from "express";
import { verifyJWT } from "../middlewares/auth";
import UserController from "../controllers/user-controller";

const router = express.Router();

router.get("/", verifyJWT, UserController.getUsers);
router.post("/", verifyJWT, UserController.create);
router.patch("/:id", verifyJWT, UserController.update);
router.delete("/:id", verifyJWT, UserController.delete);

export default router;
