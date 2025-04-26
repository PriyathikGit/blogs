import React, { createContext, useState, useEffect, useContext } from 'react';
import * as blogService from '../services/blogService';
import { AuthContext } from './AuthContext';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  useEffect(() => {
    fetchBlogs();
  }, []);


  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllBlogs();
      setBlogs(data);
    } catch (err) {
      setError('Failed to fetch blogs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async (blogData) => {
    try {
      setLoading(true);
      const newBlog = await blogService.createBlog(blogData, token);
      setBlogs([newBlog, ...blogs]);
      return newBlog;
    } catch (err) {
      setError('Failed to create blog');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBlog = async (id, blogData) => {
    try {
      setLoading(true);
      const updatedBlog = await blogService.updateBlog(id, blogData, token);
      setBlogs(blogs.map((blog) => (blog._id === id ? updatedBlog : blog)));
      return updatedBlog;
    } catch (err) {
      setError('Failed to update blog');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    try {
      setLoading(true);
      await blogService.deleteBlog(id, token);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      setError('Failed to delete blog');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBlogById = async (id) => {
    try {
      setLoading(true);
      const blog = await blogService.getBlogById(id, token);
      return blog;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };


  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        error,
        fetchBlogs,
        createBlog,
        updateBlog,
        deleteBlog,
        getBlogById
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
