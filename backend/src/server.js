import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/connectDB.js";
import path from "path";

const app = express();

const __dirname = path.resolve();
const frontendDistPath = path.join(__dirname, "../frontend", "dist");

const PORT = ENV.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "API is working successfully" });
});

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(frontendDistPath)));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

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
