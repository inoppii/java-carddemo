import axios from 'axios';

const api = axios.create({
  baseURL: 'https://carddemo-backend-632012386200.asia-northeast1.run.app/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
