import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./Login.css";

function LogIn() {
  const [Input, setInput] = useState({ Email: "", Password: "" });

  const Navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("user"));
    if (
      Input.Email === userData.Email &&
      Input.Password === userData.Password
    ) {
      toast.success("login successful", { autoClose: 1000 });
      localStorage.setItem("Logdin", true);

      Navigate("/Productdetail");
    } else {
      toast.error("login fail", { autoClose: 1500 });
    }
  };

  return (
    <div className="Container" style={{ position: "relative" }}>
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "Highlight",
          width: "40%",
          textAlign: "center",
          position: "absolute",
          top: "30%",
          left: "30%",
          borderRadius: "20%",
        }}
      >
        <h3 classNameName="heading">Log In</h3>
        <h4 classNameName="lable">Email</h4>
        <input
          type="email"
          placeholder="email"
          id="email"
          name="Email"
          value={Input.Email}
          onChange={(e) =>
            setInput({ ...Input, [e.target.name]: e.target.value })
          }
        ></input>
        <br></br>
        <h4 classNameName="lable">Password</h4>
        <input
          type="password"
          placeholder="passward"
          id="passward"
          name="Password"
          value={Input.Password}
          onChange={(e) =>
            setInput({ ...Input, [e.target.name]: e.target.value })
          }
        ></input>
        <br></br>
        <input type="submit" id="submit" name="submit"></input>
      </form>
      <ToastContainer />
    </div>
  );
}
export default LogIn;
