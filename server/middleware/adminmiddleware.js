const adminMiddleware = (req, res, next) => {

  // authMiddleware should run before this middleware
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required"
    });
  }

  next();
};

module.exports = adminMiddleware;
