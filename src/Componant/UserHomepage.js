import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
//import { addToCart } from "../useReducer/Slices/cart";
//import { useDispatch } from "react-redux";
//import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Nav";
import axios from "axios";
function Product({ serchproduct }) {
  //const cart = useSelector((state) => state.cart);
  //const dispatch = useDispatch();

  const [data, setData] = useState([]);
  // const filteredProducts = data.filter((product) => {
  //   if (product && product.name && typeof product.name === "string") {
  //     return product.name.toLowerCase().includes(serchproduct.toLowerCase());
  //   }
  //   return false; // Return false if the product name is not valid
  // });

  useEffect(() => {
    const fechdata = async () => {
      const response = await axios.get(
        `http://localhost:8001/api/Admin/getProduct`
      );
      if (response.data) {
        setData(response.data.data);
      }
    };
    fechdata();
  }, []);

  const handleAddToCart = async (item) => {
    const productID = item._id;
    console.log(productID);
    const userID = localStorage.getItem("userid");
    console.log(userID);
    const token = localStorage.getItem("token");
    console.log(token);
    const quantity = 1;
    if (!userID || !token) {
      alert("please login to product add in cart");
    }
    const respons = await axios.post(
      "http://localhost:8001/api/user/add-to-cart",
      { userID, productID, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (respons.data)
      //dispatch(addToCart(item));
      console.log(respons.data);
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {data.map((item) => {
            const img = item.Image
              ? item.Image.split(",").map(
                  (filenam) => `http://localhost:8001/uploads/${filenam}`
                )
              : [];
            return (
              <>
                <div className="col-md-6 col-lg-3 text-center" key={item._id}>
                  <Link to={`/Product/${item._id}`}>
                    <img
                      className="card-img-top"
                      src={img[1]}
                      alt="Card  cap"
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
                        Add Cart
                      </button>
                      <button className="btn btn-success">Buy</button>
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Product;
