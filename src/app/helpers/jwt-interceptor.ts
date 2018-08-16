import axios from 'axios'

axios.interceptors.request.use((config) => {
  const token = ""
  config.headers.Authorization = `Bearer ${token}`;

  return config;
}, (err) => {
  return Promise.reject(err);
});