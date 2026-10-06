import jwt from "jsonwebtoken";
import "dotenv/config";
const getToken = (user, role) => {
  return jwt.sign(
    {
      email: user.email,
      id: user._id,
      role: role,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );
};

export default getToken;
