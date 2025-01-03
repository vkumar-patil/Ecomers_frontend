import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import {jwtDecode} from "jwt-decode";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8001/api/user/login",
        {
          email,
          password,
        }
      );
      if (!response.data) {
        console.error("data not found");
      }
      const { token, user } = response.data;
      toast.success("Login successful", { autoClose: 1000 });
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(response.data.token);
      const userID = decodedToken.userid; // Extract `userid`
      localStorage.setItem("userid", userID); // Save in localStorage
      console.log("User ID:", userID);
      if (user && user.Admin === false) {
        localStorage.setItem("LoggedIn", true);
        Navigate("/UserHomepage");
      } else {
        Navigate("/AdminHomepage");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h3 className="login-heading">Log In</h3>
        <label htmlFor="email" className="login-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="Email"
          className="login-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="login-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="Password"
          className="login-input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">
          Log In
        </button>
        <p style={{ color: "orange" }}>
          if you was not Register ? <FaArrowRight />
          <Link to={"/Register"}>Register</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LogIn;
