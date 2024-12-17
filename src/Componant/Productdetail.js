import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { addToCart } from "../useReducer/Slices/cart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
// cart, setCart,send from prop

function Product({ serchproduct }) {
  const cart = useSelector((state) => console.log(state.carts));

  const dispatch = useDispatch();
  // const addToCart = (id, price, title, description, image) => {
  //   const obj = { id, price, title, description, image };
  //   if (cart.find((ele) => ele.id === id)) {
  //     alert(`${title} Alredy aded in cart`);
  //   } else {
  //     setCart([...cart, obj]);
  //     console.log(cart);
  //     window.confirm("Product Add To Cart");
  //   }
  // };
  const [data, setData] = useState([]);
  const filteredProducts = data.filter((product) => {
    //console.log(product.title);
    return (
      product.title &&
      String(product.title).toLowerCase().includes(serchproduct.toLowerCase())
    );
  });
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products?limit=20`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        //console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {data.map((item) => {
            const { id, image, title, price } = item;

            return (
              <>
                <div className="col-md-6 col-lg-3 text-center" key={id}>
                  <Link to={`/Product/${id}`}>
                    <img className="card-img-top" src={image} alt="Card  cap" />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p>
                      <span className="price">
                        <i className="fa-solid fa-indian-rupee-sign"></i>
                        {price}
                      </span>
                      <span className="rating">
                        <i className="fa-solid fa-star"></i>
                      </span>
                    </p>
                    <p>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          dispatch(addToCart(item));
                        }}
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
