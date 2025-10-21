import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUsers, FaPlus, FaEye, FaSignOutAlt, FaBars } from "react-icons/fa";
import './AdminSidebar.css';

const AdminSidebar = ({ collapsed, toggleSidebar }) => {
  return (
    <div
      className={`bg-dark text-white d-flex flex-column transition-sidebar`}
      style={{ width: collapsed ? "80px" : "250px", minHeight: "100vh" }}
    >
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
        {!collapsed && <h5>Admin Panel</h5>}
        <button onClick={toggleSidebar} className="btn btn-sm btn-light">
          <FaBars />
        </button>
      </div>
      <Nav className="flex-column p-2 gap-2">
        <Nav.Link as={Link} to="/admin/dashboard" className="text-white">
          <FaUsers /> {!collapsed && "Dashboard"}
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/users" className="text-white">
          <FaUsers /> {!collapsed && "Users"}
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/add" className="text-white">
          <FaPlus /> {!collapsed && "Add"}
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/view" className="text-white">
          <FaEye /> {!collapsed && "View"}
        </Nav.Link>
        <Nav.Link as={Link} to="/" className="text-white">
          <FaSignOutAlt /> {!collapsed && "Logout"}
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
