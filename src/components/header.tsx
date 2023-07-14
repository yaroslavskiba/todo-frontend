import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to="/" className="navbar-brand">
            Todo React Frontend
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/create" className="nav-link">
                Создать
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
