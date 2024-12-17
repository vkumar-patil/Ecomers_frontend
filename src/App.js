import "./App.css";
import Login from "./Componant/LogIn ";
import Register from "./Componant/Register";
import { Route, Routes } from "react-router-dom";
import Productdetail from "./Componant/Productdetail";
import Cart from "./Cart";
import FechProduct from "./Componant/FechProduct";
//import SerchItem from "./Componant/SerchItem";
import Nav from "./Componant/Nav";
import { useState } from "react";
function App() {
  const [cart, setCart] = useState([]);
  const [serchproduct, setSerchproduct] = useState("");
 // const cart = useSelector((state) => console.log(state.carts));
  return (
    <>
      <Nav
        serchproduct={serchproduct}
        setSerchproduct={setSerchproduct}
        cart={cart}
      />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route
          path="/Product/:id"
          element={<FechProduct cart={cart} setCart={setCart} />}
        ></Route>
        <Route
          path="/"
          element={
            <Productdetail
              serchproduct={serchproduct}
              cart={cart}
              setCart={setCart}
            />
          }
        ></Route>

        <Route path="/Productdetail" element={<Productdetail />}></Route>
      </Routes>
    </>
  );
}

export default App;
