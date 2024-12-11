import { format, parseISO } from 'date-fns'

export class Prestamo {
  constructor(libro, persona, fechaPrestamo = new Date()) {
    this.libro = libro
    this.persona = persona
    this.fechaPrestamo = fechaPrestamo
    this.fechaDevolucion = undefined
  }

  pendiente() {
    return !this.fechaDevolucion
  }

  get fechaAMostrar() {
    return format(this.fechaPrestamo, 'dd/MM/yyyy')
  }
  
  static fromJSON(prestamoJson) {
    const fecha = prestamoJson.fechaPrestamo ? parseISO(prestamoJson.fechaPrestamo) : new Date()
    const nuevoPrestamo = new Prestamo(prestamoJson.libro, prestamoJson.persona, fecha)
    nuevoPrestamo.id = prestamoJson.id
    return nuevoPrestamo
  }
}