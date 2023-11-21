import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import booksRoute from "./routes/booksRoute.js";
import registersRoute from "./routes/registersRoute.js";
import loginRoute from "./routes/loginRoute.js";

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

app.use("/books", booksRoute);
app.use("/registers", registersRoute);
app.use("/", loginRoute);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
