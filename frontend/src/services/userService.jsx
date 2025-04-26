import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Register new user
const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: userData.role || 'user' // Default to 'user' if not specified
        });
        if (response.data.token) {
            const decoded = jwtDecode(response.data.token);
            return {
                token: response.data.token,
                user: {
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    role: decoded.role
                }
            };
        }
        throw new Error('Registration failed - No token received');
    } catch (error) {
        throw error.response?.data?.message || 'Registration failed';
    }
};

// Login existing user
const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password
        });
        // console.log(response)
        if (response.data.token) {
            const decoded = jwtDecode(response.data.token);
            return {
                token: response.data.token,
                user: {
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    role: decoded.role
                }
            };
        }
        throw new Error('Login failed - No token received');
    } catch (error) {
        throw error.response?.data?.message || 'Login failed';
    }
};

// Verify token validity (for persistent sessions)
const verifyToken = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/auth/verify`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.user;
    } catch (error) {
        throw error.response?.data?.message || 'Session expired';
    }
};

export {
    register,
    login,
    verifyToken
};