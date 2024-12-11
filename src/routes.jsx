import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Página de Login
import Bibliotecario from './components/Bibliotecario'; // Página del bibliotecario
import { NuevoPrestamo } from './components/NuevoPrestamo'; // Asegúrate de que este componente esté disponible y correcto

const PrestamosRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Página de Login al iniciar */}
        <Route path="/bibliotecario" element={<Bibliotecario />} /> {/* Página para el bibliotecario */}
        <Route path="/NuevoPrestamo" element={<NuevoPrestamo />} /> {/* Página para nuevo préstamo */}
        {/* Otras rutas que necesites */}
      </Routes>
    </Router>
  );
};

export { PrestamosRoutes };
