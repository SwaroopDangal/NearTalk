import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import { ENV } from "./src/lib/env.js";
import { connectDB } from "./src/lib/db.js";
import groupRoutes from "./src/routes/group.routes.js";
import { initSocket } from "./src/socket/socket.js";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/group", groupRoutes);

// production
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// 🔑 HTTP SERVER
const server = http.createServer(app);

// 🔑 SOCKET INIT
initSocket(server);

const startServer = async () => {
  await connectDB();
  server.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on port ${ENV.PORT}`);
  });
};

startServer();
