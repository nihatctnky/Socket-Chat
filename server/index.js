const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Kullanıcı bağlandı:", socket.id);

    socket.on("room", (data) => {
        socket.join(data);
        console.log(`${socket.id} kullanıcısı ${data} odasına katıldı`);
    });

    socket.on("message", (data) => {
        console.log("Mesaj alındı:", data);

        socket.to(data.room).emit("messageReturn", data);
    });

    socket.on("disconnect", () => {
        console.log("Kullanıcı ayrıldı:", socket.id);
    });
});

server.listen(5000, () => {
    console.log("Server 5000 portunda çalışıyor");
});