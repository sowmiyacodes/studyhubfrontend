import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    // 1️⃣ Check if user info exists in cookies/localStorage
    const savedUser = Cookies.get("display_name")
      ? {
          display_name: Cookies.get("display_name"),
          email: Cookies.get("email"),
        }
      : JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      navigate("/login"); // redirect if not logged in
      return;
    }

    setUser(savedUser);

    // 2️⃣ Optionally verify JWT cookie validity with backend
    const verifyLogin = async () => {
      try {
        const res = await fetch("http://localhost:5000/user/verify", {
          method: "GET",
          credentials: "include", // send JWT cookie
        });
        const data = await res.json();
        if (!res.ok) {
          setServerMessage("Session expired. Please log in again.");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setServerMessage(data.message || "Welcome back!");
        }
      } catch (err) {
        console.error(err);
        setServerMessage("Server error. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    verifyLogin();
  }, [navigate]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Welcome to Your Dashboard</h2>
      {user && (
        <p>
          Logged in as <strong>{user.display_name}</strong> (
          {user.email})
        </p>
      )}
      <p>{serverMessage}</p>

      <button
        className="btn btn-danger mt-3"
        onClick={() => {
          // 3️⃣ Logout: clear cookies + localStorage
          Cookies.remove("display_name");
          Cookies.remove("email");
          localStorage.removeItem("user");
          fetch("http://localhost:5000/user/logout", {
            method: "POST",
            credentials: "include",
          });
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
