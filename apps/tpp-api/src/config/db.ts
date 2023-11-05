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
      `\x1b[92m***   MongoDB connected\n\x1b[96m***   DB name: ${conn.connection.name}\n***   DB host: ${conn.connection.host} \n\x1b[95m***   ----------------\n***   Happy hacking!!!\x1b[0m`
    );
    // console.log(conn)
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
