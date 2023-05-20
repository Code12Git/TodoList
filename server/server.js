import express from "express";
import dotenv from "dotenv";
import connection from "./db/conn.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";

import cors from "cors";
import todoRoute from "./routes/todo.js";
//App Router
const app = express();

//Dot Environment
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;
//Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/todo", todoRoute);
app.use("/api/users", userRoute);

//Connection
connection();

//Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Listening

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
