import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
const getToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );
};

export default getToken;