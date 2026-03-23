import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Reviews from "./Pages/Reviews";
import Footer from "./Footer";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Navbar cart={cart} />

      <Routes>
        <Route path="/" element={<Home setCart={setCart} cart={cart} />} />
        <Route path="/product/:id" element={<ProductDetails setCart={setCart} cart={cart} />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;