import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

const handleCastErrorDB = (err) => {
  const message = `Błąd rzutowania bazy ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Zduplikowane pole: ${value}. Użyj innej wartości`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: { errors: Array<Error> }) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Niepoprawne dane: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Token niepoprawny. Zaloguj się ponownie', 401);

const handleJWTExpiredError = () =>
  new AppError('Token wygasł. Zaloguj się ponownie', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProduction = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('Nierozpoznany błąd', err);
    res.status(500).json({
      status: 'error',
      message: 'Coś poszło nie tak... :/',
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // do not overwrite original object, hard copy it
    let error = { ...err, message: err.message };
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProduction(error, res);
  }
};
