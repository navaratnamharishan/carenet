import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCampaigns,
  getNotificationsForUsers,
  getTeamMembers,
  
  getAllPosts,
  
} from "../services/api.js";
import "./Home.css";
import hero1 from "../assets/hero.jpg";
import hero2 from "../assets/ass.jpg";
import hero3 from "../assets/dis1.jpg";
import hero4 from "../assets/dress.jpg";
import hero5 from "../assets/man.jpg";

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [team, setTeam] = useState([]);
  const [posts, setPosts] = useState([]);
  const heroImages = [hero1, hero2, hero3, hero4, hero5];
  const [currentHero, setCurrentHero] = useState(0);

 useEffect(() => {
  async function fetchData() {
    const campaignsData = await getCampaigns();
    setCampaigns(campaignsData);

    const notificationsData = await getNotificationsForUsers();
    setNotifications(notificationsData);

    const teamData = await getTeamMembers();
    setTeam(teamData);

    const postsData = await getAnnouncements();
    setPosts(postsData);
    const posts = await getAllPosts();
  }
  fetchData();

  const interval = setInterval(() => {
    setCurrentHero((prev) => (prev + 1) % heroImages.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  async function load() {
    const data = await getLatestNotifications();
    setNotifications(data);
  }
  load();
}, []);

  return (
    <div className="page home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <img src={heroImages[currentHero]} alt="hero" className="hero-img" />
        <div className="hero-overlay">
         
          <p>Coordinate relief requests with NGOs, volunteers and donors.</p>
          <div className="hero-actions">
            <Link to="/request-help" className="btn">Request Help</Link>
            <Link to="/about" className="btn outline">About</Link>
          </div>
        </div>
      </section>


      {/* NOTIFICATIONS SECTION */}
      <section className="card">
        <h2>Latest Notifications</h2>
        {notifications.length === 0 ? (
          <p>No notifications.</p>
        ) : (
          <ul className="note-list">
            {notifications.slice(0, 5).map((n) => (
              <li key={n.id}>
                <strong>{n.title}</strong>
                <div className="muted">{new Date(n.createdAt).toLocaleString()}</div>
                <p>{n.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/*  CAMPAIGNS SECTION */}
      <section className="card">
        <h2>Latest Campaigns</h2>
        <div className="campaign-row">
          {campaigns.length === 0 ? (
            <p>No campaigns yet.</p>
          ) : (
            campaigns.map((c) => (
              <div key={c.id} className="campaign-card">
<div
  className="campaign-img"
  style={{ backgroundImage: `url(http://localhost/carenet/${c.image})` }}
/>
                <div className="campaign-meta">
                  <div className="year">{c.year}</div>
                  <div className="location">{c.location}</div>
                </div>
                <div className="campaign-hover">
                  <h4>{c.title}</h4>
                  <p>{c.summary}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="card">
        <h2>Our Team</h2>
        <div className="team-row">
          {team.length === 0 ? (
            <p>No team members added.</p>
          ) : (
            team.map((m) => (
              <div key={m.id} className="member-card">
                <img src={`http://localhost/carenet/${m.image}`} alt={m.name} className="avatar" />
                <div className="member-name">{m.name}</div>
                <div className="member-role">{m.role}</div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
