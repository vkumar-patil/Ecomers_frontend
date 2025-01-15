import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { useEffect } from "react";
import axios from "axios";
function AdminHomepage() {
  const [data, setData] = useState([]);
  const fechdata = async () => {
    const response = await axios.get(
      "http://localhost:8001/api/Admin/getProduct"
    );
    if (response.data) {
      setData(response.data.data);
      console.log(response.data.data);
    }
  };
  useEffect(() => {
    fechdata();
  }, []);
  const handleDelete = async (productID) => {
    console.log(productID);
    try {
      const token = localStorage.getItem("token");
      const deleteItem = await axios.delete(
        `http://localhost:8001/api/Admin/delete-item/${productID}`,
        {
          headers: { Authorization: `Bearer${token}` },
        }
      );
      console.log(deleteItem.data);
      fechdata();

      if (deleteItem.data) {
        alert("product deleted Successfully");
      }
    } catch (error) {}
  };
  return (
    <>
      <Nav />
      <div className="container">
        <div>
          <div
            className="col-md-12"
            style={{ margin: "20px", backgroundColor: "gray" }}
          >
            <Link to={"/Adminfom"}>
              <button className="col-md-12 ">Uplode Product</button>
            </Link>
          </div>
          <div className="col-md-12" style={{ margin: "20px" }}>
            <h4>Edit & Delete Product </h4>
            <div>
              <div className="container">
                <div className="row">
                  {data.map((item) => {
                    const img = item.Image
                      ? item.Image.split(",").map(
                          (filename) =>
                            `http://localhost:8001/uploads/${filename}`
                        )
                      : [];
                    return (
                      <div
                        className="col-md-6 col-lg-3 text-center"
                        key={item._id}
                      >
                        <img
                          className="card-img-top"
                          src={img[1]}
                          alt="Product"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
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
                            <Link to={`/EditProduct/${item._id}`}>
                              <button className="btn btn-warning">
                                Edit Product
                              </button>
                            </Link>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHomepage;
