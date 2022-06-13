import React, { useState } from "react";
import { Navbar, Container, Nav, Modal, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getKeyword } from "../Redux/Actions/SearchActions";
import Prompt from "./SubComponent/Prompt";
import { userLogout } from "../Redux/Actions/UserAction";

const Header = () => {
  const [show, setShow] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const { token, email, image, role } = useSelector((state) => state.persist.userInfo.info);
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
    const { value } = e.target;
    dispatch(getKeyword(value));
    window.scrollTo({ behavior: "smooth", top: "0px" });
    navigate("/product", { replace: true });
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
            {role === "admin" ? (
              <>
                <Nav.Link href="/dashboard" className="text-center">
                  Dashboard
                </Nav.Link>
                <Nav.Link href="/profile" className="text-center">
                  Profile
                </Nav.Link>
                <Nav.Link href="#" className="text-center">
                  Orders
                </Nav.Link>
              </>
            ) : (
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
            )}
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
      <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Search Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="w-100"
            placeholder="Type Keyword to Search"
            onKeyUp={(e) => {
              e.preventDefault();
              if (e.key === "Enter") {
                setShow(false);
                const { value } = e.target;
                dispatch(getKeyword(value));
                navigate("/product", { replace: true });
              }
            }}
            autoFocus
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>

      <Prompt
        show={showLogoutConfirm}
        confirm={() => {
          dispatch(userLogout());
          navigate("/logout", { replace: true });
        }}
        message={"Are You Sure ?"}
        cancel={() => setShowLogoutConfirm(false)}
      />

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
              {role === "admin" ? (
                <>
                  {" "}
                  <Nav.Link href="#" active={pathname === "/cart"}>
                    Orders
                  </Nav.Link>
                  <Nav.Link href="/dashboard" active={pathname === "/dashboard"}>
                    Dashboard
                  </Nav.Link>
                </>
              ) : (
                <>
                  {" "}
                  <Nav.Link href="/cart" active={pathname === "/cart"}>
                    Your Cart
                  </Nav.Link>{" "}
                  <Nav.Link href="/history" active={pathname === "/history"}>
                    History
                  </Nav.Link>
                </>
              )}
            </Nav>
            <div className="profile-right-nav">
              <button className="p-0 border-0 bg-white" onClick={handleShow}>
                <img src={require("../assets/img/search.png")} width="30" height="30" className="me-3" alt="" />
              </button>

              {token ? (
                <Link to="#">
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
