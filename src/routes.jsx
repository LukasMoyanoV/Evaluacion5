import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { PrestamosPendientes } from './components/PrestamosPendientes'
import { NuevoPrestamo } from './components/NuevoPrestamo'

export const PrestamosRoutes = () => (
  <Router>
      <Routes>
          <Route exact path="/" element={<PrestamosPendientes/>} />
          <Route path="/nuevoPrestamo" element={<NuevoPrestamo/>} />
      </Routes>
  </Router>
)