import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.json-generator.com/templates',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = 'ojhs9l4x3reejpz79gevd4eh1xc2pn7dr7t1ss45';
    if (token) {
      config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
  
  const errorResponse = err.response.data;
    switch (errorResponse.statusCode) {
      default: {
        const errors = errorResponse?.data?.errors;
        const message = errors
          ? errors[Object.keys(errors)[0]][0]
          : errorResponse.message;
        return Promise.reject(message);
      }
    }
  },
);

export default API;