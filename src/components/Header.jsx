// File: src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api'; // <-- IMPORT THE CORRECT CLIENT
import './Header.css';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Use apiClient and a relative path. It will automatically call the live backend.
            await apiClient.post('/auth/logout', {});
        } catch (error) {
            console.error("Server logout failed, but logging out on client.", error);
        } finally {
            logout();
            navigate('/login'); // Redirect to login after logout
        }
    };

    return (
        <header className="app-header-main">
            <Link to={user ? "/dashboard" : "/"} className="logo">
                AI Screener Pro
            </Link>
            <nav>
                {user ? (
                    <>
                        <span className="welcome-user">Welcome, {user.username}!</span>
                        <button onClick={handleLogout} className="btn-nav">Sign Out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn-nav">Login</Link>
                        <Link to="/register" className="btn-nav-primary">Get Started</Link>
                    </>
                )}
            </nav>
        </header>
    );
}