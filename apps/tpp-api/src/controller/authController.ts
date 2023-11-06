import User from '../model/userModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import jwt from 'jsonwebtoken';

export const register = catchAsync(async (req, res) => {
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

// TODO fix types: https://mongoosejs.com/docs/typescript/statics-and-methods.html

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Podaj email i hasło', 400));
  }

  // const user = await User.findOne({ email }).select('+password');
  // if (!user || !(bcrypt)) {
  //   return next(new AppError("Niepoprawny login lub hasło", 401))
  // }

  const token = '';

  res.status(200).json({
    status: 'success',
    token,
  });
});
