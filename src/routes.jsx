
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Página de Login
import Bibliotecario from './components/Bibliotecario'; // Página del bibliotecario
import { NuevoPrestamo } from './components/NuevoPrestamo'; // Página para nuevo préstamo
import PrestamosPendientes from './components/PrestamosPendientes'; // Asegúrate de importar como default

// Componente que manejará las rutas de la aplicación
const PrestamosRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Página de Login al iniciar */}
        <Route path="/bibliotecario" element={<Bibliotecario />} /> {/* Página para el bibliotecario */}
        <Route path="/NuevoPrestamo" element={<NuevoPrestamo />} /> {/* Página para nuevo préstamo */}
        <Route path="/prestamospendientes" element={<PrestamosPendientes />} /> {/* Página de préstamos pendientes */}

        {/* Ruta por defecto para manejar casos en que la ruta no existe */}
        <Route path="*" element={<div>Página no encontrada</div>} /> {/* Página de error o redirección */}
      </Routes>
    </Router>
  );
};

export { PrestamosRoutes };