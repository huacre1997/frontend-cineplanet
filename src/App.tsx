import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedPage from './components/ProtectedPage';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/protected"
        element={
          isAuthenticated() ? (
            <ProtectedPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const Root: React.FC = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default Root;