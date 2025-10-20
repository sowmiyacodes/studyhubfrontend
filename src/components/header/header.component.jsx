// src/components/header/header.component.jsx
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../context/usercontext.component"; // adjust path
import "./header.component.css";

const Header = () => {
  // use global user state from context
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    Cookies.remove("display_name");
    Cookies.remove("email");
    Cookies.remove("token");
    setUser(null); // immediately update Navbar
  };

  return (
    <Fragment>
      <Navbar expand="lg" bg="light" className="border-bottom shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">StudyHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/question-bank">Question Bank</Nav.Link>
              <Nav.Link as={Link} to="/academic-resources">Academic Resources</Nav.Link>
              <Nav.Link as={Link} to="/discuss">Discuss</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="light" id="user-dropdown">
                    {user.display_name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.ItemText>{user.email}</Dropdown.ItemText>
                    {user.user_access === "admin" && (
    <Dropdown.Item as={Link} to="/admin">Admin Panel</Dropdown.Item>
  )}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  );
};

export default Header;
