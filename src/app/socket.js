const socket = require('socket.io');

class SocketClass{

  constructor(servidor) {
    this.io;
    this.server = servidor;
    this.players = {};
  }

  conectar() {
    this.io = socket(this.server);
    this.io.sockets.on('connection', (socket)=> this.newConnection(socket,this))
  }

  newConnection(socket, SocketIO) {
    let sala = "";
    let user = "";

    socket.on("entrar", function (data, callback) {
      sala = data.sala;
      user = data.nombre;
      socket.join(data.sala);
      const num_clientes = Array.from(SocketIO.io.sockets.adapter.rooms.get(data.sala)).length;
      if(num_clientes > 2){
        callback({message: "Sala completa",estatus:false });
        return;
      }

      if(!SocketIO.players[sala])SocketIO.players[sala] = [ data.nombre];
      else SocketIO.players[sala] = [...SocketIO.players[sala], data.nombre];
      
      if (num_clientes === 2) {
        SocketIO.io.to(sala).emit("start", { message: "Juego niciado", jugadores: SocketIO.players[sala] });
      } 
      callback({ message: "se unio a la sala", estatus: true, clientes:num_clientes });
      
    })

    socket.on("disconnect", function() {
      try {
        socket.to(sala).broadcast.emit("ganar",{ganador:true});
        SocketIO.players[sala] = SocketIO.players[sala].filter(u => u != user);
      }
      catch(e){}
    });

    socket.on("mandarInfo",function(info) {
      socket.to(sala).broadcast.emit("clienteData",info);
    })

    socket.on("pausa", function (data) {
      socket.to(sala).broadcast.emit("pausado",{pausa:data.pausa});
    })

    socket.on("ganador",function (data) {
      socket.to(sala).broadcast.emit("ganar",{ganador:data.ganador});
    })
  }
}

module.exports = SocketClass;