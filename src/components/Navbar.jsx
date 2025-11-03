// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Notification from "../assets/notification.png";
import MenuIcon from "../assets/menu_icon.png"; // ← 3-line hamburger icon

export default function Navbar() {
  const auth = JSON.parse(localStorage.getItem("carenet_auth") || "null");
  const navigate = useNavigate();

  // Notification dropdown
  const [showBox, setShowBox] = useState(false);
  const notifications = [
    { id: 1, title: "New help request received", isNew: true },
    { id: 2, title: "Donation approved", isNew: false },
  ];
  const hasNew = notifications.some((n) => n.isNew);

  // Mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem("carenet_auth");
    navigate("/");
  }

  return (
    <header className="nav">
      {/* Left Side Logo */}
      <div className="nav-left">
        <Link to="/" className="brand">CareNet</Link>
      </div>

      {/* 🔔 Notification Bell (Always Visible) */}
      <div className="notif-mobile-wrapper">
        <div className="notification-wrapper">
          <img
            src={Notification}
            alt="notification"
            className="notification-bell"
            onClick={() => setShowBox(!showBox)}
          />
          {hasNew && <span className="notif-dot"></span>}

          {showBox && (
            <div className="notification-box">
              {notifications.length === 0 ? (
                <div className="notification-item muted">No notifications.</div>
              ) : (
                notifications.map((note) => (
                  <div key={note.id} className="notification-item">
                    {note.title}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* ☰ Hamburger icon (phone view only) */}
        <img
          src={MenuIcon}
          alt="menu"
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* Desktop Navigation */}
      <nav className="nav-right">
        {auth && auth.user ? (
          <>
            {(auth.user.role === "admin" || auth.user.role === "superadmin") && (
              <Link to="/admin">Admin</Link>
            )}
            {auth.user.role === "donor" && <Link to="/donor">Donor</Link>}
            {auth.user.role === "volunteer" && <Link to="/volunteer">Volunteer</Link>}
            <button className="btn link" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      {/* 📱 Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {auth && auth.user ? (
            <>
              {(auth.user.role === "admin" || auth.user.role === "superadmin") && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
              )}
              {auth.user.role === "donor" && (
                <Link to="/donor" onClick={() => setMenuOpen(false)}>Donor</Link>
              )}
              {auth.user.role === "volunteer" && (
                <Link to="/volunteer" onClick={() => setMenuOpen(false)}>Volunteer</Link>
              )}
              <button className="btn link" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
