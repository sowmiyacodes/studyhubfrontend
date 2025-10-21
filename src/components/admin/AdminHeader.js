import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { UserContext } from "../../components/context/usercontext.component";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import './AdminHeader.css';

const AdminHeader = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("display_name");
    Cookies.remove("email");
    Cookies.remove("user_access");
    setUser(null);
    navigate("/");
  };

  return (
    <Navbar bg="primary" variant="dark" className="px-3">
      <Container fluid>
        <Navbar.Brand className="brand">StudyHub Admin</Navbar.Brand>
        <Nav className="ms-auto">
          <span className="text-white me-3">{user?.display_name}</span>
          <button className="btn btn-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;
