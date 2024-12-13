import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import helmet from "helmet";
import laptopRoutes from "./src/routes/laptopRoutes.js";
import employeeRoutes from "./src/routes/employeeRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
const app = express();
connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/laptops", laptopRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
