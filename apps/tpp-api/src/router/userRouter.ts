import express, { Router } from 'express';
import { register, login } from '../controller/authController';
import authorize from '../middleware/authMiddleware';

const userRouter: Router = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', authorize, login);

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
