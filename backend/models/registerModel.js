import mongoose from "mongoose";

const registerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    }
  }
);

export const Register = mongoose.model('Register', registerSchema);