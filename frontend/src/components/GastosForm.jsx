import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGasto,updateGasto } from '../redux/slices/gastosSlice';

function GastoForm({gastoAEditar}) {
  const [formData, setFormData] = useState({
    titulo: '',
    monto: '',
  });
  const { titulo, monto } = formData;
  const dispatch = useDispatch();

  useEffect(() => {
    if (gastoAEditar) {
      setFormData({
        titulo: gastoAEditar.titulo,
        monto: gastoAEditar.monto,
      });
    }else{
      setFormData({
        titulo: '',
        monto: '',
      });
    }
  }, [gastoAEditar]);

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (gastoAEditar) {
      dispatch(updateGasto({ id: gastoAEditar.id_gasto, titulo, monto: parseFloat(monto) }));
      return;
    }else{
      dispatch(createGasto({ titulo, monto: parseFloat(monto) }));
    }
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
    