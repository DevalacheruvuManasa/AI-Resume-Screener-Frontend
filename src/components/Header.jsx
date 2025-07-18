// File: src/components/Header.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Header.css';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Tell the backend to invalidate the user's session
            await axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true });
        } catch (error) {
            // If the backend call fails, we still log the user out on the frontend
            console.error("Server logout failed, proceeding with client-side logout.", error);
        } finally {
            // This block always runs, ensuring a clean logout on the client side
            
            // 1. Clear the user's data from our React context and localStorage
            logout();
            
            // 2. THIS IS THE FIX: Navigate the user to the homepage, not the login page.
            navigate('/'); 
        }
    };

    return (
        <header className="app-header-main">
            {/* The logo's link is dynamic: it goes to the dashboard if logged in, otherwise to the homepage */}
            <Link to={user ? "/dashboard" : "/"} className="logo">
                AI Screener Pro
            </Link>
            
            <nav>
                {/* This conditional rendering correctly shows different buttons based on login state */}
                {user ? (
                    // If a user exists, show their name and a Sign Out button
                    <>
                        <span className="welcome-user">Welcome, {user.username}!</span>
                        <button onClick={handleLogout} className="btn-nav">Sign Out</button>
                    </>
                ) : (
                    // If no user exists, show Login and Register buttons
                    <>
                        <Link to="/login" className="btn-nav">Login</Link>
                        <Link to="/register" className="btn-nav-primary">Get Started</Link>
                    </>
                )}
            </nav>
        </header>
    );
}