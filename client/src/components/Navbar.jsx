import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("vbcUser")); }
    catch { return null; }
  }, []);
  const logout = () => {
    localStorage.removeItem("vbcToken");
    localStorage.removeItem("vbcUser");
    localStorage.removeItem("vbcOrder");
    navigate("/login", { replace: true });
  };
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <Link to="/">
          VBC BRICKS
        </Link>
      </div>

      <div className="navbar-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/about">
          About
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/services">
          Services
        </Link>

        <Link to="/gallery">
          Gallery
        </Link>

        <Link to="/contact">
          Contact
        </Link>

        <Link to="/admin/products">
          Manage Products
        </Link>

      </div>

      <div className="navbar-auth">
        <span className="welcome-user">Hi, {user?.name || "Customer"}</span>
        <button type="button" className="logout-btn" onClick={logout}>Logout</button>

      </div>

    </nav>
  );
}

export default Navbar;
