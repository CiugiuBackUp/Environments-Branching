import express, { json } from "express";
import userRoutes from "./src/routes/user.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(json());

// Routes
app.use("/api", userRoutes);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
