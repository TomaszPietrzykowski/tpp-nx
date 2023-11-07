import User from '../model/userModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const register = catchAsync(async (req: Request, res: Response) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
      token,
    },
  });
});

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Podaj email i hasło', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!(await user.matchPassword(password, user.password))) {
      return next(new AppError('Niepoprawny login lub hasło', 401));
    }

    const token = '';

    res.status(200).json({
      status: 'success',
      token,
    });
  }
);
