import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        try {
            await axios.post('http://localhost:8080/api/auth/login', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                withCredentials: true,
            });

            login({ username: username });
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid username or password.');
            console.error('Login failed', err);
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
                    <button type="submit">Log In</button>
                </form>
                <p className="auth-switch">Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    );
}