import { Router } from "express";
import { getAllUsers, registerController, loginController } from "../controllers/userContoller.js";
const router = Router();
router.get("/all-users", getAllUsers);
router.post("/register", registerController);
router.post("/login", loginController);
export default router;
