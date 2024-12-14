import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const PrestamosPendientes = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para cargar los préstamos pendientes
  useEffect(() => {
    const cargarPrestamos = async () => {
      try {
        const db = getFirestore();
        const prestamosCollection = collection(db, 'prestamos');
        const snapshot = await getDocs(prestamosCollection);

        if (snapshot.empty) {
          console.log("No hay préstamos pendientes.");
          setPrestamos([]);
        } else {
          // Mapeo de los documentos para obtener datos adicionales
          const prestamosList = await Promise.all(
            snapshot.docs.map(async (docSnap) => {
              const prestamoData = docSnap.data();
              const libroRef = doc(db, 'libros', prestamoData.libro_id);
              const libroSnap = await getDoc(libroRef);
              const libroTitulo = libroSnap.exists() ? libroSnap.data().titulo : 'Título no disponible';

              const personaRef = doc(db, 'users', prestamoData.persona_id);
              const personaSnap = await getDoc(personaRef);
              const personaNombre = personaSnap.exists() ? personaSnap.data().nombre : 'Nombre no disponible';

              // Conversión de fechas de Firestore (formato de tiempo UNIX)
              const fechaPrestamo = prestamoData.fecha_prestamo ? new Date(prestamoData.fecha_prestamo.seconds * 1000).toLocaleDateString() : 'Fecha no disponible';
              const fechaDevolucion = prestamoData.fecha_devolucion ? new Date(prestamoData.fecha_devolucion.seconds * 1000).toLocaleDateString() : 'Fecha no disponible';

              return {
                id: docSnap.id,
                libro: libroTitulo,
                persona: personaNombre,
                fecha_prestamo: fechaPrestamo,
                fecha_devolucion: fechaDevolucion,
                libro_id: prestamoData.libro_id,
              };
            })
          );

          setPrestamos(prestamosList); // Actualiza el estado de los préstamos
        }
      } catch (error) {
        console.error("Error al cargar los préstamos pendientes:", error);
        setPrestamos([]); // Si ocurre un error, dejamos el estado en vacío
      } finally {
        setLoading(false); // Termina la carga de los datos
      }
    };

    cargarPrestamos();
  }, []); // Se ejecuta solo una vez cuando se monta el componente

  // Función para devolver un libro
  const devolverLibro = async (prestamoId, libroId) => {
    try {
      const db = getFirestore();
      const prestamoRef = doc(db, 'prestamos', prestamoId);
      await deleteDoc(prestamoRef); // Elimina el préstamo de la base de datos

      const libroRef = doc(db, 'libros', libroId);
      await updateDoc(libroRef, { disponible: true }); // Marca el libro como disponible

      // Elimina el préstamo de la lista mostrada en la UI
      const nuevosPrestamos = prestamos.filter(prestamo => prestamo.id !== prestamoId);
      setPrestamos(nuevosPrestamos);

    } catch (error) {
      console.error("Error al devolver el libro:", error);
    }
  };

  // Función para volver a la página del bibliotecario
  const handleVolver = () => {
    navigate('/bibliotecario');
  };

  // Cargando datos
  if (loading) {
    return <div>Cargando préstamos pendientes...</div>;
  }

  // Si no hay préstamos pendientes
  if (prestamos.length === 0) {
    return <div>No hay préstamos pendientes.</div>;
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: 'url(/images/colegiopioneros.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="bg-dark text-white text-center py-4 mb-4 rounded-3">
              <h1 className="fw-bold">Colegio Pioneros</h1>
              <p className="lead">Préstamos Pendientes</p>
            </div>

            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                <DataTable value={prestamos} responsiveLayout="scroll">
                  <Column field="libro" header="Libro" />
                  <Column field="persona" header="Persona" />
                  <Column field="fecha_prestamo" header="Fecha de Préstamo" />
                  <Column field="fecha_devolucion" header="Fecha de Devolución" />
                  <Column
                    header="Acciones"
                    body={(rowData) => (
                      <Button
                        label="Devolver"
                        icon="pi pi-check"
                        className="p-button-success"
                        onClick={() => devolverLibro(rowData.id, rowData.libro_id)}
                      />
                    )}
                  />
                </DataTable>
              </div>
            </div>

            <div className="text-center mt-4">
              <Button
                label="Volver a Bibliotecario"
                icon="pi pi-arrow-left"
                className="p-button-secondary"
                onClick={handleVolver}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportación predeterminada
export default PrestamosPendientes;
