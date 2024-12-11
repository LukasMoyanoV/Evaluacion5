import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'; // Importamos el hook de navegación
import { getAuth } from 'firebase/auth'; // Importamos la función para cerrar sesión en Firebase
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap

const Bibliotecario = () => {
  const navigate = useNavigate(); // Usamos el hook de navegación
  const auth = getAuth();

  // Función para navegar a "PrestamosPendientes"
  const goToPrestamosPendientes = () => {
    navigate('/prestamosPendientes'); // Redirige a la página de préstamos pendientes
  };

  // Función para navegar a "NuevoPrestamo"
  const goToNuevoPrestamo = () => {
    navigate('/NuevoPrestamo'); // Redirige a la página de nuevo préstamo
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/login'); // Redirige al login después de cerrar sesión
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  };

  return (
    <>
      {/* Navbar superior */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#d9534f' }}>
        <div className="container">
          <span className="navbar-text text-white">
            ¡Hola Bibliotecario! Bienvenido al sistema
          </span>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div
        className="d-flex align-items-center justify-content-center min-vh-100"
        style={{
          backgroundImage: 'url(/images/colegiopioneros.jpg)', // Ruta a tu imagen de fondo
          backgroundSize: 'cover', // Asegura que la imagen cubra toda la pantalla
          backgroundPosition: 'center', // Centra la imagen
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              {/* Banner de Colegio Pioneros */}
              <div className="bg-dark text-white text-center py-4 mb-4 rounded-3">
                <h1 className="fw-bold">Colegio Pioneros</h1>
                <p className="lead">Página del Bibliotecario</p>
              </div>

              {/* Sección de navegación para Bibliotecario */}
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4">
                  <h2 className="text-center mb-4">Bienvenido Bibliotecario</h2>
                  <p className="text-center mb-4">Esta es la página exclusiva para el Bibliotecario.</p>

                  <div className="d-flex justify-content-center">
                    {/* Botón para ver los préstamos pendientes */}
                    <Button 
                      label="Ver Préstamos Pendientes" 
                      icon="pi pi-list" 
                      className="p-button-primary me-3" 
                      onClick={goToPrestamosPendientes} 
                    />
                    {/* Botón para agregar un nuevo préstamo */}
                    <Button 
                      label="Nuevo Préstamo" 
                      icon="pi pi-book" 
                      className="p-button-success" 
                      onClick={goToNuevoPrestamo} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bibliotecario;
