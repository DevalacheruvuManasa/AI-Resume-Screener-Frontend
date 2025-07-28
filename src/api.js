// File: src/api.js
import axios from 'axios';

// Vite automatically sets import.meta.env.MODE
const API_URL = import.meta.env.MODE === 'production' 
    ? 'https://ai-resume-screener-backend.onrender.com/api' // Your live backend URL
    : 'http://localhost:8080/api';                          // Your local backend URL

console.log(`[API Client] Running in '${import.meta.env.MODE}' mode. Using API URL: ${API_URL}`);

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true, // CRITICAL: This sends cookies with every request
});

export default apiClient;