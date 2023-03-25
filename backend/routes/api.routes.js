import userController from "../controller/user.controller.js";
import express from "express";

const router = express.Router();

router.get("/test", userController.apiTest);

router.get("/getAllImagesUrl:id", userController.getAllImagesUrl);

router.post("/visitor", userController.compteurDeVisite);

router.get("/nbVisitor", userController.countVisitors);

router.get("/getCustomer:id", userController.getCustomer);



router.put("/writeUser", userController.writeUser);

router.delete("/delete:id", userController.deleteUser);

export default router;
