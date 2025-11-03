import React, { useState } from "react";
import "./Contact.css";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent (Backend will handle actual email sending).");
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      <div className="contact-content">
        {/* Left: NGO Info */}
        <div className="contact-info">
          <h3>📍 Our NGO Office</h3>
          <p><strong>Address:</strong> 123 NGO Street, Colombo, Sri Lanka</p>
          <p><strong>Phone:</strong> +94 77 123 4567</p>
          <p><strong>Email:</strong> support@ngo.com</p>

          
        </div>

        {/* Right: Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Your Email" required onChange={handleChange} />
          <input type="text" name="subject" placeholder="Subject" required onChange={handleChange} />
          <textarea name="message" rows="5" placeholder="Type your message..." required onChange={handleChange}></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
