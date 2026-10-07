import jwt from "./util/jwt.js";
import User from "./models/studentModel.js";
import bcrypt from "bcrypt";
import { generateTokenAccess, generateTokenRefresh } from "../util/jwt.js";

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (
      !username?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !role?.trim()
    ) {
      return res.status(400).json({
        message: "Please fill all the details",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (
      !username?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !role?.trim()
    ) {
      return res.status(400).json({
        message: "Please fill all the details",
      });
    }

    const user = await User.findOne({
      username,
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or email",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const tokenAccess = generateTokenAccess(user);
    const tokenRefresher = generateTokenRefresh(user);

    res.cookie("token", tokenAccess, {
      httpONly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("token", tokenRefresher, {
      httpONly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      tokenAccess,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      success: "false",
      message: "Token not found",
    });
  }

  res.clearCookies("token");

  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};

export { register, login };
