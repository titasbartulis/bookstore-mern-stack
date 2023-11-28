import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

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
    },
    role: {
      type: String,
      default: 'user',
    }
  }
);

registerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export const Register = mongoose.model('Register', registerSchema);