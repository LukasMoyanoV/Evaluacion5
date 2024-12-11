import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useState, useEffect, createRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import { prestamoService } from 'src/services/prestamoService'

export const PrestamosPendientes = function() {
  const [prestamosPendientes, setPrestamosPendientes] = useState([])
  const navigate = useNavigate()
  const toast = createRef()

  useEffect(() => {
    const getPrestamosPendientes = async function() {
      try {
        const prestamos = await prestamoService.getPrestamosPendientes()
        setPrestamosPendientes(prestamos)
      } catch (e) {
        console.log(e)
        toast.current.show({ severity: 'error', summary: 'Ocurrió un error al traer los préstamos pendientes. Revise el log para más detalles.', detail: e.message})
      }
    }
    getPrestamosPendientes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function devolver(prestamo) {
    return <Button icon="pi pi-replay" tooltip="Devolver" className="p-button-secondary p-button-raised p-button-rounded" onClick={async () => {
      try {
        await prestamoService.devolver(prestamo)
        const prestamos = await prestamoService.getPrestamosPendientes()
        setPrestamosPendientes(prestamos)
      } catch (e) {
        console.log(e)
        toast.current.show({ severity: 'error', summary: 'Ocurrió un error al intentar devolver el préstamo pendiente. Revise el log para más detalles.', detail: e.message})
      }
    }}
  />
  }
  
  return (
    <div>
      <Toast ref={toast} />
      <div className="titulo">Préstamos de libros</div>
      <DataTable value={prestamosPendientes}>
        <Column field="libro.titulo" header="Libro"></Column>
        <Column field="persona.nombre" header="Persona"></Column>
        <Column field="fechaAMostrar" header="Fecha del préstamo"></Column>
        <Column body={devolver} style={{width:'15em'}} />
      </DataTable>
      <div className="botonera">
        <Button icon="pi pi-plus" label="Prestar un nuevo libro" className="p-button-primary p-button-outlined p-button-rounded" onClick={() => { navigate('/nuevoPrestamo')}}></Button>
      </div>
    </div>
  )
}