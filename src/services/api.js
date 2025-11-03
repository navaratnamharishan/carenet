export const API_BASE = "http://localhost/carenet/api"; 

// ---------------- Auth ----------------
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function registerUser({ name, email, password, role }) {
  const res = await fetch(`${API_BASE}/auth/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });
  return res.json();
}

// ---------------- Users ----------------
export async function getAllUsers() {
  const res = await fetch(`${API_BASE}/users/get_all_users.php`);
  return res.json();
}
export async function approveUser(id, adminId) {
  return fetch(`${API_BASE}/users/approve_user.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, adminId }),
  });
}
export async function rejectUser(id, adminId, note = "") {
  return fetch(`${API_BASE}/users/reject_user.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, adminId, note }),
  });
}
export async function changeUserRole(id, newRole) {
  return fetch(`${API_BASE}/users/change_role.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, role: newRole }),
  });
}
export async function deleteUser(id) {
  return fetch(`${API_BASE}/users/delete_user.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
}

// ---------------- Help Requests ----------------
export async function createHelpRequest(data) {
  const res = await fetch(`${API_BASE}/help_requests/create.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function getPendingHelpRequests() {
  const res = await fetch(`${API_BASE}/help_requests/get_pending.php`);
  return res.json();
}
export async function getAllHelpRequests() {
  const res = await fetch(`${API_BASE}/help_requests/get_all.php`);
  return res.json();
}
export async function approveHelpRequest(id, adminId) {
  return fetch(`${API_BASE}/help_requests/approve.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, admin_id: adminId }),
  });
}
export async function rejectHelpRequest(id, adminId, note = "") {
  return fetch(`${API_BASE}/help_requests/reject.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, adminId, note }),
  });
}
export async function resolveHelpRequest(id, adminId) {
  return fetch(`${API_BASE}/help_requests/resolve.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, adminId }),
  });
}
export async function getVisibleHelpRequests() {
  const res = await fetch(`${API_BASE}/help_requests/get_visible.php`);
  return res.json();
}

// ---------------- Donations ----------------
export async function getAllDonations() {
  const res = await fetch(`${API_BASE}/donations/get_all.php`);
  return res.json();
}
export async function getDonationSummary() {
  const res = await fetch(`${API_BASE}/donations/summary.php`);
  return res.json();
}
export async function makeDonation(donorId, { amount, proofNote }) {
  const res = await fetch(`${API_BASE}/donations/make_donation.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ donorId, amount, proofNote }),
  });
  return res.json();
}

// ---------------- Posts / Announcements ----------------
export async function getAllPosts() {
  const res = await fetch(`${API_BASE}/posts/get_all.php`);
  return res.json();
}
export async function createPost(authorId, { title, body }) {
  const res = await fetch(`${API_BASE}/posts/create.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ author_id: authorId, title, body }),
  });
  return res.json();
}
export async function updatePost(id, { title, body }) {
  const res = await fetch(`${API_BASE}/posts/update.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title, body }),
  });
  return res.json();
}
export async function deletePost(id) {
  const res = await fetch(`${API_BASE}/posts/delete.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

// ---------------- Notifications ----------------
export async function getNotificationsForUsers() {
  const res = await fetch(`${API_BASE}/notifications/get.php`);
  return res.json();
}
export async function deleteNotification(id) {
  const res = await fetch(`${API_BASE}/notifications/delete.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

// ---------------- Campaigns ----------------
export async function getCampaigns() {
  const res = await fetch(`${API_BASE}/campaigns/get_all.php`);
  return res.json();
}
export async function createCampaign(authorId, { title, year, location, summary, file }) {
  const formData = new FormData();
  formData.append("author_id", authorId);
  formData.append("title", title);
  formData.append("year", year);
  formData.append("location", location);
  formData.append("summary", summary);
  formData.append("image", file);

  const res = await fetch("http://localhost/carenet/api/campaigns/create.php", {
    method: "POST",
    body: formData,
  });
  return res.json();
}
export async function deleteCampaign(id) {
  const res = await fetch(`${API_BASE}/campaigns/delete.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

// ---------------- Team Members ----------------
export async function getTeamMembers() {
  const res = await fetch(`${API_BASE}/team/get_all.php`);
  return res.json();
}
export async function addTeamMember(adminId, { name, role, file }) {
  const formData = new FormData();
  formData.append("admin_id", adminId);
  formData.append("name", name);
  formData.append("role", role);
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/team/add.php`, { method: "POST", body: formData });
  return res.json();
}
export async function deleteTeamMember(id) {
  const res = await fetch(`${API_BASE}/team/delete.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

// ---------------- Contact ----------------
export async function getContactMessages() {
  const res = await fetch(`${API_BASE}/contact/get_messages.php`);
  return res.json();
}
export async function sendContactMessage({ name, email, message }) {
  const res = await fetch(`${API_BASE}/contact/send.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });
  return res.json();
}
