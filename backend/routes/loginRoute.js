import express, { response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Register } from "../models/registerModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await Register.findOne({ email });
    if (!user) {
      return response
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    response.json({token, role: user.role, message: "Login successful" });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
