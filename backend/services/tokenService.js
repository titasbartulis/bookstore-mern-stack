import jwt from 'jsonwebtoken';
import { RevokedToken } from '../models/revokedTokenModel.js'; 

export const revokeToken = async (token) => {
  try {
    const decodedToken = jwt.decode(token);
    const expiryDate = new Date(decodedToken.exp * 1000);
    const revoked = new RevokedToken({
      token: token,
      expiryDate: expiryDate
    });

    await revoked.save();
  } catch (error) {
    console.error("Error revoking token: ", error);
    throw error;
  }
};