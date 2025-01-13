import axios from "axios";
import { useState } from "react";
import "./Adminfom.css";
function Admin() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  //const [rateing, setRate] = useState("");
  const [description, setDescription] = useState("");
  const [Image, setImages] = useState([]);
  const handleInputChange = (setter) => (e) => setter(e.target.value);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("price", price);
    //formData.append("rateing", rateing);
    formData.append("description", description);
    Image.forEach((Image) => {
      formData.append("Image", Image);
    });
    const userID = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.post(
        "http://localhost:8001/api/Admin/AddProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Replace 'token' with your actual token
          },
        }
      );
      console.log("Data submitted successfully:", response.data.data, response);
      alert("Data submitted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="inputTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="inputTitle"
              placeholder="Title"
              value={title}
              onChange={handleInputChange(setTitle)}
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputcategory">Category</label>
            <input
              type="text"
              className="form-control"
              id="inputcategory"
              placeholder="category"
              value={category}
              onChange={handleInputChange(setCategory)}
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputPrice">Price</label>
            <input
              type="text"
              className="form-control"
              id="inputPrice"
              placeholder="Price"
              value={price}
              onChange={handleInputChange(setPrice)}
            />
          </div>
          {/* <div className="form-group col-md-6">
            <label htmlFor="inputRate">Rate</label>
            <input
              type="text"
              className="form-control"
              id="inputRate"
              placeholder="Rate"
              value={rateing}
              onChange={handleInputChange(setRate)}
            />
          </div> */}
          <div className="form-group col-md-6">
            <label htmlFor="inputDescription">Description</label>
            <input
              type="text"
              className="form-control"
              id="inputDescription"
              placeholder="Apartment, studio, or floor"
              value={description}
              onChange={handleInputChange(setDescription)}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputImages">Images</label>
            <input
              type="file"
              className="form-control"
              id="inputImages"
              name="Image"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="form-row"></div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Admin;
