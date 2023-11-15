import express from "express";
import { Register } from "../models/registerModel.js";

const router = express.Router();

//Route for posting a registration
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.firstName ||
      !request.body.email ||
      !request.body.password
    ) {
      return response.status(400).send({
        message: "Send all required fields: first name, email, password",
      });
    }
    const newRegister = {
      firstName: request.body.firstName,
      email: request.body.email,
      password: request.body.password,
    };
    const register = await Register.create(newRegister);
    return response.status(201).send(register);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;