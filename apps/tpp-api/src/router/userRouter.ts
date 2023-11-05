// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const userController = require("../controller/userController");
import express from 'express';
import { getUsers } from '../controller/userController';
const userRouter = express.Router();

userRouter.route('/').get(getUsers);
//   .post(userController.registerUser)
//   .get(authMiddleware.protect, authMiddleware.admin, userController.getUsers);

// router.post("/login", userController.authUser);

// router
//   .route("/profile")
//   .get(authMiddleware.protect, userController.getUserProfile)
//   .put(authMiddleware.protect, userController.updateUserProfile);

// router
//   .route("/:id")
//   .get(authMiddleware.protect, authMiddleware.admin, userController.getUserById)
//   .put(authMiddleware.protect, authMiddleware.admin, userController.updateUser)
//   .delete(
//     authMiddleware.protect,
//     authMiddleware.admin,
//     userController.deleteUser
//   );

export default userRouter;
