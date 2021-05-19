const express = require('express');
const http = require('http');
const SocketClass = require('./src/app/socket');



const app = express();
const server = http.createServer(app)
const port = process.env.PORT || 3000;

app.use(express.static("public"));

server.listen(port, () => {
  console.log("Servidor corriendo en el puerto " + port);
})

const socket = new SocketClass(server);
socket.conectar();
