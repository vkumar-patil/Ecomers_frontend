import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Nav";
import axios from "axios";
import "./ProductDetails.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaTag } from "react-icons/fa";

//import { CiStar } from "react-icons/ci";

//import { addToCart } from "../useReducer/Slices/cart";
//import { useDispatch } from "react-redux";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();
  // State to store the current image index
  //const dispach = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ecomers-backend-ed5p.onrender.com/api/Admin/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details.");
      }
    };
    fetchData();
  }, [id]);

  // Handle Next and Previous button clicks
  const handleNextImage = () => {
    if (product.Image && imageIndex < product.Image.length - 1) {
      setImageIndex(imageIndex + 1); // Increase index to show the next image
    }
  };

  const handlePreviousImage = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1); // Decrease index to show the previous image
    }
  };

  // Get the image URL for the current index
  const imageUrl =
    Array.isArray(product.Image) && product.Image.length > imageIndex
      ? product.Image[imageIndex]
      : null;

  const handleClick = async (product) => {
    console.log(product);
    const productID = product._id;
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userid");
    const quantity = 1;
    if (!userID || !token) {
      alert("Please login to add products to your cart.");
      navigate("/login"); // Navigate to login page
      return;
    }
    const respons = await axios.post(
      "https://ecomers-backend-ed5p.onrender.com/api/user/add-to-cart",
      { quantity, userID, productID },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (respons.data.message === "Product is already in the cart") {
      alert("Product is already in the cart.");
    } else {
      alert("Product added to the cart successfully.");
      navigate("/Cart");
    }
  };
  return (
    <>
      <Navbar />
      {error && <div className="error-message">{error}</div>}
      {!error && product && (
        <div className="row">
          {/* Render Image */}
          <div
            className=" col-md-4 "
            style={{ display: "flex", justifyContent: "center" }}
          >
            {imageUrl ? (
              <img
                className="product-image"
                src={imageUrl}
                alt={`Product  ${imageIndex}`}
                style={{
                  height: "70vh",

                  position: "relative",
                  borderRadius: "20px",
                }}
              />
            ) : (
              <p>No image available at this index.</p>
            )}
            <span
              className="arrowLeft"
              onClick={handlePreviousImage}
              disabled={imageIndex === 0} // Disable if on the first image
              style={{
                borderRadius: "20px",
                position: "absolute",
                left: "2%",
                top: "50%",
                fontSize: "50px",
                color: "red",
              }}
            >
              <FaArrowCircleLeft />
            </span>
            <span
              className="rightArrow"
              onClick={handleNextImage}
              disabled={
                product.Image && imageIndex === product.Image.length - 1
              } // Disable if on the last image
              style={{
                borderRadius: "20px",
                position: "absolute",
                right: "2%",
                top: "50%",
                fontSize: "50px",
                color: "red",
              }}
            >
              <FaArrowCircleRight />
            </span>
          </div>
          <div className=" col-md-6 mt-5" style={{ padding: "30px" }}>
            <h4>{product.title}</h4>
            <p className="mt-4" style={{ fontSize: "1.1rem" }}>
              {product.description}
            </p>
            <span style={{ fontSize: "1.4rem" }}>
              <i className="fa-solid fa-indian-rupee-sign"></i>
              {product.price}
            </span>
            <p className="mt-3">
              <span className="mr-2" style={{ color: "greenyellow" }}>
                <FaTag />
              </span>
              <span className="mr-2 " style={{ fontSize: "1.3rem" }}>
                Bank Offer
              </span>
              <span style={{ fontSize: "1.1rem" }}>
                5%Unlimited Cashback on Flipkart Axis Bank Credit Card
              </span>
            </p>
            <p>
              <span className="mr-2" style={{ color: "greenyellow" }}>
                <FaTag />
              </span>
              <span className="mr-2" style={{ fontSize: "1.3rem" }}>
                Bank Offer
              </span>
              <span style={{ fontSize: "1.1rem" }}>
                10% instant discount on SBI Credit Card EMI Transactions, up to
                ₹1,500
              </span>
            </p>
            <button
              className="btn btn-warning ml-4 mr-4"
              onClick={() => handleClick(product)}
              style={{ margin: "10px" }}
            >
              Add To Cart
            </button>
            <button className="btn btn-success">Buy</button>
            {/* <div style={{ backgroundColor: "yellow" }}>
              <h5 style={{ borderRadius: "10px", backgroundColor: "blue" }}>
                write A Review
              </h5>
              <form className="rating-container">
                <lable>
                  <input type="checkbox" name="rate" value={1} />

                  <span className="star" style={{ fontSize: "70px" }}>
                    <CiStar />
                  </span>
                </lable>
                <lable>
                  <input type="checkbox" name="rate" value={2} />
                </lable>
                <lable>
                  <input type="checkbox" name="rate" value={3} />
                </lable>
                <lable>
                  <input type="checkbox" name="rate" value={4} />
                </lable>
                <lable>
                  <input type="checkbox" name="rate" value={5} />
                </lable>
              </form>
            </div> */}
            {/* <div style={{ backgroundColor: "grey" }}>
              <h5 style={{ borderRadius: "10px", backgroundColor: "red" }}>
                Ratings & Reviews
              </h5>
            </div> */}
          </div>
          {/* <div className="row"></div> */}
        </div>
      )}
    </>
  );
};

export default ProductDetail;
