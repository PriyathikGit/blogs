import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import * as authService from '../../services/authService';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const UserManagement = () => {
    const { user: currentUser, token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentEditUser, setCurrentEditUser] = useState(null);
    const [role, setRole] = useState('user');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await authService.getAllUsers(token);
                setUsers(data);
            } catch (err) {
                setError('Failed to fetch users');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser?.role === 'admin') {
            fetchUsers();
        }
    }, [currentUser]);

    const handleRoleChange = (user) => {
        setCurrentEditUser(user);
        setRole(user.role);
        setShowEditModal(true);
    };

    const handleRoleUpdate = async () => {
        try {
            setLoading(true);
            await authService.updateUserRole(
                currentEditUser._id,
                role,
                token
            );
            setUsers(users.map(u =>
                u._id === currentEditUser._id ? { ...u, role } : u
            ));
            setShowEditModal(false);
        } catch (err) {
            setError('Failed to update user role');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                setLoading(true);
                await authService.deleteUser(id, token);
                setUsers(users.filter(u => u._id !== id));
            } catch (err) {
                setError('Failed to delete user');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    if (!currentUser || currentUser.role !== 'admin') {
        return <div>Access denied. Admin privileges required.</div>;
    }

    return (
        <div>
            <h3>User Management</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Button
                                        variant="info"
                                        size="sm"
                                        onClick={() => handleRoleChange(user)}
                                        disabled={loading}
                                    >
                                        Change Role
                                    </Button>{' '}
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDeleteUser(user._id)}
                                        disabled={loading || user._id === currentUser.id}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change User Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Select Role</Form.Label>
                            <Form.Control
                                as="select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleRoleUpdate} disabled={loading}>
                        {loading ? 'Updating...' : 'Update Role'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserManagement;