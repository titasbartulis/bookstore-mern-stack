import jwt from 'jsonwebtoken';
import { RevokedToken } from '../models/revokedTokenModel.js';

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(403).json({ message: 'A token is required for authentication' });
  }

  const token = authHeader.split(' ')[1];

  const tokenRevoked = await RevokedToken.findOne({ token });
  if (tokenRevoked) {
    return res.status(401).json({ message: 'Token has been revoked' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};
