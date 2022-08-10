import { Server } from "Socket.IO";

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
    } else {
        const io = new Server(res.socket.server, {
            cors: {
                credentials: true,
            },
        });
        res.socket.server.io = io;
        global.onlineUsers = new Map();

        io.on("connection", (socket) => {
            global.chatSocket = socket;
            socket.broadcast.emit("online-user", Object.fromEntries(global.onlineUsers));

            socket.on("add-user", (userId) => {
                if (userId) {
                    global.onlineUsers.set(userId, socket.id);
                    socket.broadcast.emit("online-user", Object.fromEntries(global.onlineUsers));
                }
            });

            socket.on("send-msg", (data) => {
                const sendUserSocket = global.onlineUsers.get(data.to);
                if (sendUserSocket) {
                    socket.to(sendUserSocket).emit("msg-recieve", data.id, data.message, data.to, data.from, data.createdAt);
                }
            });

            socket.on("delete-user", (userId) => {
                if (userId) {
                    global.onlineUsers.delete(userId);
                    socket.broadcast.emit("online-user", Object.fromEntries(global.onlineUsers));
                }
            });
        });
    }
    res.end();
};

export default SocketHandler;
