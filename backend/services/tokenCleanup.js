import { RevokedToken } from '../models/revokedTokenModel.js';

export const cleanupRevokedTokens = async () => {
  const now = new Date();

  const result = await RevokedToken.deleteMany({ expiryDate: { $lt: now } });
};
