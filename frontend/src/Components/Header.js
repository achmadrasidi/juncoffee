import React, { useState } from "react";
import { Navbar, Container, Nav, Modal, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Header = ({ setSearchParams }) => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const handleClose = () => {
    setShow(false);
    window.scrollTo({ behavior: "smooth", top: "0px" });
  };

  const handleShow = () => setShow(true);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" className="text-center welcome-name">
        {user.email}
      </Popover.Header>
      <Popover.Body>
        <Nav.Link href="/profile" className="text-center">
          Profile
        </Nav.Link>
        <Nav.Link href="/cart" className="text-center">
          Cart
        </Nav.Link>
        <Nav.Link href="#pricing" className="text-center">
          History
        </Nav.Link>
        <Nav.Link href="/logout" className="text-center">
          Logout
        </Nav.Link>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="light" sticky="top" className="nav-product nav-coffee">
      <Container fluid>
        <Navbar.Brand href="/">
          {" "}
          <img src={require("../assets/img/coffee-1.png")} alt="logo-icon" />
          &nbsp;Juncoffee
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/product" active={pathname === "/product"}>
              Product
            </Nav.Link>
            <Nav.Link href="/cart" active={pathname === "/cart"}>
              Your Cart
            </Nav.Link>
            <Nav.Link href="/history">History</Nav.Link>
          </Nav>
          <div className="profile-right-nav">
            <button className="p-0 border-0 bg-white" onClick={handleShow}>
              <img src={require("../assets/img/search.png")} width="30" height="30" className="me-3" alt="" />
            </button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
              <Modal.Header closeButton>
                <Modal.Title>Search Products</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="text"
                  className="w-100"
                  placeholder="Type Keyword to Search"
                  onChange={(e) => {
                    const params = { keyword: e.target.value };
                    setSearchParams(params);
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      setShow(false);
                      window.scrollTo({ behavior: "smooth", top: "0px" });
                    }
                  }}
                  autoFocus
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success" onClick={handleClose}>
                  Search
                </Button>
              </Modal.Footer>
            </Modal>
            <Link to="/cart">
              <img src={require("../assets/img/chat (1) 1.png")} width="30" height="30" alt="" />
            </Link>

            <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
              <img src={require("../assets/img/profile-user-icon.png")} className="ms-3 welcome-name welcome-name-res" alt="" />
            </OverlayTrigger>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
