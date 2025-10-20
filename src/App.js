// App.js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

import Header from './components/header/header.component.jsx';
import RegisterForm from './components/auth/register.component.jsx';
import LoginForm from './components/auth/login.component.jsx';
import { UserContext } from './components/context/usercontext.component.js';
import Home from './pages/home.jsx'; 


import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";

const App = () => {
  // initialize user state from cookies
  const [user, setUser] = useState(() => {
    const displayName = Cookies.get("display_name");
    const email = Cookies.get("email");
    return displayName && email ? { display_name: displayName, email } : null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
          {/* Optional: catch-all redirect */}
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
		          <Route index element={<Dashboard />} />
		          <Route path="dashboard" element={<Dashboard />} />
		    </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
