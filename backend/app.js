import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import { connectToDatabase } from "./config/database.js";
import { PORT } from "./config/env.js";

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);

app.listen(PORT, async () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  await connectToDatabase();
});
