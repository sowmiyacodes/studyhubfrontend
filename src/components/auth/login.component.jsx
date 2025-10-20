import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../context/usercontext.component.js"; // adjust path

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // ✅ use context

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateData = () => {
    let newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Required';
    if (!formData.password.trim()) newErrors.password = 'Required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const validationErrors = validateData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data); 
      if (response.ok) {
        setMessage(data.message || "Login successful!");

        // store display_name and email in cookies
        if (data.display_name && data.email) {
          Cookies.set("display_name", data.display_name, { expires: 1 });
          Cookies.set("email", data.email, { expires: 1 });
           Cookies.set("user_access", data.user_access, { expires: 1 });
          // ✅ update Navbar immediately
          setUser({
    display_name: data.display_name,
    email: data.email,
    user_access: data.user_access,
  });
        }

        // optional: store token if needed
        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
        }

        // redirect to Home
        navigate("/");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>       
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-3 text-center">
        Dont have an account?{" "}
        <Link to="/register" className="text-decoration-none">
          Register now
        </Link>{" "}
        |{" "}
        <Link to="/forgot-password" className="text-decoration-none">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
