const checkrole = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.header("role");
    if (!role) {
      return res.status(403).json({
        message: "Role is not provided",
      });
    }
    if (allowedRoles.includes(role)) {
      next();
    } else {
      return res.status(403).json({
        message: "Not Allowed",
      });
    }
  };
};

export default checkrole;
