import React, { useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./style.css";

function TopNav({ activeTab, changeActiveTab }) {

  
useEffect(() => {
  document.title = (activeTab);
});

  return (
    <Container id="NavContainer" className="NavContainer">
      <Navbar className="navBar" expand="lg">
        <Navbar.Brand
          className="NavBrand"
          onClick={() => changeActiveTab("About")}
          href="#about"
        >
          My Portfolio
        </Navbar.Brand>
        <Navbar.Toggle
          className="navToggle navBtn"
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse className="navToggle" id="basic-navbar-nav">
          <Nav className="me-auto navLinks">
            <Nav.Link
              onClick={() => changeActiveTab("About")}
              href="#about"
              className={activeTab === "About" ? "active-tab" : "not-active"}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => changeActiveTab("Projects")}
              href="#projects"
              className={activeTab === "Projects" ? "active-tab" : "not-active"}
            >
              My Projects
            </Nav.Link>
            <Nav.Link
              onClick={() => changeActiveTab("Contact")}
              href="#contact"
              className={activeTab === "Contact" ? "active-tab" : "not-active"}
            >
              Contact Me
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default TopNav;