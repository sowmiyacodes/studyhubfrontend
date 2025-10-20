// src/layouts/AdminLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader"; // ?? Import it
import AdminFooter from "../components/admin/AdminFooter";

const AdminLayout = () => {
  return (
 <div className="d-flex flex-row min-vh-100 bg-light">
      <AdminSidebar />
      <div className="wrapper flex-grow-1">
        <AdminHeader />
        <Outlet />
        <AdminFooter />
      </div>
    </div>
  );
};
export default AdminLayout;


