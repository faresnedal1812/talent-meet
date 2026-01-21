import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/connectDB.js";

const app = express();

const PORT = ENV.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "API is working successfully" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log("Server is running on port:", PORT));
  } catch (error) {
    console.error("💥 starting the server", error.message);
    process.exit(1);
  }
};

startServer();
