const express = require('express');
const SocketClass = require('./src/app/socket');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

const server = app.listen(port, () => {
  console.log("Servidor corriendo en el puerto " + port);
})

const socket = new SocketClass(server);
socket.conectar();
