import express from "express";

import userController from "../controller/user.controller.js";

const router = express.Router();

import multer from "../middleware/multer.config.js";

router.get("/user", userController.getAllUsers);

router.put("/editUser", userController.editUser);

router.post("/", userController.writeUser);

router.get("/getOneUser", userController.getOneUser);

router.delete("/deleteCustomer", userController.deleteCustomer);

router.delete("/deletePortfolio", userController.deletePortfolio);

router.put("/editCustomer", userController.editCustomer);

router.post("/addCustomer", multer, userController.addCustomer); // multer

router.put(
  "/addProfileImagePanel",
  multer,
  userController.addProfileImagePanel
); // multer

router.get("/test", userController.authTest);

router.post("/login", userController.userLogin);

export default router;
