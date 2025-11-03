// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api.js";
import "./Login.css";
import bg from "../assets/dress_donations.jpg"; // ✅ Add this line

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();


const submit = async (e) => {
  e.preventDefault();
  const res = await login(email, password);
  if (!res.success) {
    setErr(res.message);
    return;
  }
  localStorage.setItem("carenet_auth", JSON.stringify({ user: res.user }));
  if (res.user.role === "admin" || res.user.role === "superadmin") nav("/admin");
  else if (res.user.role === "donor") nav("/donor");
  else if (res.user.role === "volunteer") nav("/volunteer");
  else nav("/");
};



  return (
      <div
          className="page about-page"
          style={{ backgroundImage: `url(${bg})` }} //  Set background image
        >
    <div className="page login-page">
      <div className="card form">
        <h1>Login</h1>
        <form onSubmit={submit}>
          <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          {err && <div className="error">{err}</div>}
          <div style={{display:"flex", gap:8, marginTop:8}}>
            <button className="btn" type="submit">Login</button>
            <button type="button" className="btn outline" onClick={()=>{ setEmail("superadmin@carenet.org"); setPassword("SuperAdmin123"); }}>Use Super Admin</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
