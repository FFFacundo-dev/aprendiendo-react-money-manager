function GastosList({ gastos }) {
  if (!gastos || gastos.length === 0) {
    return <h3>No tienes gastos registrados. ¡Añade uno!</h3>;
  }

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
          </div>
        ))}
      </div>
    </section>
  );
}

export default GastosList;
