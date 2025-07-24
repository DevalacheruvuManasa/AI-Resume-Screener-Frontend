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

// --- THE DEFINITIVE CONFIGURATION FOR LOCAL & DEPLOYED ENVIRONMENTS ---

// This is the public URL of your deployed backend service on Render.
// It is used ONLY when the React app is built for production.
const PRODUCTION_URL = 'https://ai-resume-screener-backend.onrender.com/api';

// This is the URL for your backend when you are running it on your local machine.
const DEVELOPMENT_URL = 'http://localhost:8080/api';

// Vite, the tool that builds your React app, automatically sets a special variable
// `import.meta.env.MODE` to 'production' when you run `npm run build` (which is what Render does).
// When you run `npm run dev` locally, this variable is 'development'.
// We use this to decide which URL to use.
const API_URL = import.meta.env.MODE === 'production' 
    ? PRODUCTION_URL 
    : DEVELOPMENT_URL;

// This is a helpful debug message that will appear in your browser's console (F12).
// On your live site, it should show the PRODUCTION_URL.
// On your local machine, it should show the DEVELOPMENT_URL.
console.log(`[API Client] App running in '${import.meta.env.MODE}' mode. Using API URL: ${API_URL}`);

// Create a central, pre-configured instance of axios.
const apiClient = axios.create({
    baseURL: API_URL,      // All requests will be sent to this base URL.
    withCredentials: true, // This is CRITICAL for sending session cookies for authentication.
});

// Export this single, configured instance for all other components to use.
export default apiClient;