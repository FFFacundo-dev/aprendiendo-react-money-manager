import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return <Outlet />; // Si hay token, muestra el contenido de la ruta
  }

  return <Navigate to="/login" replace />; // Si no, redirige a login
};

export default ProtectedRoute;
