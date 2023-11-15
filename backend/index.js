import express from "express";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import registersRoute from './routes/registersRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const corsOptions = { origin: process.env.WEB_URL };
const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(cors(corsOptions));

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use('/books', booksRoute);
app.use('/registers', registersRoute);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
