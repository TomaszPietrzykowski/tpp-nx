import express from 'express';
import 'dotenv/config';
import path from 'path';

import userRouter from './router/userRouter';
import corsMiddleware from './middleware/corsMiddleware';
import connectDB from './config/db';

const host = process.env.HOST;
const port = Number(process.env.PORT);
const app = express();
connectDB();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('*', corsMiddleware);
// routes
app.use('/api/users', userRouter);
app.use(express.static(path.join('/apps', '/tpp-api', '/src', '/view')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve('apps', 'tpp-api', 'src', 'view', 'index.html'))
);
// // custom error handlers
// app.use(errorMiddleware.notFound)
// app.use(errorMiddleware.errorHandler)

app.listen(port, host, () => {
  console.log(
    `\x1b[33m***   Server listening on http://${host}:${port} \x1b[0m`
  );
});
