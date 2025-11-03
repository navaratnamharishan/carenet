// src/pages/DonorDashboard.jsx
import { useEffect, useState } from "react";
import { getNotificationsForUsers, getVisibleHelpRequests, makeDonation, getAllDonations } from "../services/api.js";
import "./DonorDashboard.css";

export default function DonorDashboard(){
  const [notes, setNotes] = useState([]);
  const [visibleRequests, setVisibleRequests] = useState([]);
  const [amount, setAmount] = useState("");
  const [proof, setProof] = useState("");
  const [myDonations, setMyDonations] = useState([]);

  const auth = JSON.parse(localStorage.getItem("carenet_auth") || "null");
  const donorId = auth && auth.user ? auth.user.id : null;

useEffect(() => {
  async function fetchData() {
    const notificationsData = await getNotificationsForUsers();
    setNotes(notificationsData);

    const requestsData = await getVisibleHelpRequests(); // make sure this also points to backend API
    setVisibleRequests(requestsData);

    if (donorId) {
      const donationsData = await getAllDonations(donorId); // backend API
      setMyDonations(donationsData);
    }
  }
  fetchData();
}, [donorId]);


  async function submitDonation(e) {
  e.preventDefault();
  if (!donorId) return alert("Login required");

  const res = await makeDonation(donorId, { amount, proofNote: proof });
  if (res.success) {
    alert("Donation recorded. Thank you!");
    setAmount("");
    setProof("");
    const updatedDonations = await getDonationsByDonor(donorId);
    setMyDonations(updatedDonations);
  }
}


  return (
    <div className="page donor-page">
      <h1>Donor Dashboard</h1>
      <section className="card">
        <h2>Make Donation</h2>
        <form onSubmit={submitDonation} className="form">
          <input placeholder="Amount (LKR)" value={amount} onChange={(e)=>setAmount(e.target.value)} required />
          <input placeholder="Proof note" value={proof} onChange={(e)=>setProof(e.target.value)} />
          <button className="btn" type="submit">Submit</button>
        </form>
      </section>

      <section className="card">
        <h2>Approved Help Requests</h2>
        {visibleRequests.length===0 ? <p>No visible requests.</p> : (
          <ul>{visibleRequests.map(r=>(<li key={r.id}><strong>{r.typeOfHelp}</strong> — {r.location}<p className="muted">{r.details}</p></li>))}</ul>
        )}
      </section>

      <section className="card">
        <h2>Notifications</h2>
        {notes.length===0 ? <p>No notifications.</p> : (<ul>{notes.map(n=>(<li key={n.id}><strong>{n.title}</strong><div className="muted">{new Date(n.createdAt).toLocaleString()}</div><p>{n.message}</p></li>))}</ul>)}
      </section>
    </div>
  );
}
