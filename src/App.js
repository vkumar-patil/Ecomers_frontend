import "./App.css";
import Login from "./Componant/LogIn ";
import Register from "./Componant/Register";
import { Route, Routes } from "react-router-dom";
import UserHomepage from "./Componant/UserHomepage";
import Cart from "./Cart";
import ProductDetails from "./Componant/ProductDetails";
//import { useState } from "react";
import AdminHomepage from "./Componant/AdminHomepage";
import Adminfom from "./Componant/Adminfom";
import Nav from "./Componant/Nav";
//import ProtectedRoute from "./Componant/ProtectRout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route
          path="/AdminHomepage"
          element={
            //<ProtectedRoute allowedRoles={[true]}>
            <AdminHomepage />
            // </ProtectedRoute>
          }
        ></Route>
        <Route path="/Adminfom" element={<Adminfom />}></Route>
        <Route path="/Product/:id" element={<ProductDetails />}></Route>
        <Route
          path="/"
          element={
            //<ProtectedRoute allowedRoles={[false]}>
            <UserHomepage />
            //</ProtectedRoute>
          }
        ></Route>
        <Route path="/UserHomepage" element={<UserHomepage />}></Route>
        <Route path="/Nav" element={<Nav />}></Route>
      </Routes>
    </>
  );
}

export default App;
