function requireAdmin(req, res, next) {
  if (!req.admin) {
    next({
      error: "UnauthorizedError",
      name: "UnauthorizedError",
      message: "You must be logged in to perform this action",
    });
  }
  next();
}

module.exports = { requireAdmin };
