// File: src/Pages/RegisterPage.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api'; // <-- 1. IMPORT the central apiClient

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            // 2. USE apiClient and a relative path. The baseURL is now handled automatically.
            await apiClient.post('/auth/register', { username, password });
            
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);

        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try another username.');
            console.error('Registration failed', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="card">
                <h2>Create an Account</h2>
                {error && <div className="alert error-alert">{error}</div>}
                {success && <div className="alert success-alert">{success}</div>}
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="auth-switch">Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
}

export default RegisterPage;