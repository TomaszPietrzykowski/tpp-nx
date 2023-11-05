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
app.use('/api/users', userRouter);
app.use(express.static(path.join('/apps', '/tpp-api', '/src', '/view')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve('apps', 'tpp-api', 'src', 'view', 'index.html'))
);

// TODO: color logging library:
// https://blog.logrocket.com/using-console-colors-node-js/
// https://en.m.wikipedia.org/wiki/ANSI_escape_code#Colors

app.listen(port, host, () => {
  console.log(`\x1b[33m***   Server listening: http://${host}:${port} \x1b[0m`);
});

// const express = require("express")
// const colors = require("colors")
// const dotenv = require("dotenv")
// const path = require("path")
// const connectDB = require("./config/db")
// const productRouter = require("./router/productRoutes")
// const userRouter = require("./router/userRoutes")
// const orderRouter = require("./router/orderRoutes")
// const uploadRouter = require("./router/uploadRoutes")
// const checkoutRouter = require("./router/checkoutRoutes")
// const emailRouter = require("./router/emailRoutes")
// const errorMiddleware = require("./middleware/errorMiddleware.js")
// // initiate
// dotenv.config()

// const app = express()
// // middleware
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// // routes
// app.use("/api/products", productRouter)
// app.use("/api/users", userRouter)
// app.use("/api/orders", orderRouter)
// app.use("/api/uploads", uploadRouter)
// app.use("/api/checkout", checkoutRouter)
// app.use("/api/email", emailRouter)
// // static
// app.use("/public", express.static(path.join(__dirname, "/public")))
// app.use(express.static(path.join(__dirname, "/dist")))
// app.get("*", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "dist", "index.html"))
// )
// // custom error handlers
// app.use(errorMiddleware.notFound)
// app.use(errorMiddleware.errorHandler)
// // let's rock
// app.listen(5000)
