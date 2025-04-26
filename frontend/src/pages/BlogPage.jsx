import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BlogContext } from '../context/BlogContext';
import BlogForm from '../components/Blog/BlogForm';
import BlogList from '../components/Blog/BlogList';
import BlogItem from '../components/Blog/BlogItem';
import { Button, Container, Modal } from 'react-bootstrap';

const BlogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useContext(AuthContext);
    const { blogs, createBlog, updateBlog, deleteBlog } = useContext(BlogContext);
    const [showForm, setShowForm] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    const handleCreate = async (blogData) => {
        await createBlog(blogData);
        setShowForm(false);
    };
    console.log("i am in blog page")
    const handleUpdate = async (blogData) => {
        await updateBlog(editingBlog._id, blogData);
        setEditingBlog(null);
    };

    const handleDelete = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            await deleteBlog(blogId);
            if (id === blogId) {
                navigate('/blogs');
            }
        }
    };

    if (id) {
        const blog = blogs.find(b => b._id === id);
        if (!blog) return <Container className="mt-4">Blog not found</Container>;

        return (
            <Container className="mt-4">
                <BlogItem
                    blog={blog}
                    onEdit={() => setEditingBlog(blog)}
                    onDelete={() => handleDelete(blog._id)}
                    canEdit={isAuthenticated && (user.role === 'admin' || blog.author._id === user.id)}
                />

                <Modal show={!!editingBlog} onHide={() => setEditingBlog(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Blog</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BlogForm
                            blog={editingBlog}
                            onSubmit={handleUpdate}
                            onCancel={() => setEditingBlog(null)}
                        />
                    </Modal.Body>
                </Modal>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>All Blog Posts</h1>
                {isAuthenticated && (
                    <Button variant="primary" onClick={() => setShowForm(true)}>
                        Create New Blog
                    </Button>
                )}
            </div>

            <BlogList
                blogs={blogs}
                onEdit={setEditingBlog}
                onDelete={handleDelete}
                canEdit={isAuthenticated}
                currentUserId={user?.id}
            />

            <Modal show={showForm} onHide={() => setShowForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BlogForm
                        onSubmit={handleCreate}
                        onCancel={() => setShowForm(false)}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default BlogPage;