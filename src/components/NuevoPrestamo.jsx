import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { AutoComplete } from 'primereact/autocomplete'
import { Toast } from 'primereact/toast'
import { createRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { libroService } from 'src/services/libroService'
import { prestamoService } from 'src/services/prestamoService'
import { personaService } from 'src/services/personaService'

export const NuevoPrestamo = function() {

  const [personas, setPersonas] = useState([])
  const [libros, setLibros] = useState([])
  const [libro, setLibro] = useState(undefined)
  const [persona, setPersona] = useState(undefined)
  const navigate = useNavigate()
  const toast = createRef()

  useEffect(() => {
    const getPersonas = async function() {
      try {
        const personas = await personaService.getPersonas()
        setPersonas(personas)
      } catch (e) {
        console.log(e)
        toast.current.show({ severity: 'error', summary: 'Ocurrió un error al traer las personas. Revise el log para más detalles.', detail: e.message})
      }
    }
    getPersonas()
  }, [])

  async function prestar() {
    try {
      await prestamoService.prestar(libro, persona)
      toast.current.show({severity: 'success', summary: 'Préstamo de libros', detail: `Se prestó el libro ${libro.titulo} a ${persona.nombre} exitosamente`})
      navigate('/')
    } catch (e) {
      console.log(e)
      toast.current.show({severity: 'error', summary: 'Error al generar el préstamo', detail: e.message})
    }
  }

  async function buscarLibro(event) {
    setLibros(await libroService.getLibrosPrestables(event.query))
  }

  const defaultWidth = '25em'

  return (
    <div>
      <div className="titulo">Nuevo libro a prestar</div>
      <div className="section">
        <Dropdown style={{width: defaultWidth}} value={persona} optionLabel="nombre" options={personas} onChange={(e) => {
          setPersona(e.value)
        }} placeholder="Seleccione una persona"/>
      </div>
      <div className="section">
        <AutoComplete value={libro} inputStyle={{textAlign: 'center', width: defaultWidth}} placeholder="Seleccione un libro" suggestions={libros} completeMethod={buscarLibro} field="titulo" onChange={(e) => setLibro(e.value)} />
      </div>
      <div className="section">
        <Button label="Prestar" className="p-button-primary" onClick={prestar}></Button>
      </div>
      <div className="section">
        <Toast ref={toast} />
      </div>
    </div>
  )
}