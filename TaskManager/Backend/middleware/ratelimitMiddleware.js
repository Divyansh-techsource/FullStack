const rateMiddleware = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  let user = requestCounts.get(ip);
  if (!user || now - user.startTime >= 15 * 60 * 1000) {
    user = { count: 0, startTime: now };
  }
  user.count++;
  requestCounts.set(ip, user);
  if (user.count > 15) {
    return res.status(429).json({
      success: false,
      message: "API limit exceeded",
    });
  }
  next();
};

export default rateMiddleware;
