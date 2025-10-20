import axios from 'axios';

const API_URL = 'http://localhost:5000/api/usuarios/';

const register = async (userData) => {
  const response = await axios.post(API_URL + 'registro', userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data.token) {
    localStorage.setItem('token', JSON.stringify(response.data.token));
  }
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
