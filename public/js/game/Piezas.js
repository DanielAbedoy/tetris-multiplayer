class Piezas{

  constructor(p) {

    this.p = p;

    this.pieces = {
      0: {
        nombre:"O",
        borde:'black',
        color: "green",
        valor:2,
        matriz: [
          [1, 1],
          [1, 1]
        ]
      },
      1: {
        nombre:"I",
        borde:'black',
        color: "white",
        valor:3,
        matriz: [
          [0, 1, 0,0],
          [0, 1, 0,0],
          [0, 1, 0,0],
          [0, 1, 0,0],
        ]
      },
      2: {
        nombre:"S",
        borde:'black',
        color: "yellow",
        valor:4,
        matriz: [
          [0, 1, 1],
          [1, 1, 0],
          [0, 0, 0],
        ]
      },
      3: {
        nombre:"Z",
        borde:'black',
        color: "gray",
        valor:5,
        matriz: [
          [1, 1, 0],
          [0, 1, 1],
          [0, 0, 0],
        ]
      },
      4: {
        nombre:"L",
        borde:'black',
        color: "blue",
        valor:6,
        matriz: [
          [0, 1, 0],
          [0, 1, 0],
          [0, 1, 1],
        ]
      },
      5: {
        nombre:"J",
        borde:'black',
        color: "pink",
        valor:7,
        matriz: [
          [0, 1, 0],
          [0, 1, 0],
          [1, 1, 0],
        ]
      },
      6: {
        nombre:"T",
        borde:'black',
        color: "red",
        valor:8,
        matriz: [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0],
        ]
      },
    }
  }

  getPieza() {
    this.aumentarPiezas();
    return this.pieces[`${parseInt(this.p.random(0, 7))}`];
    //return this.pieces[`1`];
  }

  aumentarPiezas() {
    const el = document.getElementById("piezasP");
    const piezasN = parseInt(el.textContent);
    el.textContent = (piezasN+1)+"";
  }

}