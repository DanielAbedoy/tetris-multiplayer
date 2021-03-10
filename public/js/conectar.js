class Conexion{

  constructor() {

    this.url = "http://localhost:3000";
    this.socket;
    this.nombre = new URL(window.location.href).searchParams.get("nombre");
    this.tipo = new URL(window.location.href).searchParams.get("type");
    this.salaId = new URL(window.location.href).searchParams.get("id");

    document.getElementById("jugadorN").textContent = this.nombre;

    if (this.comproabar()) {
      this.conectar();
    }
  }

  comproabar() {
    if (this.tipo === null || this.salaId === null) {
      window.location = "/";
      return false;
    }
    return true;
  }

  conectar() {
    this.socket = io();
    this.socket.on("connect", () => {
      this.entrarSala();
    })
  }

  entrarSala() {
    this.socket.emit("entrar", { sala: this.salaId, nombre: this.nombre }, (response) => {
      if (!response.estatus) window.location = "/";
    });
  }

  mandarInfo(info) {
    const data = { nombre: this.nombre, sala: this.salaId };
    this.socket.emit("mandarInfo", {...info, ...data});
  }

}

