import mongoose from "mongoose";

const revokedTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
});

export const RevokedToken = mongoose.model("RevokedToken", revokedTokenSchema);
