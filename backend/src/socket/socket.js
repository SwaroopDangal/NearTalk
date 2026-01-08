import Group from "../models/group.models.js";

const emitActiveUsers = (io, groupId) => {
  const room = io.sockets.adapter.rooms.get(groupId);
  const count = room ? room.size : 0;

  io.to(groupId).emit("active-users", count);
};

const handleLeave = async (io, socket, groupId, username) => {
  socket.leave(groupId);

  socket.to(groupId).emit("system-message", {
    text: `${username} left`,
  });

  emitActiveUsers(io, groupId);

  // 🔥 auto delete group when empty
  const room = io.sockets.adapter.rooms.get(groupId);
  const count = room ? room.size : 0;

  if (count === 0) {
    await Group.findByIdAndDelete(groupId);
    console.log(`🗑️ group ${groupId} deleted`);
  }
};

export const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 socket connected:", socket.id);

    // ===== JOIN GROUP =====
    socket.on("join-group", ({ groupId, username }) => {
      if (!groupId) return;

      socket.join(groupId);
      socket.data.groupId = groupId;
      socket.data.username = username;

      socket.to(groupId).emit("system-message", {
        text: `${username} joined`,
      });

      emitActiveUsers(io, groupId);
    });

    // ===== SEND MESSAGE (🔥 THIS WAS MISSING) =====
    socket.on("send-message", ({ groupId, text, username }) => {
      if (!groupId || !text) return;

      io.to(groupId).emit("receive-message", {
        text,
        username,
        time: new Date(),
      });
    });

    // ===== LEAVE GROUP =====
    socket.on("leave-group", ({ groupId, username }) => {
      handleLeave(io, socket, groupId, username);
    });

    // ===== DISCONNECT =====
    socket.on("disconnect", () => {
      const { groupId, username } = socket.data;
      if (!groupId) return;

      handleLeave(io, socket, groupId, username);
    });
  });
};
