import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import PrivateRoute from './components/Layout/PrivateRoute';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css';
import BlogDetailPage from './pages/BlogDetailPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <div className="app-container">
            <Navbar />
            <div className="content-container">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/blogs" element={<BlogPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/blogs/:id" element={<BlogDetailPage />} />

                {/* Authenticated Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>

                {/* Admin-only Routes */}
                <Route element={<PrivateRoute requiredRole="admin" />}>
                  <Route path="/admin" element={<AdminPage />} />
                </Route>
              </Routes>
            </div>
            <Footer />
          </div>
        </BlogProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;