import jwt from "jsonwebtoken";
import Todo from "../models/Todo.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifyUser);
    const user = await Todo.findOne({ _id: verifyUser._id });
    console.log(user.title);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid  token" });
  }
};
