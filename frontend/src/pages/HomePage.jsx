import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { BlogContext } from '../context/BlogContext';
import { Link } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';

const HomePage = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const { blogs } = useContext(BlogContext);
    return (
        <Container className="mt-4">
            <h1>Welcome to the Blog Platform</h1>

            {isAuthenticated && (
                <div className="mb-4">
                    <h3>Hello, {user?.name}!</h3>
                    <p>Your role: {user?.role}</p>
                    {user?.role === 'admin' && (
                        <Button as={Link} to="/admin" variant="primary" className="me-2">
                            Admin Dashboard
                        </Button>
                    )}
                    <Button as={Link} to="/blogs" variant="success" className="me-2">
                        View All Blogs
                    </Button>
                    <Button as={Link} to="/profile" variant="info">
                        My Profile
                    </Button>
                </div>
            )}

            {!isAuthenticated && (
                <div className="mb-4">
                    <p>Please login or register to create and manage blogs</p>
                    <Button as={Link} to="/login" variant="primary" className="me-2">
                        Login
                    </Button>
                    <Button as={Link} to="/register" variant="secondary">
                        Register
                    </Button>
                </div>
            )}

            <h2 className="mt-4">Featured Blogs</h2>
            <div className="row">
                {blogs.slice(0, 3).map(blog => (
                    <div key={blog._id} className="col-md-4 mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>{blog.title}</Card.Title>
                                <Card.Text>
                                    {blog.content.substring(0, 100)}...
                                </Card.Text>
                                <Button
                                    as={Link}
                                    to={`/blogs/${blog._id}`}
                                    variant="outline-primary"
                                >
                                    Read More
                                </Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">
                                    Posted by {blog.author.name}
                                </small>
                            </Card.Footer>
                        </Card>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default HomePage;