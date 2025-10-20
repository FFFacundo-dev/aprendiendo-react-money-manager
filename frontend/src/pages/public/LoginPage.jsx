import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../../redux/slices/authSlice';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message); // En una app real, usaríamos un componente de notificación
    }
    if (isSuccess || token) {
      navigate('/');
    }
    dispatch(reset());
  }, [token, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} required />
        <input type="password" name="password" value={password} placeholder="Contraseña" onChange={onChange} required />
        <button type="submit">Entrar</button>
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
    </>
  );
}

export default LoginPage;
