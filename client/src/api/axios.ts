import axios from 'axios';

const api_base_url = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: api_base_url,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Optional: request interceptor
api.interceptors.request.use(
  (config) => {
    // Example: attach token
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (401, 500, etc.)
    return Promise.reject(error);
  }
);

export default api;
