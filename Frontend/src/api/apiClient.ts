import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export  const apiClientWithCredentials = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For HttpOnly cookies
});
export  const apiClient = axios.create({
   baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor to add JWT token
apiClientWithCredentials.interceptors.request.use(
  (config) => {
    // Check for token in memory storage or get from context
    const token = localStorage.getItem('jwt'); // Temporary - should use HttpOnly cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClientWithCredentials.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('jwt');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);
