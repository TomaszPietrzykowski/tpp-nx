import { Request, Response } from 'express';
import AppError from '../utils/appError';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: { errors: Array<Error> }) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join('. ')}`;
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
  // operational error send to client otherwise send generic error
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

export default (err, req: Request, res: Response) => {
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