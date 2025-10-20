import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../redux/slices/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <h2>Money Manager</h2>
      <button onClick={onLogout}>Cerrar Sesión</button>
    </header>
  );
}

export default Navbar;
