// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api.js";
import "./Register.css";
import bg from "../assets/dress_donations.jpg";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "donor" });
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    if (!res.success) {
      setMsg({ type: "error", text: res.message });
      return;
    }
    setMsg({ type: "success", text: "Registered. Await admin approval." });
    setTimeout(() => nav("/login"), 1200);
  };

  return (
    <div
      className="page about-page"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="page register-page">
        <div className="card form">
          <h1>Register</h1>
          <form onSubmit={submit}>
            <input
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="donor">Donor</option>
              <option value="volunteer">Volunteer</option>
            </select>
            <button className="btn" type="submit">Register</button>
            {msg && <div className={msg.type === "error" ? "error" : "success"}>{msg.text}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
