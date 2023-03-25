import express from "express";

import userController from "../controller/user.controller.js";

const router = express.Router();

import multer from "../middleware/multer.config.js";

router.post("/image", multer, userController.uploadImage); // multer

export default router;