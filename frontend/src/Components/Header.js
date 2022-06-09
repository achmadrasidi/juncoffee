import React, { useState } from "react";
import { Navbar, Container, Nav, Modal, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Prompt from "./SubComponent/Prompt";

const Header = ({ setKeyword }) => {
  const [show, setShow] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { token, email } = useSelector((state) => state.persist.userToken.info);
  const { image } = useSelector((state) => state.persist.userDetail.info);
  const handleClose = () => {
    navigate("/product", { replace: true });
    setShow(false);
    window.scrollTo({ behavior: "smooth", top: "0px" });
  };

  const handleShow = () => setShow(true);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" className="text-center">
        {email ? email : "John Doe"}
      </Popover.Header>
      <Popover.Body>
        {token ? (
          <>
            <Nav.Link href="/profile" className="text-center">
              Profile
            </Nav.Link>
            <Nav.Link href="/cart" className="text-center">
              Cart
            </Nav.Link>
            <Nav.Link href="/history" className="text-center">
              History
            </Nav.Link>
          </>
        ) : (
          <></>
        )}
        {token ? (
          <Nav.Link onClick={() => setShowLogoutConfirm(true)} className="text-center">
            Logout
          </Nav.Link>
        ) : (
          <Nav.Link href="/auth/login" className="text-center">
            Login
          </Nav.Link>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <>
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
              e.preventDefault();
              setKeyword(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setShow(false);
                navigate("/product", { replace: true, state: e.target.value });
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

      <Prompt show={showLogoutConfirm} confirm={() => navigate("/logout", { replace: true })} message={"Are You Sure"} cancel={() => setShowLogoutConfirm(false)} />

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
              <Nav.Link href="/" active={pathname === "/"}>
                Home
              </Nav.Link>
              <Nav.Link href="/product" active={pathname.includes("product")}>
                Product
              </Nav.Link>
              <Nav.Link href="/cart" active={pathname === "/cart"}>
                Your Cart
              </Nav.Link>
              <Nav.Link href="/history" active={pathname === "/history"}>
                History
              </Nav.Link>
            </Nav>
            <div className="profile-right-nav">
              <button className="p-0 border-0 bg-white" onClick={handleShow}>
                <img src={require("../assets/img/search.png")} width="30" height="30" className="me-3" alt="" />
              </button>

              {token ? (
                <Link to="/cart">
                  <img src={require("../assets/img/chat (1) 1.png")} width="30" height="30" alt="" />
                </Link>
              ) : (
                <></>
              )}

              <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
                <img src={image && image !== null ? `${process.env.REACT_APP_API}${image}` : require("../assets/img/default-img.webp")} className="ms-3 welcome-name welcome-name-res" alt="" />
              </OverlayTrigger>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
