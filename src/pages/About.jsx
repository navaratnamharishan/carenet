import "./About.css";
import bg from "../assets/dress_donations.jpg"; //

export default function About() {
  return (
    <div
      className="page about-page"
      style={{ backgroundImage: `url(${bg})` }} 
    >
      <div className="card about-content">
        <h1>About CareNet</h1>
        <p>
          CareNet is a disaster relief coordination platform developed by
          <strong> V_Coders</strong>. It lets affected people submit help
          requests, allows NGOs to manage volunteers and donations, and helps
          donors see where support is needed.
        </p>

        <h3>Our Mission</h3>
        <p>
          To reduce delays and increase transparency in disaster relief
          operations using a simple web platform.
        </p>

        <h3>Team V_Coders</h3>
        <p>
          We are a group of university students building practical solutions for
          local communities.
        </p>
      </div>
    </div>
  );
}
