import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./useReducer/Slices/cart";
import "./Cart.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="container CretMain">
      <div className="row">
        <div className="col-md-12">
          {cart.items.length === 0 ? (
            <div>
              <h1>Your Cart is Empty</h1>
              <Link to="/" className="btn btn-warning">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="col-md-4 cartFinel">
              <p>Product Count: {cart.items.length}</p>
              <p>
                Total Price: ₹
                {cart.totalPrice && !isNaN(cart.totalPrice)
                  ? cart.totalPrice.toFixed(2)
                  : "0.00"}
              </p>
              <button className="btn btn-warning">Check Out</button>
              <button
                className="btn btn-info"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        <div className="col-md-12">
          {cart.items.map((item) => {
            // Split the Image string and take the first image URL
            const firstImage = item.Image
              ? `http://localhost:8001/uploads/${item.Image.split(
                  ","
                )[1].trim()}` // Ensure proper URL format
              : null;
            console.log(firstImage);
            return (
              <div
                className="card mb-12"
                style={{ width: "600px" }}
                key={item._id}
              >
                <div className="row no-gutters">
                  <div className="col-md-4">
                    {firstImage && (
                      <img
                        src={firstImage}
                        alt={item.title}
                        style={{ height: "150px", width: "100%" }}
                      />
                    )}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text">
                        <span className="price">₹{item.price}</span>
                      </p>
                      <button className="btn btn-success">Buy</button>
                      <button
                        className="btn btn-danger"
                        onClick={() => dispatch(removeFromCart(item.id))}
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
  );
};

export default Cart;
