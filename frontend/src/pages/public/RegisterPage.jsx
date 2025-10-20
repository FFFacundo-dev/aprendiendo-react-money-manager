import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../../redux/slices/authSlice';

function RegisterPage() {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
  const { nombre, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess) {
      navigate('/login');
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <>
      <h1>Registro</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="nombre" value={nombre} placeholder="Nombre" onChange={onChange} required />
        <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} required />
        <input type="password" name="password" value={password} placeholder="Contraseña" onChange={onChange} required />
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link></p>
    </>
  );
}

export default RegisterPage;
