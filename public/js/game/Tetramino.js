
class Tetramino {

  constructor(len, mapa, estatus, p) {

    this.p = p;

    this.pieza = new Piezas(p).getPieza();
    this.pos = { x: 3, y: 0 };
    this.len = len;
    this.mapa = mapa;
    this.prevs = { x: 3, y: 0 };
    this.estatus = estatus;


    this.cliente = false;
  }

  setData(matriz, pos, estatus, pieza) {
    this.pieza.nombre = pieza;
    this.pieza.matriz = matriz;
    this.pos = pos;
    this.estatus = estatus;
  }

  show() {
    this.p.fill(this.pieza.color);
    this.pieza.matriz.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0 && this.estatus) this.p.rect((x + this.pos.x) * this.len, (y + this.pos.y) * this.len, this.len, this.len);
      })
    });
  }

  colicion(val) {
    for (let y = 0; y < this.pieza.matriz.length; y++) {
      for (let x = 0; x < this.pieza.matriz[y].length; x++) {
        if (this.pieza.matriz[y][x] !== 0) {
          if (this.mapa.matriz[y + this.pos.y + val] === undefined) return false;
          if (this.mapa.matriz[y + this.pos.y + val][x + this.pos.x] !== 0) return false;
        }
      }
    }
    return true;
  }

  limites(val) {
    for (let y = 0; y < this.pieza.matriz.length; y++) {
      for (let x = 0; x < this.pieza.matriz[y].length; x++) {
        if (this.pieza.matriz[y][x] !== 0) {
          try {
            if (this.mapa.matriz[y + this.pos.y][x + this.pos.x + val] === undefined) return false;
          } catch (e) {return false;}
          if (this.mapa.matriz[y + this.pos.y][x + this.pos.x + val] !== 0) return false;
        }
      }
    }
    return true;

  }

  mover(dir, val) {
    if (dir === "y") {
      if (!this.colicion(1)) {
        this.mapa.lineaCompleta();
        return;
      }
      this.prevs.y = this.pos.y;
      this.pos.y += val;
    }
    else if (dir === "x") {
      if (!this.limites(val)) return;
      this.prevs.x = this.pos.x;
      this.pos.x += val;
    }

    return this.colicion(1);
  }

  rotar(dir) {
    
    let newMatriz = [];
    let m = this.pieza.matriz;

    const rotarIzquierda = () => {
      let c2 = 0;
      for (let y = 0; y < m.length; y++) {
        let c = 1;
        for (let x = 0; x < m[y].length; x++) {
          newMatriz[(m.length) - c][c2] = m[y][x];
          c++;
        }
        c2++;
      }
    }

    const rotarDerecha = () => {
      let c2 = 1;
      for (let y = m.length-1; y >= 0 ; y--) {
        let c = 0;
        for (let x = m[y].length-1; x >=0; x--) {
          newMatriz[y][x] = m[c][m.length - c2];
          c++;
        }
        c2++;
      }
    }

    m.forEach((r, y) => {
      let arr = [];
      r.forEach(x => arr.push(0));
      newMatriz.push(arr);
    });

    if (dir === 'i') {
      rotarIzquierda();
    } else if(dir === "d") {
      rotarDerecha();
    }

    this.pieza.matriz = newMatriz;

    if (!this.limites(0) || !this.colicion(0)) {
      
      this.rotar(dir === "i" ? "d" : "i");
    }
  }


}

