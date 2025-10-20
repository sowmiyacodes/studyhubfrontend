import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FaUsers, FaPlus, FaEye, FaSignOutAlt, FaBars, FaChevronLeft } from 'react-icons/fa';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const navItems = [
    { icon: <FaUsers />, label: 'Users', href: '#' },
    { icon: <FaPlus />, label: 'Add', href: '#' },
    { icon: <FaEye />, label: 'View', href: '#' },
    { icon: <FaSignOutAlt />, label: 'Logout', href: '#' },
  ];

  return (
    <div className={`sidebar d-flex flex-column ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header p-3 d-flex justify-content-between align-items-center">
        {!collapsed && <h5 className="m-0">Admin Panel</h5>}
        <button className="btn btn-sm btn-light" onClick={toggleSidebar}>
          {collapsed ? <FaBars /> : <FaChevronLeft />}
        </button>
      </div>
      <Nav className="flex-column p-2">
        {navItems.map((item, idx) => (
          <Nav.Link key={idx} href={item.href} className="d-flex align-items-center">
            <span className="icon">{item.icon}</span>
            {!collapsed && <span className="label ms-2">{item.label}</span>}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default AdminSidebar;
