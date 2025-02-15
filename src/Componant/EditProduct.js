import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    Image: null,
  });

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://ecomers-backend-ed5p.onrender.com/api/Admin/${id}`
        );
        const product = response.data;
        console.log(product);
        setFormData({
          title: product.title || "",
          price: product.price || "",
          description: product.description || "",
          Image: null, // Reset file input
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to fetch product details.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, Image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    if (formData.Image) {
      formDataToSend.append("Image", formData.Image);
    }

    try {
      const response = await axios.put(
        `https://ecomers-backend-ed5p.onrender.com/api/Admin/update-product/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message || "Product updated successfully.");
      navigate("/AdminHomepage"); // Redirect to Admin homepage
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <>
    <Nav/>
    <div className="container">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            className="form-control"
            name="Image"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
    </>
  );
}

export default EditProduct;
