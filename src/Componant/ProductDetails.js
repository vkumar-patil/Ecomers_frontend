import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Nav";
import axios from "axios";
import "./ProductDetails.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { addToCart } from "../useReducer/Slices/cart";
import { useDispatch } from "react-redux";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState(0); // State to store the current image index
  const dispach = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/Admin/${id}`
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

  return (
    <>
      <Navbar />
      {error && <div className="error-message">{error}</div>}
      {!error && product && (
        <div className="row">
          {/* Render Image */}
          <div className=" col-md-6">
            {imageUrl ? (
              <img
                className="product-image"
                src={imageUrl}
                alt={`Product Image ${imageIndex}`}
                style={{ height: "80vh", width: "100%", position: "relative" }}
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

          {/* Image Navigation Buttons */}

          {/* Render Product Details */}
          <div className=" col-md-4">
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>
              <i className="fa-solid fa-indian-rupee-sign"></i>
              {product.price}
            </span>
            <button onClick={() => dispach(addToCart(product))}>
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
