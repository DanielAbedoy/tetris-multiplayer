const canvasCliente = function (p) {

  const size = { w: 300, h: 450, len: 30 };

  let socketIo;
  let mapa;
  let tetromino;

  p.setup = function () {
    p.createCanvas(size.w, size.h);
    socketIo = socket;
    socketFunctions();

    mapa = new Mapa(size, p);
    tetromino = new Tetramino(size.len, mapa, false,p);
  }

  p.draw= function() {
    p.background(0);

    mapa.show();
    tetromino.show();

  }

  function socketFunctions(){
    socketIo.socket.on("clienteData", function(data){
      mapa.matriz = data.mapa;
      tetromino.setData(data.tetramino.matriz, data.tetramino.pos, true, data.tetramino.pieza);

      document.getElementById("lineasC").textContent = data.lineas;
      document.getElementById("piezasC").textContent = data.piezas;
      document.getElementById("nivelC").textContent = data.nivel;

    })
  }
}

new p5(canvasCliente, "canvasCliente");

