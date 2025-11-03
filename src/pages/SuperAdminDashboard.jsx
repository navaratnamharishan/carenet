// src/pages/SuperAdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { getAllUsers, changeUserRole } from "../services/api.js";
import "./AdminDashboard.css";

export default function SuperAdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const u = await getAllUsers();
        setUsers(u || []);
      } catch(err) { console.error(err); }
    }
    load();
  }, []);

  async function handlePromoteAdmin(u) {
    if (!confirm(`Promote ${u.name} to Admin?`)) return;
    await changeUserRole(u.id, "admin");
    const u2 = await getAllUsers();
    setUsers(u2 || []);
  }

  async function handleDemoteAdmin(u) {
    if (!confirm(`Demote ${u.name} from Admin?`)) return;
    await changeUserRole(u.id, "donor");
    const u2 = await getAllUsers();
    setUsers(u2 || []);
  }

  return (
    <div className="page admin-page">
      <h1>Super Admin Dashboard</h1>
      <section className="card">
        <h2>User Management</h2>
        <table className="table">
          <thead>...same as before...</thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
                <td>{u.is_super ? "Yes" : "-"}</td>
                <td>
                  {!u.is_super && u.role !== "admin" && (
                    <button className="btn small" onClick={() => handlePromoteAdmin(u)}>Promote to Admin</button>
                  )}
                  {!u.is_super && u.role === "admin" && (
                    <button className="btn small danger" onClick={() => handleDemoteAdmin(u)}>Demote</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
