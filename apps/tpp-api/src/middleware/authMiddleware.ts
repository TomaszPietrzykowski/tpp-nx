import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import jwt from 'jsonwebtoken';
import User from '../model/userModel';

const jwtDecodeAsync = (token: string, secret: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, {}, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};

interface DecodedJwt {
  id?: string;
  iat?: Date;
  exp?: Date;
}

interface AppRequest extends Request {
  user?: object;
}

const authorize = catchAsync(
  async (req: AppRequest, res: Response, next: NextFunction) => {
    let token: string;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Nie jesteś zalogowany, brak uprawnień', 401));
    }

    const decoded: DecodedJwt = await jwtDecodeAsync(
      token,
      process.env.JWT_SECRET
    );

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('Nie znaleziono użytkownika związanego z tokenem', 401)
      );
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('Uzytkownik zmienił hasło, zaloguj się ponownie', 401)
      );
    }

    req.user = currentUser;
    next();
  }
);

export default authorize;
