import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-custom">
      <Container>
        <img src='https://res.cloudinary.com/dwwunc51b/image/upload/v1719474041/TF-Logo-1_wvq0kj.webp' className='logo' alt='logo' />
        <Navbar.Toggle  aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="home" >Home</Nav.Link>
            <Nav.Link href="#aboutus" >About Us</Nav.Link>
            <NavDropdown title="Services" id="collapsible-nav-dropdown" className="dropdown-custom">
              <NavDropdown.Item href="#action/3.1" >Thought Quality</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" >Thought Design</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" >Thought Code</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" >Thought Ops</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" >Thought Digital</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#getonboard" >Get Onboard</Nav.Link>
            <Nav.Link href="#insights" >Insights</Nav.Link>
            <Nav.Link href="contact" >Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
