// src/components/admin/AdminHeader.js
import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const AdminHeader = () => {
 return (
   <Fragment>
    <Navbar expand="lg" bg="light" className="border-bottom shadow-sm">
      <Container>
        {/* Brand on left */}
        <Navbar.Brand as={Link} to="/">StudyHub</Navbar.Brand>

        {/* Hamburger toggler */}
        <Navbar.Toggle aria-controls="main-navbar-nav" />

        {/* Collapsible content */}
        <Navbar.Collapse id="main-navbar-nav">         

          {/* Right side login/register */}
          <Nav className="ms-auto">
           <div className="d-flex align-items-center gap-3">
              <span className="me-3">Hello, Admin </span>
              <button  > Logout </button>
            </div> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>   
    </Fragment>
  );
};
export default AdminHeader;
