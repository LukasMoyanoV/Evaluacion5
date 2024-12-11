import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth, db } from '../firebase'; // Asegúrate de importar auth y db desde firebase.js

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor ingresa tanto el correo electrónico como la contraseña.');
      return;
    }

    try {
      // Autenticar usuario
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Usuario autenticado:', user);

      // Verificar rol del usuario en Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userRole = userData.role;

        console.log('Rol del usuario:', userRole);

        // Redirigir según el rol del usuario
        if (userRole === 'admin') {
          navigate('/admin');
        } else if (userRole === 'bibliotecario') {
          navigate('/bibliotecario');
        } else if (userRole === 'user') {
          navigate('/dashboard');
        } else {
          setError('Rol desconocido, por favor contacta al administrador.');
        }
      } else {
        setError('No se encontraron datos del usuario en Firestore.');
        console.log('No user data found');
      }
    } catch (err) {
      console.error('Error durante la autenticación:', err);
      if (err.code === 'auth/user-not-found') {
        setError('Usuario no encontrado. Por favor revisa el correo.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta. Intenta de nuevo.');
      } else {
        setError('Error al iniciar sesión. Verifica tu correo o contraseña.');
      }
    }
  };

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
          <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-dark text-white text-center py-4 mb-4 rounded-3">
              <h1 className="fw-bold">Colegio Pioneros</h1>
              <p className="lead">Iniciar Sesión</p>
            </div>
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                {error && <p className="text-center text-danger">{error}</p>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-dark w-100 py-2 mt-3">Iniciar Sesión</button>
                </form>
              </div>
            </div>

            <div className="text-center mt-4">
              <p>¿Olvidaste tu contraseña? <a href="/reset-password" style={{ color: '#DC3545' }}>Recuperar contraseña</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
