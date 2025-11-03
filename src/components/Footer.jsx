import React from "react";
import "./Footer.css";
import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>
          © {new Date().getFullYear()} <strong>CareNet</strong> — Disaster Relief Coordination
        </p>

        <div className="social-links">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={twitter} alt="Twitter" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}
