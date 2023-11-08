import express from 'express';
import 'dotenv/config';
import path from 'path';

import userRouter from './router/userRouter';
import corsMiddleware from './middleware/corsMiddleware';
import connectDB from './config/db';
import errorMiddleware from './middleware/errorMiddleware';
import AppError from './utils/appError';

const host = process.env.HOST;
const port = Number(process.env.PORT);
const app = express();
connectDB();
// middleware
app.use(errorMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('*', corsMiddleware);
// routes
app.use('/api/users', userRouter);
app.use(express.static(path.join('/apps', '/tpp-api', '/src', '/view')));
app.use('/api/*', (req, res, next) => {
  return next(new AppError('Endpoint nie istnieje', 404));
});
app.get('*', (req, res) =>
  res.sendFile(path.resolve('apps', 'tpp-api', 'src', 'view', 'index.html'))
);
app.use(errorMiddleware);
const server = app.listen(port, host, () => {
  console.log(
    `\x1b[33m***   Server listening on http://${host}:${port} \x1b[0m`
  );
});

process.on('unhandledRejection', (err: Error) => {
  console.log(`${err.name}: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err: Error) => {
  console.log(`${err.name}: ${err.message}`);
  process.exit(1);
});
