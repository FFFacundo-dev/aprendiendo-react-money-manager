import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGastos, reset } from '../../redux/slices/gastosSlice';
import Navbar from '../../components/Navbar';
import GastoForm from '../../components/GastoForm';
import GastosList from '../../components/GastosList';


function DashboardPage() {
  const dispatch = useDispatch();
  const { gastos, isLoading, isError, message } = useSelector((state) => state.gastos);

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    dispatch(getGastos());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  return (
    <div style={{ width: '100%' }}>
      <Navbar />
      <h1>Dashboard de Gastos</h1>
      <GastoForm />
      {isLoading ? <p>Cargando gastos...</p> : <GastosList gastos={gastos} />}
    </div>
  );
}

export default DashboardPage;
