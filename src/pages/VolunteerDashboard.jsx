// src/pages/VolunteerDashboard.jsx
import React, { useState, useEffect } from "react";
import { getVisibleHelpRequests } from "../services/api.js";
import "./VolunteerDashboard.css";

export default function VolunteerDashboard(){
  const [visibleRequests, setVisibleRequests] = useState([]);

  useEffect(()=>{
    async function load() {
      try {
        const data = await getVisibleHelpRequests();
        setVisibleRequests(data || []);
      } catch(err) {
        console.error("Failed to load visible requests", err);
      }
    }
    load();
  }, []);

  return (
    <div className="page volunteer-page">
      <h1>Volunteer Dashboard</h1>
      <section className="card">
        <h2>Approved Requests</h2>
        {visibleRequests.length===0 ? <p>No approved requests yet.</p> : (
          <ul>
            {visibleRequests.map(r=>(
              <li key={r.id}>
                <strong>{r.type_of_help || r.typeOfHelp} at {r.location}</strong>
                <p className="muted">{r.details}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
