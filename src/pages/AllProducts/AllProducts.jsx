import React from "react";
import HomeProductPage from "../../Components/HomeProductPage/HomeProductPage";
import "./AllProducts.css";
import json from "./../../prodcutsData.json";
import Button from "../../Components/ui/Button/Button";

function AllProducts() {

  const categories = [...new Set(json.map((item) => item.category))];

  return (
    <>
      {categories.map((cat, index) => (
        <div className="top-homeProduct" key={index}>
          <div className="above-container">
            <h1>{cat}</h1>
            <Button cn={"button-n-one"} text={"view more >>"} />
          </div>

          <HomeProductPage categoryArray={[cat]} />
        </div>
      ))}
    </>
  );
}

export default AllProducts;