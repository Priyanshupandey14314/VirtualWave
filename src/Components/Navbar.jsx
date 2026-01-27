import { Navbar, Nav, Container } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/flogo.png';
import './Navbar.css';

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  return (
    <Navbar
      expand="lg"
      className="custom-navbar"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <img
            src={logo}
            alt="VirtualWave Logo"
            className="navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler-custom"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={`nav-link-custom ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setExpanded(false)}
            >
              <span>Home</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/services"
              className={`nav-link-custom ${location.pathname === '/services' ? 'active' : ''}`}
              onClick={() => setExpanded(false)}
            >
              <span>Services</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={`nav-link-custom ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={() => setExpanded(false)}
            >
              <span>About</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className={`nav-link-custom ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={() => setExpanded(false)}
            >
              <span>Contact</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/blogs"
              className={`nav-link-custom ${location.pathname === '/blogs' ? 'active' : ''}`}
              onClick={() => setExpanded(false)}
            >
              <span>Blogs</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

