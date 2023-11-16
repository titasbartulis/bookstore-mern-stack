import { RevokedToken } from '../models/revokedTokenModel.js'; // Adjust the path to your model

export const cleanupRevokedTokens = async () => {
  const now = new Date();
  //console.log("Current time:", now);

  const result = await RevokedToken.deleteMany({ expiryDate: { $lt: now } });
  //console.log("Deleted count:", result.deletedCount);
};

