import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../../context/BlogContext';
import { deleteBlog } from '../../services/blogService';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { blogs, fetchBlogs } = useContext(BlogContext);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext)
  useEffect(() => {
    fetchBlogs();
  }, []);
  const handleDelete   = async (id) => {
    try {
      setLoading(true);
      await deleteBlog(id, token);
      await fetchBlogs();
    } catch (err) {
      console.error('Failed to delete blog:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Blog Management</h3>
      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        <div className="list-group">
          {blogs.map(blog => (
            <div key={blog._id} className="list-group-item">
              <h5>{blog.title}</h5>
              <p>{blog.content.substring(0, 100)}...</p>
              <small>Author: {blog.author.name}</small>
              <div className="mt-2">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(blog._id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;