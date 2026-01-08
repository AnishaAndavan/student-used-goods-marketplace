import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import MyProducts from "./pages/MyProducts";
import "./styles/main.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn} onLogout={logout} />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
