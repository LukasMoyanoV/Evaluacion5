import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

const EstudianteDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    // Si no hay un usuario autenticado, muestra un error
    if (!user) {
      console.log("No hay usuario autenticado");
      setIsLoading(false);  // Ya no está cargando
    } else {
      console.log("Usuario autenticado:", user);
      setUserData({
        nombre: user.displayName || 'Estudiante',
        email: user.email
      });
      setIsLoading(false);
    }
  }, []);

  // Si está cargando, muestra un mensaje
  if (isLoading) return <div>Cargando...</div>;

  // Si no hay datos del usuario, muestra un error
  if (!userData) return <div>No hay datos del usuario.</div>;

  return (
    <div className="container">
      <h2>Bienvenido(a), {userData.nombre}!</h2>
      <p>Correo electrónico: {userData.email}</p>
      <p>¡Disfruta de tu experiencia en el sistema de préstamos!</p>
    </div>
  );
};

export default EstudianteDashboard;
