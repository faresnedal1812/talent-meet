import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/connectDB.js";
import path from "path";
import cors from "cors";
import { inngest, functions } from "./lib/inngest.js";
import { serve } from "inngest/express";

const app = express();

app.use(express.json({ limit: "10mb" }));

if (!ENV.CLIENT_URL) {
  console.warn("⚠️ CLIENT_URL is not set. CORS may allow all origins.");
}

// credentials: true => mean: server is allow to browser to send cookie on the request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

const __dirname = path.resolve();
const frontendDistPath = path.join(__dirname, "../frontend", "dist");

const PORT = ENV.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "API is working successfully" });
});

app.use("/api/inngest", serve({ client: inngest, functions }));

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
