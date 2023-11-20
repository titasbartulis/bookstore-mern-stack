// roleMiddleware.js

const checkRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: "Access Denied: You do not have the required permission" });
    }
  };
};

export default checkRole;
