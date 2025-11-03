// src/pages/HelpRequestForm.jsx
import React, { useState } from "react";
import { createHelpRequest } from "../services/api.js"; // ✅ Correct API name
import "./HelpRequestForm.css";
import bg from "../assets/volunteers2.jpg";

export default function HelpRequestForm() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    location: "",
    typeOfHelp: "Food",
    details: "",
    language: "English",
  });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  
const submit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMsg(null);

  try {
    const res = await createHelpRequest(form);
    if (res.success) {
      setMsg({ type: "success", text: "✅ Request submitted successfully!" });
      setForm({ name: "", contact: "", location: "", typeOfHelp: "Food", details: "", language: "English" });
    } else {
      setMsg({ type: "error", text: res.message || "Failed to submit." });
    }
  } catch (err) {
    console.error(err);
    setMsg({ type: "error", text: "⚠ Server error." });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="page about-page" style={{ backgroundImage: `url(${bg})` }}>
      <div className="page help-request-page">
        <div className="card form">
          <h1>Request Help</h1>
          <form onSubmit={submit}>
            <input placeholder="Full name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
            <input placeholder="Contact (phone/email)" value={form.contact} onChange={(e)=>setForm({...form, contact:e.target.value})} required />
            <input placeholder="Location (village/city)" value={form.location} onChange={(e)=>setForm({...form, location:e.target.value})} required />
            <select value={form.typeOfHelp} onChange={(e)=>setForm({...form, typeOfHelp:e.target.value})}>
              <option>Food</option><option>Medicine</option><option>Shelter</option><option>Clothes</option><option>Other</option>
            </select>
            <textarea placeholder="Details" value={form.details} onChange={(e)=>setForm({...form, details:e.target.value})} required />
            <select value={form.language} onChange={(e)=>setForm({...form, language:e.target.value})}>
              <option>English</option><option>Sinhala</option><option>Tamil</option>
            </select>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </button>
            {msg && <div className={msg.type === "error" ? "error" : "success"}>{msg.text}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
