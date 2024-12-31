import React from "react";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";
import logo from "../ascets/logo.jpg";
function Nav({ serchproduct, setSerchproduct }) {
  const cart = useSelector((state) => state.cart);

  const itemCount = cart ? cart.items.length : 0; // Safe check
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">
          <img
            src={logo}
            style={{ height: "40px", borderRadius: "10px" }}
          ></img>
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
                {" "}
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
              <span className="badge badge-light position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {itemCount}
              </span>
              <span className="sr-only">unread messages</span>
              <Link
                to="/Cart"
                className="cart "
                style={{ fontSize: "xxx-large", color: "orange" }}
              >
                <HiShoppingCart />
              </Link>
            </span>
            <Link to="/login">
              <button className="btn btn-primary">LogIn</button>
            </Link>

            <Link to="/register">
              <button className="btn btn-success ">Register</button>
            </Link>
          </form>
        </div>
      </nav>
    </>
  );
}

export default Nav;
