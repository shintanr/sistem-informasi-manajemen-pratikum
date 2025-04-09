import express from "express";
import cors from "cors";
import morgan from "morgan";
import labRoutes from "./routes/labRoutes.js";
import praktikumRoutes from "./routes/praktikumRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import presensiRoutes from "./routes/presensiRoutes.js";
import penilaianRoutes from "./routes/penilaianRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const PORT = 8080;


app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true,               // agar cookie dikirim
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());



// Gunakan routes yang sudah modular
app.use("/api/auth", authRoutes);
app.use("/api", labRoutes);
app.use("/api", praktikumRoutes);
app.use("/api", userRoutes); 
app.use("/api", presensiRoutes);
app.use('/api/penilaian', penilaianRoutes);

// proteksi api dengan middleware 
app.use("/api/protected", protectedRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});