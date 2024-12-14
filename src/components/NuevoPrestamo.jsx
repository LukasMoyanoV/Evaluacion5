import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';
import { Toast } from 'primereact/toast';
import { createRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

export const NuevoPrestamo = function () {
  const [personas, setPersonas] = useState([]);
  const [libros, setLibros] = useState([]);
  const [libro, setLibro] = useState(null);
  const [persona, setPersona] = useState(undefined);
  const navigate = useNavigate();
  const toast = createRef();
  const [isBibliotecario, setIsBibliotecario] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.role === 'bibliotecario') {
            setIsBibliotecario(true);
          } else {
            navigate('/login');
          }
        } else {
          console.error('Documento de usuario no encontrado');
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    const getPersonas = async () => {
      try {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);

        if (snapshot.empty) {
          console.log("No hay usuarios en la colección 'users'");
        } else {
          const usersList = snapshot.docs.map(doc => {
            const userData = doc.data();
            return {
              nombre: userData.nombre || 'Nombre no disponible',
              uid: doc.id,
              email: userData.email || 'Email no disponible',
              identificacion: userData.identificacion || 'ID no disponible',
            };
          });
          setPersonas(usersList);
        }
      } catch (e) {
        console.error('Error al obtener personas:', e);
        toast.current.show({ severity: 'error', summary: 'Error al obtener personas', detail: e.message });
      }
    };

    checkRole();
    getPersonas();
  }, [navigate]);

  const prestar = async () => {
    if (!libro || !persona) {
      toast.current.show({ severity: 'error', summary: 'Datos faltantes', detail: 'Por favor, seleccione una persona y un libro.' });
      return;
    }

    if (!libro.disponible) {
      toast.current.show({ severity: 'error', summary: 'Libro no disponible', detail: 'El libro ya ha sido prestado.' });
      return;
    }

    try {
      const db = getFirestore();

      const libroId = libro.id;
      if (!libroId) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'ID del libro no encontrado.' });
        return;
      }

      const prestamoRef = doc(collection(db, 'prestamos'));
      await setDoc(prestamoRef, {
        libro_id: libroId,
        persona_id: persona.uid,
        fecha_prestamo: new Date(),
        fecha_devolucion: new Date().setDate(new Date().getDate() + 7),
      });

      const libroRef = doc(db, 'libros', libroId);
      await updateDoc(libroRef, { disponible: false });

      toast.current.show({ severity: 'success', summary: 'Préstamo realizado', detail: `Se prestó el libro ${libro.titulo} a ${persona.nombre} exitosamente` });
      navigate('/prestamospendientes');
    } catch (e) {
      console.log(e);
      toast.current.show({ severity: 'error', summary: 'Error al realizar préstamo', detail: e.message });
    }
  };

  const buscarLibro = async (event) => {
    const db = getFirestore();
    const librosCollection = collection(db, 'libros');
    const snapshot = await getDocs(librosCollection);

    const librosList = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    setLibros(librosList.filter(libro => libro.titulo.toLowerCase().includes(event.query.toLowerCase())));
  };

  if (!isBibliotecario) return null;

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: 'url(/images/colegiopioneros.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-dark text-white text-center py-4 mb-4 rounded-3">
              <h1 className="fw-bold">Colegio Pioneros</h1>
              <p className="lead">Nuevo Préstamo de Libro</p>
            </div>
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                <div className="mb-3">
                  <Dropdown
                    value={persona}
                    optionLabel="nombre"
                    options={personas}
                    onChange={(e) => setPersona(e.value)}
                    placeholder="Seleccione una persona"
                    className="form-control w-100"
                  />
                </div>
                <div className="mb-3">
                  <AutoComplete
                    value={libro}
                    inputStyle={{ textAlign: 'center', width: '100%' }}
                    placeholder="Seleccione un libro"
                    suggestions={libros}
                    completeMethod={buscarLibro}
                    field="titulo"
                    onChange={(e) => setLibro(e.value)}
                    className="form-control w-100"
                  />
                </div>
                {libro && (
                  <div className="mb-3">
                    <div><strong>Título:</strong> {libro.titulo || 'Título no disponible'}</div>
                    <div><strong>Autor:</strong> {libro.autor || 'Autor no disponible'}</div>
                    <div><strong>Disponible:</strong> {libro.disponible ? 'Sí' : 'No'}</div>
                  </div>
                )}
                <Button label="Prestar" className="p-button-primary w-100 py-2 mt-3" onClick={prestar} />
                <Button label="Volver al bibliotecario" className="p-button-secondary w-100 py-2 mt-3" onClick={() => navigate('/bibliotecario')} />
              </div>
            </div>
            <Toast ref={toast} />
          </div>
        </div>
      </div>
    </div>
  );
};
