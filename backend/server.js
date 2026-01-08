import express from "express";
import http from "http";
import { Server } from "socket.io";
import { ENV } from "./src/lib/env.js";
import path from "path";
import { connectDB } from "./src/lib/db.js";
import groupRoutes from "./src/routes/group.routes.js";
import cors from "cors";
import {initSocket} from "./src/socket/socket.js";

const app = express();
const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// routes
app.use("/api/group", groupRoutes);

// production static
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ⬇️ CREATE HTTP SERVER
const server = http.createServer(app);

// ⬇️ ATTACH SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: ENV.CLIENT_URL,
    credentials: true,
  },
});

// ⬇️ INIT SOCKET LOGIC
initSocket(io);

// ⬇️ START SERVER
const startServer = async () => {
  try {
    await connectDB();
    server.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
  }
};

startServer();
