import { deleteGasto } from '../redux/slices/gastosSlice';
import { useDispatch } from 'react-redux';

function GastosList({ gastos, onEditarClick }) {
  const dispatch = useDispatch();

  if (!gastos || gastos.length === 0) {
    return <h3>No tienes gastos registrados. ¡Añade uno!</h3>;
  }

  const onDelete = (id) => {
    if(window.confirm('¿Estás seguro de que deseas eliminar este gasto?')) {
      dispatch(deleteGasto(id));
      console.log(`Gasto con ID ${id} eliminado.`);
    }
  };

  return (
    <section>
      <h3>Tus Gastos</h3>
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          textAlign: 'left'
      }}>
        {gastos.map((gasto) => (
          <div key={gasto.id_gasto} style={{
              background: '#333',
              padding: '1rem',
              borderRadius: '8px'
          }}>
            <h4>{gasto.titulo}</h4>
            <p>Monto: ${gasto.monto}</p>
            <small>Fecha: {new Date(gasto.fecha_creacion).toLocaleDateString()}</small>
            <button onClick={() => onEditarClick(gasto)}>Editar</button>
            <button onClick={() => onDelete(gasto.id_gasto)}>Eliminar</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GastosList;
