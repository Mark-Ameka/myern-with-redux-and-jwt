import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// database
import "./config/db.js";

// routes
import libraryRoutes from "./routes/library.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/library", libraryRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
