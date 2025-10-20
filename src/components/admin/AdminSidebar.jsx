import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`sidebar d-flex flex-column ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header p-3 d-flex justify-content-between align-items-center">
        {!collapsed && <h5 className="m-0">Admin Panel</h5>}
        <button className="btn btn-sm btn-light" onClick={toggleSidebar}>
          {collapsed ? '»' : '«'}
        </button>
      </div>
      <Nav className="flex-column p-2">
        <Nav.Link href="#">Dashboard</Nav.Link>
        <Nav.Link href="#">Users</Nav.Link>
        <Nav.Link href="#">Settings</Nav.Link>
        <Nav.Link href="#">Logout</Nav.Link>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
