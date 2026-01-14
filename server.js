// server.js
import http from "http";
import { WebSocketServer } from "ws";

const server = http.createServer();
const wss = new WebSocketServer({ server });

/**
 * rooms = {
 *   [roomId]: {
 *     [userId]: WebSocket
 *   }
 * }
 */
const rooms = {};

wss.on("connection", (ws) => {
  let currentRoom = null;
  let currentUserId = null;

  ws.on("message", (data) => {
    let msg;
    try {
      msg = JSON.parse(data.toString());
    } catch {
      return;
    }

    const { type } = msg;

    if (type === "join-room") {
      const { roomId, userId } = msg;
      currentRoom = roomId;
      currentUserId = userId;

      if (!rooms[roomId]) rooms[roomId] = {};
      rooms[roomId][userId] = ws;

      // Notify existing users about new user
      Object.entries(rooms[roomId]).forEach(([otherId, socket]) => {
        if (otherId !== userId) {
          socket.send(
            JSON.stringify({
              type: "user-joined",
              userId,
            })
          );
        }
      });

      // Send back list of existing users to the new user
      const existingUsers = Object.keys(rooms[roomId]).filter(
        (id) => id !== userId
      );
      ws.send(
        JSON.stringify({
          type: "existing-users",
          users: existingUsers,
        })
      );
    }

    if (!currentRoom || !currentUserId) return;
    const room = rooms[currentRoom];
    if (!room) return;

    if (type === "offer" || type === "answer" || type === "ice-candidate") {
      const { to } = msg;
      const target = room[to];
      if (!target) return;

      target.send(
        JSON.stringify({
          type,
          from: currentUserId,
          sdp: msg.sdp,
          candidate: msg.candidate,
        })
      );
    }
  });

  ws.on("close", () => {
    if (currentRoom && currentUserId && rooms[currentRoom]) {
      delete rooms[currentRoom][currentUserId];

      // Notify others that this user left
      Object.values(rooms[currentRoom]).forEach((socket) => {
        socket.send(
          JSON.stringify({
            type: "user-left",
            userId: currentUserId,
          })
        );
      });

      if (Object.keys(rooms[currentRoom]).length === 0) {
        delete rooms[currentRoom];
      }
    }
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log("Signaling server running on port", PORT);
});
