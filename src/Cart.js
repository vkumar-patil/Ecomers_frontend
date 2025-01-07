import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { removeFromCart, clearCart, addToCart } from "./useReducer/Slices/cart";
import "./Cart.css";
//import axios from "axios";
import { useEffect } from "react";
import { fechdata } from "./Componant/redux/cartAction";
const Cart = () => {
  //const [cart, setCart] = useState([]);
  const { product, isLoding, error } = useSelector((state) => state);
  console.log(product);
  const cart = product;
  console.log(cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fechdata());
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       console.warn("User is not logged in.");
  //       return; // Exit if no token
  //     }

  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8001/api/user/get-cart",
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       const cartData = response.data?.data; // Adjust based on actual API response
  //       if (cartData?.items) {
  //         console.log("Cart data:", cartData);
  //         setCart(cartData.items);
  //         // dispatch(addToCart(cartData.items));
  //         //cartData.items.forEach((item) => dispatch(addToCart(item)));
  //       } else {
  //         console.warn("No items found in the cart.");
  //       }
  //     } catch (error) {
  //       if (error.response?.status === 401) {
  //         console.error("Unauthorized: Please log in again.");
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("userid");
  //         // Optionally redirect to login page
  //       } else {
  //         console.error(
  //           "Error fetching cart:",
  //           error.response?.data || error.message
  //         );
  //       }
  //     }
  //   };

  //   fetchCart();
  // }, [setCart]); // Empty dependency array, runs once on mount

  return (
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
              <p>
                Total Price: ₹
                {product.totalPrice && !isNaN(product.totalPrice)
                  ? product.totalPrice.toFixed(2)
                  : "0.00"}
              </p>
              <button className="btn btn-warning">Check Out</button>
              <button
                className="btn btn-info"
                //onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        <div className="col-md-12">
          {cart.map((item) => {
            console.log(item.productID.Image);
            // Split the Image string and take the first image URL
            const firstImage = item.productID.Image
              ? `http://localhost:8001/uploads/${item.productID.Image[1] //) //  "," // split(
                  .trim()}` // Ensure proper URL format
              : null;
            console.log(firstImage);

            return (
              <div
                className="card mb-12"
                style={{ width: "600px" }}
                key={item.productID._id}
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
                      <p className="card-text">{item.productID.description}</p>
                      <p className="card-text">
                        <span className="price">₹{item.productID.price}</span>
                      </p>
                      <button className="btn btn-success">Buy</button>
                      <button
                        className="btn btn-danger"
                        // onClick={() => dispatch(removeFromCart(item._id))}
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
