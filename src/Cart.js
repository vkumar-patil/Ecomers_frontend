import { Link } from "react-router-dom";
import "./Cart.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Componant/Nav";
const Cart = () => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("User is not logged in.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8001/api/user/get-cart",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const cartData = response.data?.data;
      setCart(cartData?.items || []);
    } catch (error) {
      if (error.response?.status === 401) {
        console.error("Unauthorized: Please log in again.");
        localStorage.removeItem("token");
      } else {
        console.error(
          "Error fetching cart:",
          error.response?.data || error.message
        );
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityCheng = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      console.warn("Quantity must be greater than 0");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8001/api/user/update-cart/${productId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart(); // Refresh cart data after successful update
    } catch (error) {
      console.error(
        "Error updating quantity:",
        error.response?.data || error.message
      );
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:8001/api/user/Clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart([]);
    } catch (error) {
      console.error(
        "Error clearing cart:",
        error.response?.data || error.message
      );
    }
  };

  const deleteCartItem = async (productId) => {
    console.log("Deleting product:", productId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8001/api/user/delete-cart-item/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Delete response:", response.data);
      fetchCart();
    } catch (error) {
      console.error(
        "Error deleting item:",
        error.response?.data || error.message
      );
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.productID.price * item.quantity,
      0
    );
  };

  return (
    <>
      <Nav />
      <div className="container CretMain">
        <div className="row">
          <div className="col-md-12">
            {cart.length === 0 ? (
              <div>
                <h1>Your Cart is Empty</h1>
                <Link to="/" className="btn btn-warning">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="col-md-4 cartFinel">
                <p>Product Count: {cart.length}</p>
                <p>Total Price: ₹{calculateTotalPrice()}</p>
                <button className="btn btn-warning">Check Out</button>
                <button className="btn btn-info" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            )}
          </div>

          <div className="col-md-12">
            {cart.map((item, index) => {
              const firstImage =
                Array.isArray(item.productID.Image) && item.productID.Image[0]
                  ? `http://localhost:8001/uploads/${item.productID.Image[0].trim()}`
                  : null;

              return (
                <div
                  className="card mb-12"
                  style={{ width: "600px" }}
                  key={`${item.productID._id}-${index}`}
                >
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      {firstImage && (
                        <Link to={`/Product/${item.productID._id}`}>
                          <img
                            src={firstImage}
                            alt={item.productID.title}
                            style={{ height: "150px", width: "100%" }}
                          />
                        </Link>
                      )}
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.productID.title}</h5>
                        <p className="card-text">
                          {item.productID.description}
                        </p>
                        <p className="card-text">
                          <span className="price">₹{item.productID.price}</span>
                        </p>
                        <button
                          onClick={() =>
                            handleQuantityCheng(
                              item.productID._id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          onClick={() =>
                            handleQuantityCheng(
                              item.productID._id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                        <button className="btn btn-success">Buy</button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteCartItem(item.productID._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
