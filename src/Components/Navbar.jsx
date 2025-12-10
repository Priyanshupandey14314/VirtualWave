import { Navbar, Nav, Container } from 'react-bootstrap';
import { useState } from 'react';
import logo from '../assets/logo.png';
import './Navbar.css';

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar 
      expand="lg" 
      className="custom-navbar"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand-custom">
          <img 
            src={logo} 
            alt="VirtualWave Logo" 
            className="navbar-logo"
          />
          {/* <span className="brand-text">VirtualWave</span> */}
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="navbar-toggler-custom"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="nav-link-custom" onClick={() => setExpanded(false)}>
              <span>Home</span>
            </Nav.Link>
            <Nav.Link href="#services" className="nav-link-custom" onClick={() => setExpanded(false)}>
              <span>Services</span>
            </Nav.Link>
            <Nav.Link href="#about" className="nav-link-custom" onClick={() => setExpanded(false)}>
              <span>About</span>
            </Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom" onClick={() => setExpanded(false)}>
              <span>Contact</span>
            </Nav.Link>
            <Nav.Link href="#blogs" className="nav-link-custom" onClick={() => setExpanded(false)}>
              <span>Blogs</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

