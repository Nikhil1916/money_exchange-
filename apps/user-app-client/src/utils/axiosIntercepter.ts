// axiosInstance.ts
import axios from 'axios';
import storageService, { StorageKeys } from './storageService';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/api/v1", // Replace with your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = storageService.getItem(StorageKeys.TOKEN); // Fetch token from localStorage or another source

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional: handle token refresh or other responses)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response error
    if (error.response?.status === 401) {
      // Optionally handle unauthorized errors (e.g., redirect to login)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
