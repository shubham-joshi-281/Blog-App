import express from "express";
import {
  blogCreateController,
  blogGetAllController,
  blogGetController,
  blogUpdateController,
  blogDeleteController,
  userBlogController,
} from "../controllers/blogController.js";

const router = express.Router();

// BLOG GET ROUTES || GET  METHOD
router.get("/all-blog", blogGetAllController);

// BLOG GET ROUTES || GET  METHOD
router.get("/get-blog/:id", blogGetController);

// BLOG CREATE ROUTES || POST METHOD
router.post("/create-blog", blogCreateController);

// BLOG UPDATE ROUTES
router.put("/update-blog/:id", blogUpdateController);

// BLOG DELETE ROUTES
router.delete("/delete-blog/:id", blogDeleteController);

//USER BLOG GET ROUTES
router.get("/user-blog/:id", userBlogController);

export default router;
