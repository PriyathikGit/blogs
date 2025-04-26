import React, { useState, useContext } from 'react';
import { BlogContext } from '../../context/BlogContext';
import { Form, Button } from 'react-bootstrap';

const BlogForm = ({ blog = null, onSuccess }) => {
    const { createBlog, updateBlog } = useContext(BlogContext);
    const [title, setTitle] = useState(blog?.title || '');
    const [content, setContent] = useState(blog?.content || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (blog) {
                await updateBlog(blog._id, { title, content });
            } else {
                await createBlog({ title, content });
            }
            onSuccess();
        } catch (err) {
            console.error('Error saving blog:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
            </Button>
        </Form>
    );
};

export default BlogForm;