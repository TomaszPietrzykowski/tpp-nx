import express, { Router } from 'express';
import { register, login } from '../controller/authController';
import { getUsers } from '../controller/userController';
import authorize from '../middleware/authMiddleware';

const userRouter: Router = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', authorize, login);
userRouter.route('/').get(getUsers);

export default userRouter;
