import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";

function Registerpage() {
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://ecomers-backend-ed5p.onrender.com/api/user/Register",
      { username, contact, email, password }
    );
    if (response.data) {
      alert("Registration successful");
      console.log(username, contact, email, password);
      Navigate("/login");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-heading">Register</h2>

        <label htmlFor="name" className="register-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="register-input"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="number" className="register-label">
          Number
        </label>
        <input
          type="number"
          id="number"
          name="Number"
          className="register-input"
          placeholder="Enter your number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <label htmlFor="email" className="register-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="Email"
          className="register-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="register-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="Password"
          className="register-input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="register-button">
          Submit
        </button>
        <p style={{ color: "orange" }}>
          if you alredy Registerd ? <FaArrowRight />
          <Link to={"/login"}>log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Registerpage;
