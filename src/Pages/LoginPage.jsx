// File: src/Pages/LoginPage.jsx

/*import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Define the component function
function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // We use URLSearchParams because our Spring Security backend is configured with .formLogin()
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        try {
            await axios.post('http://localhost:8080/api/auth/login', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                withCredentials: true,
            });

            // If the request above is successful, the user is logged in.
            // Now we update our React app's state and navigate.
            login({ username: username });
            navigate('/dashboard');

        } catch (err) {
            setError('Invalid username or password.');
            console.error('Login failed', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="card">
                <h2>Login to Your Dashboard</h2>
                {error && <div className="alert error-alert">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                <p className="auth-switch">Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    );
}

// THIS IS THE CRITICAL LINE THAT WAS MISSING
export default LoginPage;*/
// File: src/Pages/LoginPage.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api'; // <-- IMPORTANT: Import the central apiClient

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Use URLSearchParams because our Spring Security backend is configured with .formLogin()
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        try {
            // Use the configured apiClient and a relative path.
            // The baseURL and withCredentials are now handled automatically.
            await apiClient.post('/auth/login', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            login({ username: username });
            navigate('/dashboard');

        } catch (err) {
            setError('Invalid username or password.');
            console.error('Login failed', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="card">
                <h2>Login to Your Dashboard</h2>
                {error && <div className="alert error-alert">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                <p className="auth-switch">Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    );
}

export default LoginPage;