class Mapa{


  constructor(limites, p) {

    this.p = p;

    this.matriz = [];
    this.len = limites.len;
    this.tetraminos = new Piezas(p);
    this.limites = limites;
    this.crearMatriz(limites);
  }

  crearMatriz(limites) {
    this.matriz = [];
    for (let y = 0; y < limites.h; y += limites.len) {
      let arr = [];
      for (let x = 0; x < limites.w; x+=limites.len) arr.push(0);
      this.matriz.push(arr);
    }
  }

  show() {

    this.matriz.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 0) {
          this.p.fill(0);
          this.p.rect((x) * this.len, (y) * this.len, this.len, this.len);
        } else {
          this.p.fill(this.tetraminos.pieces[`${(value-2)}`].color);
          this.p.rect((x) * this.len, (y) * this.len, this.len, this.len);
        }
      })
    });
  }

  pushPieza(tetramino) {
    tetramino.pieza.matriz.forEach((row,y) => {
      row.forEach((val, x) => {
        if (val !== 0) {
          let r = this.matriz[y+tetramino.pos.y];
          r[x + tetramino.pos.x] = tetramino.pieza.valor;
        }
      })
    });

    this.lineaCompleta();
  }

  lineaCompleta() {
    
    for (let y = this.matriz.length-1; y >=0; y--) {
      let c = 0;
      for (let x = 0; x < this.matriz[y].length; x++){
        if (this.matriz[y][x] !== 0) c += 1;
      }
      //Comprovar linea completa
      if (c === this.matriz[0].length) {
        this.matriz.splice(y, 1);
        this.matriz.unshift(this.matriz[0].fill(0));
        this.aumentarMarcador();
        y++;
      }

    }
  }

  resetear() {
    this.crearMatriz(this.limites);
  }

  aumentarMarcador() {
    const el = document.getElementById("lineasP");
    const lineasN = parseInt(el.textContent);
    el.textContent = (lineasN+1)+"";
  }

}

