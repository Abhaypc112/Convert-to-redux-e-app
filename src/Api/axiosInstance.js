import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true,
});

// Add interceptors if needed, such as for authentication
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;