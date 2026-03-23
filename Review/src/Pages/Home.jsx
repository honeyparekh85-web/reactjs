
import { useState } from "react";
import Categories from "../Components/Categories";
import ProductSection from "../Components/ProductSection";

export default function Home({ setCart, cart }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
     
      <Categories setSelectedCategory={setSelectedCategory} />
      <ProductSection setCart={setCart} cart={cart} selectedCategory={selectedCategory} />
    </>
  );
}