import Group from "../models/group.models.js";

const groupUsers = {};
// { groupId: Set(socketId) }

export default function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join-group", async ({ groupId, username }) => {
      socket.join(groupId);

      if (!groupUsers[groupId]) {
        groupUsers[groupId] = new Set();
      }

      groupUsers[groupId].add(socket.id);

      await Group.findByIdAndUpdate(groupId, {
        $inc: { activeUsers: 1 },
      });

      io.to(groupId).emit("system-message", {
        text: `${username} joined`,
      });
    });

    socket.on("send-message", ({ groupId, text, username }) => {
      io.to(groupId).emit("receive-message", {
        text,
        username,
        time: new Date(),
      });
    });

    socket.on("disconnect", async () => {
      for (const groupId in groupUsers) {
        if (groupUsers[groupId].has(socket.id)) {
          groupUsers[groupId].delete(socket.id);

          await Group.findByIdAndUpdate(groupId, {
            $inc: { activeUsers: -1 },
          });

          if (groupUsers[groupId].size === 0) {
            delete groupUsers[groupId];
            await Group.findByIdAndDelete(groupId);
          }
        }
      }
    });
  });
}
