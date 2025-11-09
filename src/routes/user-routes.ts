import express from "express";
import { verifyJWT } from "../middlewares/auth";
import UserController from "../controllers/user-controller";
import { checkRole } from "../middlewares/check-role";
import { UserRole } from "../entities/user";

const router = express.Router();

router.get(
  "/",
  verifyJWT,
  checkRole([UserRole.ADMIN]),
  UserController.getUsers
);
router.post("/", verifyJWT, checkRole([UserRole.ADMIN]), UserController.create);
router.patch(
  "/:id",
  verifyJWT,
  checkRole([UserRole.ADMIN]),
  UserController.update
);
router.delete(
  "/:id",
  verifyJWT,
  checkRole([UserRole.ADMIN]),
  UserController.delete
);

export default router;
