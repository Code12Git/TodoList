import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });
//Register Controller

export const registerController = async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
      isAdmin: false,
    });
    await user.save();
    res
      .status(200)
      .json({ message: "User registered successfully", data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Login Controller

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password does not match" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(token);
    const tokenverify = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenverify);
    res
      .cookie("jwt", token, {
        httpOnly: true,
      })
      .json({
        isAdmin: user.isAdmin,
        token,
      });
    console.log(req.cookies.jwt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
