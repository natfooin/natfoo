import React from "react";
import HomeProductPage from "../../Components/HomeProductPage/HomeProductPage";
import "./AllProducts.css";
import json from "./../../prodcutsData.json";
import Button from "../../Components/ui/Button/Button";
import { Link } from "react-router-dom";

function AllProducts({setActiveCategory}) {
  const categories = [...new Set(json.map((item) => item.category))];

  return (
    <div  className="hello">
      {categories.map((cat, index) => (
        <div className="top-homeProduct" key={index} id={`${cat}-products`}>
          <div className="above-container">
            <h1>{cat !== "Health Mix" ? `Millet ${cat}` : `Sprouted ${cat}`}</h1>
            <Link to={"/products"} onClick={() => setActiveCategory(cat)}>
              <Button cn={"button-n-one"} text={"View more >>"} />
            </Link>
          </div>

          <HomeProductPage categoryArray={[cat]} />
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
