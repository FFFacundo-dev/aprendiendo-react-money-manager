import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGasto } from '../redux/slices/gastosSlice';

function GastoForm() {
  const [formData, setFormData] = useState({
    titulo: '',
    monto: '',
  });
  const { titulo, monto } = formData;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !monto) {
      alert('Por favor, complete todos los campos');
      return;
    }
    dispatch(createGasto({ titulo, monto: parseFloat(monto) }));
    setFormData({ titulo: '', monto: '' });
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <h3>Añadir Nuevo Gasto</h3>
        <input type="text" name="titulo" value={titulo} placeholder="Título del gasto" onChange={onChange} />
        <input type="number" name="monto" value={monto} placeholder="Monto" onChange={onChange} step="0.01" />
        <button type="submit">Añadir Gasto</button>
      </form>
    </section>
  );
}

export default GastoForm;
    