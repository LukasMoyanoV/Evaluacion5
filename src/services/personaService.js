import axios from 'axios'
import { SERVER_CONNECTION } from './constants'

class PersonaService {

  async getPersonas() {
    const personasJson = await axios.get(SERVER_CONNECTION + '/personas')
    return personasJson.data
  }

  async findByNombre(nombre) {
    const personas = await this.getPersonas()
    return personas.find((persona) => persona.nombre.toLowerCase().includes(nombre.toLowerCase()))
  }
}

export const personaService = new PersonaService()