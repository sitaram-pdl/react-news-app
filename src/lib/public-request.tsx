import axios from 'axios';

export const request = axios.create({
  withCredentials: true,
  baseURL: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  async function (config) {
    config.headers['Content-Language'] = localStorage.getItem('i18nextLng');
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);
