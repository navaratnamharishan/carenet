// NotificationBell.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NotificationBell = ({ notifications }) => {
  const [open, setOpen] = useState(false);

  const unread = notifications.some((n) => n.isNew === true);

  return (
    <div className="notification-container">
      <div className="bell-icon" onClick={() => setOpen(!open)}>
        <FaBell size={24} />
        {unread && <span className="notification-dot"></span>}
      </div>

      {open && (
        <div className="notification-box">
          {notifications.length === 0 ? (
            <p className="empty">No new notifications</p>
          ) : (
            notifications.map((notification) => (
              <Link
                to={`/notification/${notification.id}`}
                className="notification-item"
                key={notification.id}
              >
                {notification.title}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
