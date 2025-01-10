import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Nav";
import axios from "axios";

function Product({ serchproduct }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/Admin/getProduct`
        );
        if (response.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = async (item) => {
    const productID = item._id;
    const userID = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    const quantity = 1;

    if (!userID || !token) {
      alert("Please login to add products to your cart.");
      navigate("/login"); // Navigate to login page
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8001/api/user/add-to-cart",
        { userID, productID, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message === "Product is already in the cart") {
        alert("Product is already in the cart.");
      } else {
        alert("Product added to the cart successfully.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {data.map((item) => {
            const img = item.Image
              ? item.Image.split(",").map(
                  (filename) => `http://localhost:8001/uploads/${filename}`
                )
              : [];
            return (
              <div className="col-md-6 col-lg-3 text-center" key={item._id}>
                <Link to={`/Product/${item._id}`}>
                  <img
                    className="card-img-top"
                    src={img[1]}
                    alt="Product"
                    style={{ height: "200px", objectFit: "cover" }}
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
                      Add to Cart
                    </button>
                    <button className="btn btn-success">Buy</button>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Product;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Product.css";

// import "react-toastify/dist/ReactToastify.css";
// import Navbar from "./Nav";
// import axios from "axios";
// function Product({ serchproduct }) {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fechdata = async () => {
//       const response = await axios.get(
//         `http://localhost:8001/api/Admin/getProduct`
//       );
//       if (response.data) {
//         setData(response.data.data);
//       }
//     };
//     fechdata();
//   }, []);

//   const handleAddToCart = async (item) => {
//     const productID = item._id;
//     console.log(productID);
//     const userID = localStorage.getItem("userid");
//     console.log(userID);
//     const token = localStorage.getItem("token");
//     console.log(token);
//     const quantity = 1;
//     if (!userID || !token) {
//       alert("please login to product add in cart");
//     }
//     const respons = await axios.post(
//       "http://localhost:8001/api/user/add-to-cart",
//       { userID, productID, quantity },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     console.log(respons.data);
//     if (respons.data.message === "Product is already in the cart") {
//       alert("product is alredy in cart");
//     } else {
//       alert("product is added in cart");
//     }
//   };
//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         <div className="row">
//           {data.map((item) => {
//             const img = item.Image
//               ? item.Image.split(",").map(
//                   (filenam) => `http://localhost:8001/uploads/${filenam}`
//                 )
//               : [];
//             return (
//               <>
//                 <div className="col-md-6 col-lg-3 text-center" key={item._id}>
//                   <Link to={`/Product/${item._id}`}>
//                     <img
//                       className="card-img-top"
//                       src={img[1]}
//                       alt="Card  cap"
//                     />
//                   </Link>
//                   <div className="card-body">
//                     <h5 className="card-title">{item.title}</h5>
//                     <p>
//                       <span className="price">
//                         <i className="fa-solid fa-indian-rupee-sign"></i>
//                         {item.price}
//                       </span>
//                       <span className="rating">
//                         <i className="fa-solid fa-star"></i>
//                       </span>
//                     </p>
//                     <p>
//                       <button
//                         className="btn btn-warning"
//                         onClick={() => handleAddToCart(item)}
//                       >
//                         Add Cart
//                       </button>
//                       <button className="btn btn-success">Buy</button>
//                     </p>
//                   </div>
//                 </div>
//               </>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }
// export default Product;
