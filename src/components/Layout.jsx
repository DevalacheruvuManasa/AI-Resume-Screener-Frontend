// File: src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // It imports your existing Header

export default function Layout() {
    return (
        <div>
            <Header />
            <main>
                {/* The <Outlet /> is a placeholder. React Router will
                    render the correct page component (e.g., HomePage or
                    DashboardPage) here based on the URL. */}
                <Outlet />
            </main>
        </div>
    );
}