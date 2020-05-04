const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
    console.log("New Ws Connection...");

    socket.emit("message", "Welcome to ChatCord!");

    socket.broadcast.emit("message", { msg: "A user has joined the chat" });

    socket.on("disconnect", () => {
        io.emit("message", { msg: "A user has left the chat" });
    })

    socket.on("chatMessage", msg => {
        io.emit("message", { msg: msg, id: socket.id });
    })
})


const PORT = 2929;
server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));