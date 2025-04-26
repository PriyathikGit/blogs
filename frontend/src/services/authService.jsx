import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAllUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(`${API_URL}/users`, config);
    return response.data;
};

const getUserById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(`${API_URL}/users/${id}`, config);
    return response.data;
};

const getCurrentUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(`${API_URL}/users/me`, config);
    return response.data;
};

const updateUser = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(`${API_URL}/users/me`, userData, config);
    return response.data;
};

const updateUserRole = async (id, role, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(`${API_URL}/users/${id}/role`, { role }, config);
    return response.data;
};

const deleteUser = async (id, token) => {
    console.log(id,token)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(`${API_URL}/users/${id}`, config);
    return response.data;
};

export {
    getAllUsers,
    getUserById,
    getCurrentUser,
    updateUser,
    updateUserRole,
    deleteUser
};