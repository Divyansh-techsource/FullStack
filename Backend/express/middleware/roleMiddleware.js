const checkrole = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.header("role");
    if (!req.user) {
      return res.status(401).json({
        message: "Role is not provided",
      });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Role not allowed",
      });
    }
  };
};

export default checkrole;
