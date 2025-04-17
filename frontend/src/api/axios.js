import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export const loginUser = async (credentials) => {
  const response = await API.post('/api/auth/login', credentials);
  return response.data;
};
export const fetchEvents = () => API.get('/api/events');

export default API;