import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import logo from "../ascets/logo.jpg";

function Nav({ serchproduct, setSerchproduct }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if user data is saved in localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = () => {
    // Navigate to login page
    navigate("/login");
  };

  const handleLogout = () => {
    // Remove data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">
        <img
          src={logo}
          style={{ height: "40px", borderRadius: "10px" }}
          alt="Logo"
        />
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="navbar-brand" to={"/"}>
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={serchproduct}
            onChange={(e) => setSerchproduct(e.target.value)}
          />
          <span>
            <Link
              to="/Cart"
              className="cart"
              style={{ fontSize: "xxx-large", color: "orange" }}
            >
              <HiShoppingCart />
            </Link>
          </span>

          {user ? (
            <>
              <span
                style={{
                  color: "green",
                  fontFamily: "sans-serif",
                  fontSize: "30px",
                }}
              >
                Hello,{user.username}
              </span>
              <button className="btn btn-danger" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary" onClick={handleLogin}>
                Log In
              </button>

              <Link to="/register">
                <button className="btn btn-success">Register</button>
              </Link>
            </>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Nav;
