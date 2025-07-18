// File: src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout'; // <-- Import our new Layout

function App() {
  return (
    <Router>
      <Routes>
        {/* GROUP 1: Routes that have the main header */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* GROUP 2: Routes that DO NOT have the main header (standalone pages) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* GROUP 3: A catch-all to redirect any invalid URL */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;