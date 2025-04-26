import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-3 mt-4">
            <Container>
                <div className="text-center">
                    <p className="mb-0">© {new Date().getFullYear()} Blog Platform. All rights reserved.</p>
                    <p className="mb-0">
                        <a href="/terms" className="text-white me-3">Terms of Service</a>
                        <a href="/privacy" className="text-white">Privacy Policy</a>
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;