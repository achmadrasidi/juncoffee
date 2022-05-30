import React, { Component } from "react";
import { Navbar, Container, Nav, Popover, OverlayTrigger } from "react-bootstrap";

class NavLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.email,
      token: this.props.user.token,
    };
  }
  popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" className="text-center welcome-name">
        {this.props.user.email}
      </Popover.Header>
      <Popover.Body>
        <Nav.Link href="/profile" className="text-center">
          Profile
        </Nav.Link>
        <Nav.Link href="/cart" className="text-center">
          Cart
        </Nav.Link>
        <Nav.Link href="/history" className="text-center">
          History
        </Nav.Link>
        <Nav.Link href="/logout" className="text-center">
          Logout
        </Nav.Link>
      </Popover.Body>
    </Popover>
  );
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

            <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this.popover}>
              <h5 className="text-center me-5 welcome-name welcome-name-res">Hi,{this.state.email}</h5>
            </OverlayTrigger>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavLogin;
