import "./App.css";
import Login from "./Componant/LogIn ";
import Register from "./Componant/Register";
import { Route, Routes } from "react-router-dom";
import UserHomepage from "./Componant/UserHomepage";
import Cart from "./Cart";
import ProductDetails from "./Componant/ProductDetails";
//import SerchItem from "./Componant/SerchItem";
import { useState } from "react";
import AdminHomepage from "./Componant/AdminHomepage";
import Adminfom from "./Componant/Adminfom"
function App() {
  const [cart, setCart] = useState([]);
  const [serchproduct, setSerchproduct] = useState("");
  // const cart = useSelector((state) => console.log(state.carts));
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/AdminHomepage" element={<AdminHomepage />}></Route>
        <Route path="/Adminfom" element={<Adminfom />}></Route>
        <Route
          path="/Product/:id"
          element={<ProductDetails cart={cart} setCart={setCart} />}
        ></Route>
        <Route
          path="/"
          element={
            <UserHomepage
              serchproduct={serchproduct}
              cart={cart}
              setCart={setCart}
            />
          }
        ></Route>

        <Route path="/UserHomepage" element={<UserHomepage />}></Route>
      </Routes>
    </>
  );
}

export default App;
