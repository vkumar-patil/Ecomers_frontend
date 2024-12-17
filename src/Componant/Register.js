import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Registerpage() {
  const [Input, setInput] = useState({ name: "", Email: "", Password: "" });
  const Navigate = useNavigate();
  // const [Password, setPassword] = useState("");
  // const [Number, setNumber] = useState("");
  // const [Name, setName] = useState("");
  // useEffect(() => {
  //   // Serialize the email value and store it in localStorage
  //   localStorage.setItem("userEmail", JSON.stringify(Email));
  // }, [Email]);
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(Input));
    Navigate("/login");
  };
  // Process your form data (e.g., submit to server, etc.)
  console.log("Form submitted!");
  // Clear the input fields after submission

  return (
    <div>
      <form className="Rform" onSubmit={handleSubmit}>
        <h2 className="heading">Register</h2>
        <h4 className="lable">Name</h4>
        <input
          type="text"
          placeholder="Name"
          id="Name"
          name="name"
          className="Rinput"
          value={Input.name}
          onChange={(e) =>
            setInput({ ...Input, [e.target.name]: e.target.value })
          }
        ></input>

        <h4 className="lable">Number</h4>
        <input
          type="number"
          placeholder="Number"
          id="Number"
          name="Number"
          className="Rinput"
          value={Input.Number}
          onChange={(e) =>
            setInput({ ...Input, [e.target.name]: e.target.value })
          }
        ></input>
        <h4 className="lable">Email</h4>
        <input
          type="email"
          placeholder="email"
          id="email"
          name="Email"
          value={Input.Email}
          className="Rinput"
          onChange={(e) =>
            setInput({ ...Input, [e.target.name]: e.target.value })
          }
        ></input>

        <br />
        <h4 className="lable">Password</h4>
        <input
          type="password"
          placeholder="passward"
          id="passward"
          name="Password"
          className="Rinput"
          value={Input.Password}
          onChange={(e) =>
            setInput({ ...Input, [e.target.name]: e.target.value })
          }
        ></input>
        <br></br>
        <button type="submit" id="submit">
          submit
        </button>
      </form>
    </div>
  );
}
export default Registerpage;
