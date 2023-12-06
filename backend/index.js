import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import booksRoute from "./routes/booksRoute.js";
import registersRoute from "./routes/registersRoute.js";
import loginRoute from "./routes/loginRoute.js";
import logoutRoute from "./routes/logoutRoute.js";
import checkoutRoute from './routes/checkoutRoute.js';
import authenticate from "./middleware/authMiddleware.js";
import { cleanupRevokedTokens } from "./services/tokenCleanup.js";

dotenv.config();
const corsOptions = { origin: process.env.WEB_URL };
const app = express();

// Stripe
app.use(express.static('public'));

// Middleware for parsing request body
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use("/books", authenticate, booksRoute);
app.use("/registers", registersRoute);
app.use("/", loginRoute);
app.use("/logout", authenticate, logoutRoute);
app.use('/checkout', checkoutRoute);

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

setInterval(async () => {
  console.log("Running scheduled cleanup of revoked tokens...");
  await cleanupRevokedTokens();
}, 3600000);
