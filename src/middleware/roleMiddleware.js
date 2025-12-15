/**
 * Role-based authorization middleware
 * Restricts access to routes based on user roles
 *
 * @param {...string} roles - Variable number of role names that are allowed to access the route
 * @returns {Function} Express middleware function
 *
 * @example
 * // Single role
 * router.get('/admin', authorize('admin'), adminController);
 *
 * // Multiple roles
 * router.post('/content', authorize('admin', 'editor'), contentController);
 */
const authorize = (...roles) => {
  // Return middleware function that will be executed on each request
  return (req, res, next) => {
    // Check if the user's role is included in the allowed roles array
    if (!roles.includes(req.user.role)) {
      // User doesn't have permission - return 403 Forbidden status
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }
    // User has valid role - proceed to next middleware/controller
    next();
  };
};

module.exports = authorize;
