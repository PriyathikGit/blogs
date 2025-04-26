import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import moment from 'moment';

const BlogItem = ({ blog, onEdit, onDelete, canEdit }) => {
    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>{blog.content}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <Badge bg="secondary" className="me-2">
                            {blog.author?.name || 'Unknown Author'}
                        </Badge>
                        <small className="text-muted">
                            {moment(blog.createdAt).format('MMMM Do YYYY, h:mm a')}
                        </small>
                    </div>
                    {canEdit && (
                        <div>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => onEdit(blog)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => onDelete(blog._id)}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default BlogItem;