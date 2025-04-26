import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import * as userService from '../services/userService';

const ProfilePage = () => {
    const { user, logout } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await userService.updateUser(formData, user.token);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div>Please login to view your profile</div>;
    }

    return (
        <div className="container mt-4">
            <Card>
                <Card.Header>
                    <h2>My Profile</h2>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="text"
                                value={user.role}
                                readOnly
                                plaintext
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Profile'}
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Button variant="danger" onClick={logout}>
                        Logout
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default ProfilePage;