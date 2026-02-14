import axios from 'axios';

const dev_base_url = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: dev_base_url,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // optional
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
