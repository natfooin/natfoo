import React from "react";
import HomeProductPage from "../../Components/HomeProductPage/HomeProductPage";
import "./AllProducts.css";
import json from "./../../prodcutsData.json";
import Button from "../../Components/ui/Button/Button";
import { Link } from "react-router-dom";

function AllProducts() {
  const categories = [...new Set(json.map((item) => item.category))];

  return (
    <>
      {categories.map((cat, index) => (
        <div className="top-homeProduct" key={index} id={`${cat}-products`}>
          <div className="above-container">
            <h1>{cat}</h1>
            <Link to={"/products"}>
              <Button cn={"button-n-one"} text={"view more >>"} />
            </Link>
          </div>

          <HomeProductPage categoryArray={[cat]} />
        </div>
      ))}
    </>
  );
}

export default AllProducts;
