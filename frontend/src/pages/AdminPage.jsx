import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../components/Admin/AdminDashboard';
import UserManagement from '../components/Admin/UserManagement';
import { Tab, Tabs, Container, Alert } from 'react-bootstrap';

const AdminPage = () => {
    const { user } = useContext(AuthContext);

    if (!user || user.role !== 'admin') {
        return (
            <Container className="mt-4">
                <Alert variant="danger">
                    Access denied. Admin privileges required.
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2>Admin Dashboard</h2>
            <Tabs defaultActiveKey="dashboard" className="mb-3">
                <Tab eventKey="dashboard" title="Blog Management">
                    <AdminDashboard />
                </Tab>
                <Tab eventKey="users" title="User Management">
                    <UserManagement />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default AdminPage;