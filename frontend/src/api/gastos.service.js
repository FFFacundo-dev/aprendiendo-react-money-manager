import axios from 'axios';

const API_URL = 'http://localhost:5000/api/gastos/';

// Helper para crear la configuración con el token
const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getGastos = async (token) => {
  const response = await axios.get(API_URL, getConfig(token));
  return response.data;
};

const createGasto = async (gastoData, token) => {
  const response = await axios.post(API_URL, gastoData, getConfig(token));
  return response.data;
};


const gastosService = {
  getGastos,
  createGasto,
};

export default gastosService;
