import jwt from "./util/jwt.js";
import User from "./models/studentModel.js";

const register = (req, res) => {
  const { username, email, password } = req.body;
  if (username == "" || email == "" || password == "") {
    return res.status(400).json({ message: "Please fill all the details" });
  }
  if (username == null || email == null || password == null) {
    return res.status(400).json({ message: "Please fill all the details" });
  }
  if (username == undefined || email == undefined || password == undefined) {
    return res.status(400).json({ message: "Please fill all the details" });
  }
  return res.status(200).json({ message: "User registered successfully" });
};

const login = (req, res) => {
  const { username, email, password } = req.body;
  if (username == "" || email == "" || password == "") {
    return res.status(400).json({ message: "Please fill all the details" });
  }
  if (username == null || email == null || password == null) {
    return res.status(400).json({ message: "Please fill all the details" });
  }
  if (username == undefined || email == undefined || password == undefined) {
    return res.status(400).json({ message: "Please fill all the details" });
  }
  return res.status(200).json({ message: "User logged in successfully" });
};
