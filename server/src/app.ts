import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import entityRoutes from "./routes/entity-route";

const app = express();

// 🧩 Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(cors());
app.use(express.json());

// 🛣️ Routes
app.use("/api/entities", entityRoutes);

// 🧭 Health check route
app.get("/", (_, res) => {
  res.send("✅ API is running");
});

export default app;
