// File: src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        // If there's no user, redirect to the login page.
        return <Navigate to="/login" replace />;
    }

    // If there is a user, render the child component (which will be DashboardPage).
    return children;
}