import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
// Get all blogs
const getAllBlogs = async () => {
  
    try {
        const response = await axios.get(`${API_URL}/blogs`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch blogs';
    }
};

// Get single blog by ID
const getBlogById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(`${API_URL}/blogs/${id}`, config);
        console.log(response)
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Blog not found';
    }
};

// Create new blog
const createBlog = async (blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(`${API_URL}/blogs`, blogData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to create blog';
    }
};

// Update existing blog
const updateBlog = async (id, blogData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.put(`${API_URL}/blogs/${id}`, blogData, config);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update blog';
    }
};

// Delete blog
const deleteBlog = async (id, token) => {
    console.log(id,token)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.delete(`${API_URL}/blogs/${id}`, config);
        console.log("response:",response)
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete blog';
    }
};

export {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
};