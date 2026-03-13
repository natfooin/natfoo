import React, { useEffect, useState } from "react";
import productsJson from "./../../prodcutsData.json";
import "./HomeProductPage.css";
import Products from "../Products/Products";
import Button from "./../ui/Button/Button"
function HomeProductPage({ categoryArray }) {

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setAllProducts(productsJson);
    filterGroup(productsJson);
  }, []);

  const filterGroup = (data) => {

    const categories = categoryArray;

    const filtered = data.filter(product =>
      categories.includes(product.category)
    );

    setProducts(filtered);
  };

  return (
    <div>
      <div className="product-container">
        {products.slice(0,4).map((product) => (
          <div key={product.id} className="product-card">
            <Products
              image={product.image}
              price={product.price}
              name={product.name}
            />
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default HomeProductPage;