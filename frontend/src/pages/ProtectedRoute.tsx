import { Navigate, Outlet } from 'react-router-dom';

// Componente para rutas protegidas
const ProtectedRoute = () => {
  // Aquí debes implementar tu lógica de autenticación
  // Ejemplo usando localStorage, contexto, o tu estado global
  const isAuthenticated = () => {
    // Opción 1: Verificar token en localStorage
    // const token = localStorage.getItem('authToken');
    // return token !== null;
    return true

    // Opción 2: Si usas Context
    // const { user } = useAuth();
    // return user !== null;

    // Opción 3: Si usas Redux
    // const user = useSelector(state => state.auth.user);
    // return user !== null;
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
