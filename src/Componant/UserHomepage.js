// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { initializeUser, logout } from "./userSlice";
// import axios from "axios";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import logo from "../ascets/logo.jpg"; // Adjust the path to your logo

// function Product() {
//   const [data, setData] = useState([]);
//   const [serch, setSerch] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Access Redux state
//   const user = useSelector((state) => state.user.user);
//   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

//   // Initialize user from localStorage on app load
//   useEffect(() => {
//     dispatch(initializeUser());
//   }, [dispatch]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8001/api/Admin/getProduct`
//         );
//         if (response.data) {
//           setData(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleAddToCart = async (item) => {
//     const productID = item._id;
//     const userID = user?.id; // Use Redux user state
//     const token = localStorage.getItem("token");
//     const quantity = 1;

//     if (!userID || !token) {
//       alert("Please login to add products to your cart.");
//       navigate("/login");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8001/api/user/add-to-cart",
//         { userID, productID, quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.message === "Product is already in the cart") {
//         alert("Product is already in the cart.");
//       } else {
//         alert("Product added to the cart successfully.");
//       }
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSerch(term);
//   };

//   useEffect(() => {
//     const filter = data.filter((product) =>
//       product.title?.toLowerCase().includes((serch || "").toLowerCase())
//     );
//     setFilteredData(filter);
//   }, [serch, data]);

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <span className="navbar-brand">
//           <img
//             src={logo}
//             style={{ height: "40px", borderRadius: "10px" }}
//             alt="Logo"
//           />
//         </span>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item active">
//               <Link className="navbar-brand" to={"/"}>
//                 Home
//               </Link>
//             </li>
//           </ul>
//           <form className="form-inline my-2 my-lg-0">
//             <input
//               className="form-control mr-sm-2"
//               type="search"
//               placeholder="Search"
//               aria-label="Search"
//               onChange={handleSearch}
//             />
//             <span>
//               <Link to="/Cart" className="cart" style={{ fontSize: "xxx-large", color: "GrayText" }}>
//                 <MdOutlineShoppingCart />
//               </Link>
//             </span>

//             {isLoggedIn ? (
//               <>
//                 <span
//                   style={{
//                     color: "green",
//                     fontFamily: "sans-serif",
//                     fontSize: "30px",
//                   }}
//                 >
//                   Hello, {user.username}
//                 </span>
//                 <button className="btn btn-danger" onClick={handleLogout}>
//                   Log Out
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button className="btn btn-primary" onClick={() => navigate("/login")}>
//                   Log In
//                 </button>

//                 <Link to="/register">
//                   <button className="btn btn-success">Register</button>
//                 </Link>
//               </>
//             )}
//           </form>
//         </div>
//       </nav>

//       <div className="container">
//         <div className="row">
//           {filteredData.map((item) => {
//             const img = item.Image
//               ? item.Image.split(",").map(
//                   (filename) => `http://localhost:8001/uploads/${filename}`
//                 )
//               : [];
//             return (
//               <div className="col-md-6 col-lg-3 text-center" key={item._id}>
//                 <Link to={`/Product/${item._id}`}>
//                   <img
//                     className="card-img-top"
//                     src={img[1]}
//                     alt="Product"
//                     style={{ height: "200px", objectFit: "cover" }}
//                   />
//                 </Link>
//                 <div className="card-body">
//                   <h5 className="card-title">{item.title}</h5>
//                   <p>
//                     <span className="price">
//                       <i className="fa-solid fa-indian-rupee-sign"></i>
//                       {item.price}
//                     </span>
//                   </p>
//                   <p>
//                     <button
//                       className="btn btn-warning"
//                       onClick={() => handleAddToCart(item)}
//                     >
//                       Add to Cart
//                     </button>
//                     <button className="btn btn-success">Buy</button>
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Product;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";
import "react-toastify/dist/ReactToastify.css";
//import Navbar from "./Nav";
import axios from "axios";
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../ascets/logo.jpg";
import { CgProfile } from "react-icons/cg";

function Product() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [serch, setSerch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/Admin/getProduct`
        );
        if (response.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = async (item) => {
    const productID = item._id;
    const userID = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    const quantity = 1;

    if (!userID || !token) {
      alert("Please login to add products to your cart.");
      navigate("/login"); // Navigate to login page
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8001/api/user/add-to-cart",
        { userID, productID, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message === "Product is already in the cart") {
        alert("Product is already in the cart.");
      } else {
        alert("Product added to the cart successfully.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSerch(term);
  };
  useEffect(() => {
    const filter = data.filter((product) =>
      product.title?.toLowerCase().includes((serch || "").toLowerCase())
    );
    setFilteredData(filter);
  }, [serch, data]);

  return (
    <>
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
              onChange={handleSearch}
            />
            <span>
              <Link
                to="/Cart"
                className="cart"
                style={{ fontSize: "xxx-large", color: "GrayText" }}
              >
                <MdOutlineShoppingCart />
              </Link>
            </span>

            {user ? (
              <>
                {user.Admin ? (
                  <>
                    <Link to={"/AdminHomepage"}>
                      <button className="btn btn-warning">
                        Uplode your Product on App
                      </button>
                    </Link>
                    <span
                      style={{
                        color: "green",
                        fontFamily: "sans-serif",
                        fontSize: "30px",
                      }}
                    >
                      <CgProfile />
                      {user.username}
                    </span>
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        color: "dark",
                        fontFamily: "sans-serif",
                        fontSize: "30px",
                      }}
                    >
                      <CgProfile />
                      {user.username}
                    </span>
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Log Out
                    </button>
                  </>
                )}
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
      {/* <Navbar /> */}
      <div className="container">
        <div className="row">
          {filteredData.map((item) => {
            const img = item.Image
              ? item.Image.split(",").map(
                  (filename) => `http://localhost:8001/uploads/${filename}`
                )
              : [];
            return (
              <div className="col-md-6 col-lg-3 text-center" key={item._id}>
                <Link to={`/Product/${item._id}`}>
                  <img
                    className="card-img-top"
                    src={img[1]}
                    alt="Product"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p>
                    <span className="price">
                      <i className="fa-solid fa-indian-rupee-sign"></i>
                      {item.price}
                    </span>
                    <span className="rating">
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </p>
                  <p>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button className="btn btn-success">Buy</button>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Product;
