const LIBRE = 'L'
const PRESTADO = 'P'

export class Libro {
  constructor(id, titulo, autor, prestado = false) {
    this.id = id
    this.titulo = titulo
    this.autor = autor
    this.activo = true
    this.estado = prestado ? PRESTADO : LIBRE
  }

  prestar() {
    this.estado = PRESTADO
  }

  devolver() {
    this.estado = LIBRE
  }

  estaDisponible() {
    return this.estado === LIBRE
  }
}