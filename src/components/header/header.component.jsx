import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import Cookies from "js-cookie";

const Header = () => {
  const [user, setUser] = useState(null);

  // read cookies on mount and whenever login changes
  useEffect(() => {
    const displayName = Cookies.get("display_name");
    const email = Cookies.get("email");
    if (displayName && email) {
      setUser({ display_name: displayName, email });
    } else {
      setUser(null);
    }
  }, []); // optional: add a dependency if you trigger login state change

  const handleLogout = () => {
    Cookies.remove("display_name");
    Cookies.remove("email");
    Cookies.remove("token");
    setUser(null);
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
