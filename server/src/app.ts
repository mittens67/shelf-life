import express from "express";
import cors from "cors";
import entityRoutes from "./routes/entity-route";

const app = express();

// 🧩 Middleware
app.use(cors());
app.use(express.json());

// 🛣️ Routes
app.use("/api/entity", entityRoutes);

// 🧭 Health check route
app.get("/", (_, res) => {
  res.send("✅ API is running");
});

export default app;
