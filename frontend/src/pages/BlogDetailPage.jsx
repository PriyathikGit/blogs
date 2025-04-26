import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import { AuthContext } from '../context/AuthContext';
import BlogItem from '../components/Blog/BlogItem';
import { Button, Container, Spinner, Alert } from 'react-bootstrap';

const BlogDetailPage = () => {
  const { id } = useParams();
  const { getBlogById } = useContext(BlogContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogById(id);
        setBlog(blogData);
      } catch (err) {
        setError(err.message || 'Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Blog not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <BlogItem 
        blog={blog} 
        showFullContent={true}
        canEdit={isAuthenticated && (user?.role === 'admin' || blog.author._id === user?.id)}
      />
      
      <div className="mt-3">
        <Button variant="outline-secondary" href="/">
          Back
        </Button>
      </div>
    </Container>
  );
};

export default BlogDetailPage;