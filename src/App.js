// App.js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import Header from "./components/header/header.component.jsx";
import RegisterForm from "./components/auth/register.component.jsx";
import LoginForm from "./components/auth/login.component.jsx";
import { UserContext } from "./components/context/usercontext.component.js";
import Home from "./pages/home.jsx";

// Admin pages
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Add from "./pages/admin/Add";
import View from "./pages/admin/View";

const App = () => {
  const [user, setUser] = useState(() => {
    const displayName = Cookies.get("display_name");
    const email = Cookies.get("email");
    const user_access = Cookies.get("user_access");
    return displayName && email
      ? { display_name: displayName, email, user_access }
      : null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="*" element={<Home />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />       {/* /admin */}
          <Route path="users" element={<Users />} />   {/* /admin/users */}
          <Route path="add" element={<Add />} />       {/* /admin/add */}
          <Route path="view" element={<View />} />     {/* /admin/view */}
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
