// const mongoose = require('mongoose')
// const colors = require('colors')
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.DB_URI.replace('<USER>', process.env.DB_USER).replace(
        '<PASSWORD>',
        process.env.DB_PASSWORD
      )
    );
    console.log(
      `MongoDB connected\nDB name: ${conn.connection.name}\nDB host: ${conn.connection.host}`
    );
    // console.log(conn)
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
