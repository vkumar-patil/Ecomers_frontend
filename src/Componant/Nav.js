import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../ascets/logo.jpg";
import { CgProfile } from "react-icons/cg";

function Nav() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Navbar toggle state
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
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <li className="navbar-brand">
        <img
          src={logo}
          style={{ height: "40px", borderRadius: "10px" }}
          alt="Logo"
        />
      </li>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar} // Handle click manually
        aria-expanded={isOpen ? "true" : "false"}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
        id="navbarNav"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={"/"}>
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
        <form className="form-inline  my-lg-0">
          <li className="nav-item" style={{ listStyle: "none" }}>
            <Link
              to="/Cart"
              className="nav-link cart"
              style={{ fontSize: "3rem", color: "inherit" }}
            >
              <MdOutlineShoppingCart />
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item" style={{ listStyle: "none" }}>
                <span
                  className="nav-item mr-4"
                  style={{
                    color: "green",
                    fontFamily: "sans-serif",
                    fontSize: "30px",
                    listStyle: "none",
                  }}
                >
                  <CgProfile /> {user.username}
                </span>
              </li>
              <li
                className="nav-item"
                style={{ listStyle: "none", marginLeft: "20px" }}
              >
                <button
                  className="btn btn-danger nav-link"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item" style={{ listStyle: "none" }}>
                <button
                  className="btn btn-primary nav-link"
                  onClick={handleLogin}
                  style={{ marginRight: "20px" }}
                >
                  Log In
                </button>
              </li>
              <li className="nav-item" style={{ listStyle: "none" }}>
                <Link to="/register" style={{ marginRight: "10px" }}>
                  <button className="btn btn-success nav-link">Register</button>
                </Link>
              </li>
            </>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Nav;

// <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <li className="navbar-brand" style={{ listStyle: "none" }}>
//     <img
//       src={logo}
//       style={{ height: "40px", borderRadius: "10px" }}
//       alt="Logo"
//     />
//   </li>
//   <button
//     className="navbar-toggler"
//     type="button"
//     data-toggle="collapse"
//     data-target="#navbarSupportedContent"
//     aria-controls="navbarSupportedContent"
//     aria-expanded="false"
//     aria-label="Toggle navigation"
//   >
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav mr-auto">
//       <li className="nav-item active" style={{ listStyle: "none" }}>
//         <Link className="nav-link" to={"/"}>
//           Home <span className="sr-only">(current)</span>
//         </Link>
//       </li>
/* <form className="form-inline my-2 my-lg-0"> */

/* <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            // onChange={handleSearch}
          /> */

/* </form> */

//       <li
//         className="nav-item "
//         style={{ listStyle: "none", marginRight: "20px" }}
//       >
//         <Link
//           to="/Cart"
//           className="nav-link cart"
//           style={{
//             fontSize: "xxx-large",
//           }}
//         >
//           <MdOutlineShoppingCart />
//         </Link>
//       </li>

//       {user ? (
//         <>
//           <li
//             className="nav-item mr-4"
//             style={{
//               color: "green",
//               fontFamily: "sans-serif",
//               fontSize: "30px",
//               listStyle: "none",
//             }}
//           >
//             Hello,{user.username}
//           </li>
//           <li className="nav-item mr-4">
//             <button
//               className="btn btn-danger nav-link"
//               onClick={handleLogout}
//             >
//               Log Out
//             </button>
//           </li>
//         </>
//       ) : (
//         <>
//           <li className="nav-item mr-4">
//             <button
//               className="btn btn-primary nav-link"
//               onClick={handleLogin}
//               style={{ marginRight: "20px" }}
//             >
//               Log In
//             </button>
//           </li>
//           <li className="nav-item mr-4">
//             <Link to="/register" style={{ marginRight: "10px" }}>
//               <button className="btn btn-success nav-link">Register</button>
//             </Link>
//           </li>
//         </>
//       )}
//     </ul>
//   </div>
// </nav>
