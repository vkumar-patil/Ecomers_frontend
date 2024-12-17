import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromcart } from "./carts";
import "./Cart.css";

const Cart = () => {
  const [Productprice, setProductprice] = useState(0);
  const cart = useSelector((state) => state.cart || { items: [] });

  const Items = useMemo(() => cart.items || [], [cart.items]); // Fallback if items is undefined
  const dispatch = useDispatch();
  console.log(cart.items);

  useEffect(() => {
    const totalprice = () => {
      let total = 0;
      Items.forEach((element) => {
        total += element.totalprice; // Use totalprice
      });
      setProductprice(total.toFixed(2));
    };
    totalprice();
  }, []);

  const removeHandler = (id) => {
    dispatch(removeFromcart(id));
  };

  return (
    <>
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
              <div className="col col-md-4 cartFinel">
                <p>Product Count: {Items.length}</p>
                <p>
                  Total Price: <i className="fa-solid fa-indian-rupee-sign"></i>
                  {Productprice}
                </p>
                <button className="btn btn-warning">Check Out</button>
              </div>
            )}
          </div>

          {Items.map((product) => (
            <div
              className="card mb-12"
              style={{ width: "600px" }}
              key={product.id}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={product.image}
                    alt="/"
                    style={{ height: "150px" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        <span className="price">
                          <i className="fa-solid fa-indian-rupee-sign"></i>
                          {product.price}
                        </span>
                        <button className="btn btn-success">Buy</button>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeHandler(product.id)}
                        >
                          Delete
                        </button>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./Cart.css";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromcart } from "./carts";
// const Cart = () => {
//   // { cart, setCart }-this is receivd from prop
//   const [Productprice, setProductprice] = useState(0);
//   const cart = useSelector((state) => state.cart);
//   const items = cart.items || [];

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const totalprice = () => {
//       let total = 0;
//       items.forEach((element) => {
//         total += element.price;
//       });
//       setProductprice(total.toFixed(2));
//     };
//     totalprice();
//   }, [items]);
//   // const handelDelete = (id) => {
//   //   const updatecard = cart.filter((element) => element.id !== id);
//   //   setCart(updatecard);
//   // };
//   // const handelClear = () => {
//   //   setCart([]);
//   // };

//   const removeHandler = (id) => {
//     dispatch(removeFromcart(id));
//   };

//   return (
//     <>
//       <div className="container CretMain">
//         <div className="row">
//           <div className="col-md-12">
//             {items.length === 0 ? (
//               <div>
//                 <h1>Your Cart is Emty</h1>
//                 <Link to={"/"} className="btn btn-warning">
//                   Continue Showping
//                 </Link>
//               </div>
//             ) : (
//               <div className="col col-md-4  cartFinel">
//                 <p>Product Count : {cart.items.length}</p>
//                 {/* <p>
//                   Product Count:{" "}
//                   {cart.reduce((acc, item) => acc + item.quantity, 0)}
//                 </p>{" "} */}
//                 {/* Display total quantity */}
//                 <p>
//                   Total Price:<i className="fa-solid fa-indian-rupee-sign"></i>
//                   {Productprice}
//                 </p>
//                 <button className="btn btn-warning">Check Out</button>
//                 {/* <button
//                   onClick={() => handelClear()}
//                   className="btn btn-warning"
//                 >
//                   Clear Cart
//                 </button> */}
//               </div>
//             )}
//           </div>

//           {items.map((product) => {
//             console.log(product);
//             return (
//               <>
//                 <div className="card mb-12" style={{ width: "600px" }}>
//                   <div className="row no-gutters">
//                     <div className="col-md-4">
//                       <img
//                         src={product.image}
//                         alt="/"
//                         style={{ height: "150px" }}
//                       />
//                     </div>
//                     <div className="col-md-8">
//                       <div className="card-body">
//                         <h5 className="card-title">{product.title}</h5>
//                         <p className="card-text">{product.discription}</p>
//                         <p className="card-text">
//                           <small className="text-muted">
//                             <span className="price">
//                               <i className="fa-solid fa-indian-rupee-sign"></i>
//                               {product.price}
//                             </span>
//                             <button className="btn btn-success">Buy</button>
//                             <button
//                               className="btn btn-danger"
//                               onClick={removeHandler}
//                             >
//                               Delete
//                             </button>
//                             {/* <button
//                               className="btn btn-danger"
//                               onClick={() => handelDelete(product.id)}
//                             >
//                               Delete
//                             </button> */}
//                             {/* <button
//                               onClick={() => handleDecreement(product.id)}
//                             >
//                               -
//                             </button>
//                             {product.quantity}
//                             <button onClick={() => handleIncrement(product.id)}>
//                               +
//                             </button> */}
//                           </small>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cart;
