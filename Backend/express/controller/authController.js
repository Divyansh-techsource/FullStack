import jwt from "./util/jwt.js";
import User from "./models/studentModel.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { username, email, password,role } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim() || !role?.trim()) {
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

    if (!username?.trim() || !email?.trim() || !password?.trim() || !role?.trim()) {
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

    // const token = jwt.generateToken({
    //   id: user._id,
    //   username: user.username,
    //   email: user.email,
    // });

    const token = getToken(user);
    res.cookie("token", token, {
      httpONly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 100,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

export { register, login };
