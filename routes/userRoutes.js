import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

// REGISER USER ROUTES
router.post("/register", userController.registerController);

// // LOGIN USER ROUTES
router.post("/login", userController.loginController);

// // GET ALL USERS ROUTES
router.get("/get-all", userController.getAllUserController);

export default router;
