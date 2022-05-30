import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="white" variant="light" sticky="top" className="nav-coffee">
        <Container fluid>
          <Navbar.Brand href="/">
            {" "}
            <img src={require("../../assets/img/coffee-1.png")} alt="logo-icon" />
            &nbsp;Juncoffee
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" active>
                Home
              </Nav.Link>
              <Nav.Link href="/product">Product</Nav.Link>
              <Nav.Link href="/cart">Your Cart</Nav.Link>
              <Nav.Link href="/history">History</Nav.Link>
            </Nav>
            <div className="right-nav">
              <Link to={"/auth/login"} className="navbar-text login-text">
                Login
              </Link>
              <Link to={"/auth/register"} className="btn btn-primary">
                <span className="register-button-link">Sign Up</span>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
