import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

// Componente para rutas protegidas
const ProtectedRoute = () => {
  const { tokens } = useAuth();

  return tokens ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
