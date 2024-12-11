// ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // Hook para manejar el estado de autenticación
import { auth } from '../firebase'; // Importa el objeto de autenticación de Firebase

const ProtectedRoute = ({ children, role }) => {
  const [user] = useAuthState(auth); // Obtener el estado de autenticación

  // Si el usuario no está autenticado, redirige a login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si tienes un rol específico, comprueba el rol del usuario en Firestore
  if (role) {
    // Aquí puedes agregar la lógica para verificar si el rol del usuario coincide con el requerido.
    // Ejemplo: Si el rol está en Firebase Firestore, deberías hacer una consulta para obtenerlo.
    // if (user.role !== role) {
    //   return <Navigate to="/unauthorized" />;
    // }
  }

  return children; // Si está autenticado, renderiza los componentes hijos
};

export default ProtectedRoute;
