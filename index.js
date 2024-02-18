const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors({origin:'http://localhost:3000'}))
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: 'http://localhost:3000' });

io.on("connection", (socket) => {
  console.log("server connected");

  socket.on("beginPath", (arg) => {
    socket.broadcast.emit('beginPath',arg);
  });
  socket.on("drawPath", (arg) => {
    socket.broadcast.emit('drawPath',arg);
  })
  socket.on("changeConfig", (arg) => {
    console.log("change config args are",arg)
    socket.broadcast.emit('changeConfig',arg);
  })
});

httpServer.listen(5000);