import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap importado
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redireccionar

export const PrestamosPendientes = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const cargarPrestamos = async () => {
      try {
        const db = getFirestore();
        const prestamosCollection = collection(db, 'prestamos');
        const snapshot = await getDocs(prestamosCollection);

        if (snapshot.empty) {
          console.log("No hay préstamos pendientes.");
          setPrestamos([]); // No hay préstamos en la base de datos
        } else {
          const prestamosList = await Promise.all(
            snapshot.docs.map(async (docSnap) => {
              const prestamoData = docSnap.data();

              // Obtener datos del libro
              const libroRef = doc(db, 'libros', prestamoData.libro_id); // Referencia a la colección 'libros'
              const libroSnap = await getDoc(libroRef);
              const libroTitulo = libroSnap.exists() ? libroSnap.data().titulo : 'Título no disponible';

              // Obtener datos de la persona
              const personaRef = doc(db, 'users', prestamoData.persona_id); // Referencia a la colección 'users'
              const personaSnap = await getDoc(personaRef);
              const personaNombre = personaSnap.exists() ? personaSnap.data().nombre : 'Nombre no disponible';

              // Comprobación de los campos de fecha para evitar errores
              const fechaPrestamo = prestamoData.fecha_prestamo ? new Date(prestamoData.fecha_prestamo.seconds * 1000).toLocaleDateString() : 'Fecha no disponible';
              const fechaDevolucion = prestamoData.fecha_devolucion ? new Date(prestamoData.fecha_devolucion.seconds * 1000).toLocaleDateString() : 'Fecha no disponible';

              return {
                id: docSnap.id,
                libro: libroTitulo,
                persona: personaNombre,
                fecha_prestamo: fechaPrestamo,
                fecha_devolucion: fechaDevolucion,
                libro_id: prestamoData.libro_id, // Añadir el ID del libro para la devolución
              };
            })
          );

          setPrestamos(prestamosList); // Guardar los préstamos obtenidos
        }
      } catch (error) {
        console.error("Error al cargar los préstamos pendientes:", error);
        setPrestamos([]); // En caso de error, no mostrar préstamos
      } finally {
        setLoading(false); // Finalizar la carga de datos
      }
    };

    cargarPrestamos(); // Llamada a la función para cargar los préstamos
  }, []);

  const devolverLibro = async (prestamoId, libroId) => {
    try {
      const db = getFirestore();

      // Eliminar el préstamo de la base de datos
      const prestamoRef = doc(db, 'prestamos', prestamoId);
      await deleteDoc(prestamoRef); // Eliminar documento de la colección 'prestamos'

      // Marcar el libro como disponible
      const libroRef = doc(db, 'libros', libroId);
      await updateDoc(libroRef, { disponible: true });

      // Eliminar el préstamo de la lista en la UI
      const nuevosPrestamos = prestamos.filter(prestamo => prestamo.id !== prestamoId);
      setPrestamos(nuevosPrestamos); // Actualizar la lista de préstamos

    } catch (error) {
      console.error("Error al devolver el libro:", error);
    }
  };

  const handleVolver = () => {
    navigate('/bibliotecario'); // Redirige a la página de bibliotecario
  };

  if (loading) {
    return <div>Cargando préstamos pendientes...</div>; // Mostrar mensaje mientras cargan los datos
  }

  if (prestamos.length === 0) {
    return <div>No hay préstamos pendientes.</div>; // Si no hay préstamos, mostrar mensaje correspondiente
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: 'url(/images/colegiopioneros.jpg)', // Ruta a tu imagen
        backgroundSize: 'cover', // Asegura que la imagen cubra toda la pantalla
        backgroundPosition: 'center', // Centra la imagen
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            {/* Banner de Colegio Pioneros */}
            <div className="bg-dark text-white text-center py-4 mb-4 rounded-3">
              <h1 className="fw-bold">Colegio Pioneros</h1>
              <p className="lead">Préstamos Pendientes</p>
            </div>

            {/* Tabla de Préstamos Pendientes */}
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                <DataTable value={prestamos} responsiveLayout="scroll">
                  <Column field="libro" header="Libro"></Column>
                  <Column field="persona" header="Persona"></Column>
                  <Column field="fecha_prestamo" header="Fecha de Préstamo"></Column>
                  <Column field="fecha_devolucion" header="Fecha de Devolución"></Column>
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
                  ></Column>
                </DataTable>
              </div>
            </div>

            {/* Botón para volver a la página de bibliotecario */}
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

