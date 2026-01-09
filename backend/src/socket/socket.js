import { Server } from "socket.io";
import mongoose from "mongoose";
import Group from "../models/group.models.js";
import { ENV } from "../lib/env.js";

const deleteTimers = new Map();

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ENV.CLIENT_URL, // frontend URL
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // -------------------------
    // JOIN GROUP
    // -------------------------
    socket.on("join-group", async ({ groupId, username }) => {
      if (!groupId || !username) {
        return;
      }

      // Prevent duplicate join
      if (socket.data.groupId === groupId) {
        return;
      }

      // Validate MongoDB ID
      if (!mongoose.Types.ObjectId.isValid(groupId)) {
        socket.emit("group-not-found");
        return;
      }

      const exists = await Group.exists({ _id: groupId });
      if (!exists) {
        socket.emit("group-not-found");
        return;
      }

      // Cancel pending deletion if someone joins back
      if (deleteTimers.has(groupId)) {
        clearTimeout(deleteTimers.get(groupId));
        deleteTimers.delete(groupId);
      }

      // Join room
      socket.join(groupId);
      socket.data.groupId = groupId;
      socket.data.username = username;

      // Notify others
      socket.to(groupId).emit("system-message", {
        text: `${username} joined`,
      });

      emitActiveUsers(io, groupId);
    });

    // -------------------------
    // SEND MESSAGE
    // -------------------------
    socket.on("send-message", ({ groupId, text, username }) => {
      if (!text?.trim() || !groupId) return;

      io.to(groupId).emit("receive-message", {
        text,
        username,
        time: Date.now(),
      });
    });

    // -------------------------
    // DISCONNECT
    // -------------------------
    socket.on("disconnect", () => {
      const { groupId, username } = socket.data;

      if (groupId && username) {
        handleLeave(io, socket, groupId, username);
      }
    });
  });
};

// -------------------------
// HELPERS
// -------------------------
const emitActiveUsers = (io, groupId) => {
  const room = io.sockets.adapter.rooms.get(groupId);
  const count = room ? room.size : 0;
  io.to(groupId).emit("active-users", count);
};

const handleLeave = (io, socket, groupId, username) => {
  socket.leave(groupId);

  // Notify remaining users
  socket.to(groupId).emit("system-message", {
    text: `${username} left`,
  });

  emitActiveUsers(io, groupId);

  // Start deletion timer if room empty
  const room = io.sockets.adapter.rooms.get(groupId);
  if (!room || room.size === 0) {
    if (deleteTimers.has(groupId)) return; // already has timer

    const timer = setTimeout(async () => {
      const roomNow = io.sockets.adapter.rooms.get(groupId);
      if (!roomNow || roomNow.size === 0) {
        await Group.findByIdAndDelete(groupId);
      }
      deleteTimers.delete(groupId);
    }, 5000); // 5 seconds

    deleteTimers.set(groupId, timer);
  }
};
