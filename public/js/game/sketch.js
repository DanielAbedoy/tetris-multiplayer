let socket;

const canvasJugador = function (p) {

  const size = { w: 400, h: 600, len: 40 };
  //let socket;

  let time = 0;
  let tetramino;
  let mapa;
  let tetraminos;
  let velocidad = 25;

  let initialPausa = true;
  let pausa = true;
  let start = true;
  let ganador = false;

  p.setup = function () {

    p.createCanvas(size.w, size.h);

    mapa = new Mapa(size, p);
    tetramino = new Tetramino(size.len, mapa, true, p);
    tetraminos = [];

    p.textSize(44);

    socket = new Conexion();
    socketFunctions();

    pausar();
    salir();
  }

  p.draw = function () {
    p.background(0);

    if (ganador) {
      p.fill(255);
      p.text("Eres el ganador", 40, size.h / 2);
    }else if (initialPausa) {
      p.fill(255);
      p.text("Esperando juador", 30, size.h / 2);

    }else if (pausa) {
      p.fill(255);
      p.text("Juego en pausa", 40, size.h / 2);

    } else if (start) {

      p.fill(255);
      p.textSize(36)
      p.text("Comenzando partida", 15, size.h / 2);

    } else {

      mapa.show();

      tetramino.show();
      tetraminos.forEach(t => t.show())

      if (time === velocidad) {
        addTetromino();
        time = 0;
        mandarInfoSocket();
      }
      time += 1;
    }
  }

  function addTetromino() {
    if (!tetramino.colicion(0)) { resetear(); return; }
    else if (!tetramino.mover("y", 1)) {
      tetramino.estatus = false;
      tetraminos.push(tetramino);
      mapa.pushPieza(tetramino);
      tetramino = new Tetramino(size.len, mapa, true, p);
      
      aumentarNivel();
      
    }
  }

  function mandarInfoSocket(){
    socket.mandarInfo({
      mapa: mapa.matriz,
      tetramino: {
        pos: tetramino.pos,
        pieza: tetramino.pieza.nombre,
        matriz: tetramino.pieza.matriz,
      },
      nivel: document.getElementById("nivelP").textContent,
      lineas: document.getElementById("lineasP").textContent,
      piezas: document.getElementById("piezasP").textContent,
    });
  }

  function resetear() {
    ganadorF();
    tetraminos = [];
    tetramino = new Tetramino(size.len, mapa, true, p);
    mapa.resetear();
    document.getElementById("piezasP").textContent = "0";
    document.getElementById("nivelP").textContent = "1";
    document.getElementById("lineasP").textContent = "0";
  }

  function aumentarNivel() {
    let num_piezas = parseInt(document.getElementById("piezasP").textContent);
    if (num_piezas % 5 === 0) {
      const el = document.getElementById("nivelP");
      const nivelN = parseInt(el.textContent);
      el.textContent = (nivelN + 1) + "";

      velocidad -= 3;
    }


  }

  p.keyPressed = function () {
    if (!pausa) {
      if (p.keyCode === p.LEFT_ARROW) tetramino.mover("x", -1)
      if (p.keyCode === p.RIGHT_ARROW) tetramino.mover("x", 1)
      if (p.keyCode === p.DOWN_ARROW) tetramino.mover("y", 1);

      if (p.keyCode === 65) tetramino.rotar("i");
      if (p.keyCode === 68) tetramino.rotar("d");

      mandarInfoSocket();
    }
  }

  function ganadorF() {
    socket.socket.emit("ganador", { ganador: true });
    window.location = "/";
  }

  function socketFunctions () {
    
    socket.socket.on("sendInfo", function (data) {
      console.log(data);
    });

    socket.socket.on("start", function (data) {
      initialPausa = false;
      pausa = false;
      
      if (document.getElementById("jugadorN").textContent === data.jugadores[0]) {
        document.getElementById("jugadorC").textContent = data.jugadores[1];
      }else document.getElementById("jugadorC").textContent = data.jugadores[0];

      setTimeout(() => {  
        start = false;
      }, 3000);
    })

    socket.socket.on("pausado", function (data) {
      pausa = data.pausa;
    })

    socket.socket.on("ganar", function (data) {
      ganador = data.ganador;
    })

  }

  function pausar() {
    
    document.getElementById("bt_pausa").addEventListener("click", function () {
      if (initialPausa) return;
      pausa = !pausa;
      socket.socket.emit("pausa", { pausa: pausa });
    })
  }

  function salir() {
    document.getElementById("bt_salir").addEventListener("click", function () {
      ganadorF();
    })
  }

}


new p5(canvasJugador, "canvasPlayer");
