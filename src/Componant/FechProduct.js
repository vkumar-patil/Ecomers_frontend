import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Items } from "./Datas";
import "./Fechdata.css";

const FechProduct = ({ cart, setCart }) => {
  const addToCart = (id, price, title, description, image) => {
    const obj = { id, price, title, description, image };
    if (cart.find((ele) => ele.id === id)) {
      alert(`${title} Alredy added in cart`);
    } else {
      setCart([...cart, obj]);
      alert("product added in cart");
    }
  };

  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const filterProduct = Items.filter((product) => product.id == id);
    setProduct(filterProduct[0]);
  }, [id]);

  return (
    <>
      {product && (
        <div className="container fechcontainer" style={{ display: "flex" }}>
          <div className="img">
            <img className="card-img-top" src={product.image} alt="Card cap" />
          </div>
          <div className="detaildata">
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>
              <i className="fa-solid fa-indian-rupee-sign"></i>
              {product.price}
            </span>

            <p>
              <button
                className="btn btn-warning"
                onClick={() =>
                  addToCart(
                    product.id,
                    product.price,
                    product.title,
                    product.description,
                    product.image
                  )
                }
              >
                Add to Cart
              </button>
              <button className="btn btn-success">Buy</button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FechProduct;
