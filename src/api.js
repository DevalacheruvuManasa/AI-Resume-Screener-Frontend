// src/api.js
import axios from 'axios';

// The URL of your running Spring Boot API
const API_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL: API_URL,
    // THIS IS THE CRITICAL CONFIGURATION
    withCredentials: true 
});

export default apiClient;