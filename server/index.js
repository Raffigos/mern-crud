import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoute from "./routes/productRoute.js";

dotenv.config();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

// Middleware & Routing
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/api/products", productRoute);

// MongoDB & Listener
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to MongoDB\nServer is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
