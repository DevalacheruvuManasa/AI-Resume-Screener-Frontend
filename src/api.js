// src/api.js
/*import axios from 'axios';

// The URL of your running Spring Boot API
//const API_URL = 'http://localhost:8080/api';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL: API_URL,
    // THIS IS THE CRITICAL CONFIGURATION
    withCredentials: true 
});

export default apiClient;*/
// File: src/api.js
import axios from 'axios';

// --- THIS IS THE NEW, HARDCODED LOGIC ---

// Define the production URL explicitly.
const PRODUCTION_URL = 'https://ai-resume-screener-backend.onrender.com/api'; // <-- PASTE YOUR LIVE BACKEND URL HERE
const DEVELOPMENT_URL = 'http://localhost:8080/api';

// Vite automatically sets import.meta.env.MODE to 'production' during a build.
// We check this to decide which URL to use.
const API_URL = import.meta.env.MODE === 'production' 
    ? PRODUCTION_URL 
    : DEVELOPMENT_URL;

console.log(`[API Client] Running in ${import.meta.env.MODE} mode. API URL is: ${API_URL}`);

// The rest of the file is the same
const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true, 
});

export default apiClient;