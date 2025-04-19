import axios from 'axios';

// Instance Axios dengan baseURL dan pengaturan kredensial
const API = axios.create({
    baseURL: 'http://localhost:3000',
  withCredentials: true,
});

// Fungsi login user menggunakan endpoint /api/auth/login
export const loginUser = async (credentials) => {
  const response = await API.post('/api/auth/login', credentials);
  return response.data;
};

// Fungsi mengambil daftar event dari backend
export const fetchEvents = () => API.get('/api/event');

// Mengekspor instance Axios secara default untuk digunakan di file lain
export default API;