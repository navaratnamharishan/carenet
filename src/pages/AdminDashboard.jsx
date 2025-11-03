// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import {
  getAllUsers, getPendingHelpRequests, getAllHelpRequests, approveUser, rejectUser, changeUserRole, deleteUser,
  approveHelpRequest, rejectHelpRequest, resolveHelpRequest,
  getAllDonations, getDonationSummary, getAllPosts, createPost, updatePost, deletePost,
  getNotificationsForUsers, deleteNotification,
  createCampaign, getCampaigns, deleteCampaign,
  addTeamMember, getTeamMembers, deleteTeamMember,
  getContactMessages
} from "../services/api.js";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  // State
  const [users, setUsers] = useState([]);
  const [pendingReqs, setPendingReqs] = useState([]);
  const [allReqs, setAllReqs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [donSummary, setDonSummary] = useState({ total: 0, count: 0 });
  const [donations, setDonations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [team, setTeam] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    try {
      const [
        usersData,
        pendingReqsData,
        allReqsData,
        postsData,
        donationsData,
        donSummaryData,
        notificationsData,
        campaignsData,
        teamData,
        contactsData
      ] = await Promise.all([
        getAllUsers(),
        getPendingHelpRequests(),
        getAllHelpRequests(),
        getAllPosts(),
        getAllDonations(),
        getDonationSummary(),
        getNotificationsForUsers(),
        getCampaigns(),
        getTeamMembers(),
        getContactMessages()
      ].map(p => p.catch(e => { console.error(e); return [] })));

      setUsers(usersData || []);
      setPendingReqs(pendingReqsData || []);
      setAllReqs(allReqsData || []);
      setPosts(postsData || []);
      setDonations(donationsData || []);
      setDonSummary(donSummaryData || { total: 0, count: 0 });
      setNotifications(notificationsData || []);
      setCampaigns(campaignsData || []);
      setTeam(teamData || []);
      setContacts(contactsData || []);
    } catch (err) { console.error("loadAll error", err); }
  }

  // --- Users ---
  function onApproveUser(u) { approveUser(u.id, 1); loadAll(); }
  function onRejectUser(u) { const note = prompt("Rejection note (optional):", ""); rejectUser(u.id, 1, note); loadAll(); }
  function onChangeRole(u, newRole) { if (!confirm(`Change role to ${newRole}?`)) return; changeUserRole(u.id, newRole); loadAll(); }
  function onDeleteUser(u) { if (!confirm("Delete user?")) return; deleteUser(u.id); loadAll(); }

  // --- Help Requests ---
  function onApproveRequest(id) { approveHelpRequest(id, 1); loadAll(); }
  function onRejectRequest(id) { const note = prompt("Rejection note (optional):", ""); rejectHelpRequest(id, 1, note); loadAll(); }
  function onResolveRequest(id) { if (!confirm("Mark resolved?")) return; resolveHelpRequest(id, 1); loadAll(); }

  // --- Posts ---
  function onCreatePost(e) { 
    e.preventDefault(); 
    if (!newPost.title || !newPost.body) return alert("Enter title/body"); 
    createPost(1, newPost); 
    setNewPost({ title: "", body: "" }); 
    loadAll(); 
  }
  function onEditPost(p) { 
    const t = prompt("Title:", p.title); if (t === null) return; 
    const b = prompt("Body:", p.body); if (b === null) return; 
    updatePost(p.id, { title: t, body: b }); 
    loadAll(); 
  }
  function onDeletePost(p) { if (!confirm("Delete post?")) return; deletePost(p.id); loadAll(); }

  // --- Notifications ---
  function onDeleteNotif(n) { if (!confirm("Delete notification?")) return; deleteNotification(n.id); loadAll(); }

  // --- Campaigns ---
async function onAddCampaign() {
  const title = prompt("Title:"); if (!title) return;
  const year = prompt("Year:"); if (!year || isNaN(year)) return alert("Enter valid year");
  const location = prompt("Location:"); if (!location) return;
  const summary = prompt("Summary:"); if (!summary) return;

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.onchange = async () => {
    const file = fileInput.files[0];
    if (!file) return alert("No file selected");

    const formData = new FormData();
    formData.append("Harishan", 1); 
    formData.append("title", title);
    formData.append("year", year);
    formData.append("location", location);
    formData.append("summary", summary);
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost/carenet/api/campaigns/create.php", {
        method: "POST",
        body: formData
      });

      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } 
      catch (err) {
        console.error("Invalid JSON from server:", text);
        return alert("Server returned invalid data. Check console.");
      }

      if (data.success) {
        alert("Campaign added!");
        const campaignsData = await getCampaigns(); 
        setCampaigns(campaignsData);
      } else {
        alert("Error: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Request failed. Check console.");
    }
  };

  fileInput.click();
}



  function onDeleteCampaign(c) { if (!confirm("Delete campaign?")) return; deleteCampaign(c.id); loadAll(); }

  // --- Team Members ---
  async function onAddTeam() {
    const name = prompt("Name:"); if (!name) return;
    const role = prompt("Role:"); if (!role) return;

    const fileInput = document.createElement("input");
    fileInput.type = "file"; fileInput.accept = "image/*";
    fileInput.onchange = async () => {
      const file = fileInput.files[0]; if (!file) return alert("No file selected");
      const formData = new FormData();
      formData.append("admin_id", 1);
      formData.append("name", name);
      formData.append("role", role);
      formData.append("image", file);

      const res = await fetch("http://localhost/carenet/api/team/add.php", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) alert("Team member added!"); else alert("Error: " + data.error);
      loadAll();
    };
    fileInput.click();
  }
  function onDeleteTeam(m) { if (!confirm("Delete member?")) return; deleteTeamMember(m.id); loadAll(); }

  return (
    <div className="page admin-page">
      <h1>Admin Dashboard</h1>

      {/* Users */}
      <section className="card">
        <h2>Users Management</h2>
        <table className="table">
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.status}</td>
                <td>
                  {u.status === "pending" && <button className="btn small" onClick={() => onApproveUser(u)}>Approve</button>}
                  {u.status === "pending" && <button className="btn small outline" onClick={() => onRejectUser(u)}>Reject</button>}
                  <select value={u.role} onChange={(e) => onChangeRole(u, e.target.value)} style={{ marginLeft: 8 }}>
                    <option value="donor">Donor</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button className="btn small danger" onClick={() => onDeleteUser(u)} style={{ marginLeft: 8 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Pending Help Requests */}
      <section className="card">
        <h2>Pending Help Requests</h2>
        {pendingReqs.length === 0 ? <p>No pending requests.</p> :
          <ul className="req-list">
            {pendingReqs.map(r => (
              <li key={r.id}>
                <strong>{r.typeOfHelp} at {r.location}</strong> — {r.name} ({r.contact})
                <p>{r.details}</p>
                <div className="muted">Submitted: {new Date(r.createdAt).toLocaleString()}</div>
                <div style={{ marginTop: 8 }}>
                  <button className="btn small" onClick={() => onApproveRequest(r.id)}>Approve</button>
                  <button className="btn small danger" onClick={() => onRejectRequest(r.id)}>Reject</button>
                </div>
              </li>
            ))}
          </ul>
        }
      </section>

      {/* All Requests */}
      <section className="card">
        <h2>All Requests</h2>
        {allReqs.length === 0 ? <p>No requests.</p> :
          <ul>
            {allReqs.map(r => (
              <li key={r.id}>
                <strong>{r.typeOfHelp} at {r.location}</strong> — {r.status}
                <div className="muted">By {r.name}</div>
                {r.status === "approved" && <button className="btn small" onClick={() => onResolveRequest(r.id)}>Mark Resolved</button>}
              </li>
            ))}
          </ul>
        }
      </section>

      {/* Posts */}
      <section className="card">
        <h2>Announcements (Posts)</h2>
        <form onSubmit={onCreatePost} className="post-form">
          <input placeholder="Title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} required />
          <textarea placeholder="Body" value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} required />
          <button className="btn" type="submit">Create Post</button>
        </form>
        <div className="posts">
          {posts.length === 0 ? <p>No posts yet.</p> :
            posts.map(p => (
              <div key={p.id} className="card post-item">
                <h4>{p.title}</h4>
                <div className="muted">By adminId: {p.authorId} • {new Date(p.createdAt).toLocaleString()}</div>
                <p>{p.body}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn small" onClick={() => onEditPost(p)}>Edit</button>
                  <button className="btn small danger" onClick={() => onDeletePost(p)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Notifications */}
      <section className="card">
        <h2>Notifications</h2>
        {notifications.length === 0 ? <p>No notifications.</p> :
          <ul>
            {notifications.map(n => (
              <li key={n.id}>
                <strong>{n.title}</strong>
                <div className="muted">{new Date(n.createdAt).toLocaleString()}</div>
                <p>{n.message}</p>
                <button className="btn small danger" onClick={() => onDeleteNotif(n)}>Delete Notification</button>
              </li>
            ))}
          </ul>
        }
      </section>

      {/* Campaigns */}
      <section className="card">
        <h2>Campaigns</h2>
        <div style={{ marginBottom: 10 }}>
          <button className="btn" onClick={onAddCampaign}>Add Campaign</button>
        </div>
        <div className="campaign-row admin">
          {campaigns.length === 0 ? <p>No campaigns.</p> :
            campaigns.map(c => (
              <div key={c.id} className="campaign-card admin">
                <div className="campaign-img" style={{ backgroundImage: `url(http://localhost/carenet/${c.image})` }} />
                <div className="campaign-meta">
                  <div className="year">{c.year}</div>
                  <div className="location">{c.location}</div>
                </div>
                <div style={{ marginTop: 8 }}>
                  <button className="btn small danger" onClick={() => onDeleteCampaign(c)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Team Members */}
      <section className="card">
        <h2>Team Members</h2>
        <div style={{ marginBottom: 10 }}>
          <button className="btn" onClick={onAddTeam}>Add Member</button>
        </div>
        <div className="team-row admin">
          {team.length === 0 ? <p>No members yet.</p> :
            team.map(m => (
              <div key={m.id} className="member-card">
                <img src={`http://localhost/carenet/${m.image}`} alt={m.name} className="avatar" />
                <div>{m.name}</div>
                <div className="muted">{m.role}</div>
                <button className="btn small danger" onClick={() => onDeleteTeam(m)}>Delete</button>
              </div>
            ))}
        </div>
      </section>

      {/* Contact Messages */}
      <section className="card">
        <h2>Contact Messages</h2>
        {contacts.length === 0 ? <p>No messages.</p> :
          <ul>
            {contacts.map(c => (
              <li key={c.id}>
                <strong>{c.subject}</strong> — {c.name} ({c.email})
                <div className="muted">{new Date(c.createdAt).toLocaleString()}</div>
                <p>{c.message}</p>
              </li>
            ))}
          </ul>
        }
      </section>
    </div>
  );
}
