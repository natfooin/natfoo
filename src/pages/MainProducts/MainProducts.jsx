import React, { useState, useEffect } from "react";
import "./MainProducts.css";
import Badge from "../../Components/ui/Badge/Badge";
import Input from "../../Components/ui/Input/Input";
import Button from "../../Components/ui/Button/Button";
import Products from "../../Components/Products/Products";
import ProductJson from "./../../prodcutsData.json";

const CATEGORIES = [
  "All",
  ...new Set(ProductJson.map((item) => item.category)),
];

function MainProducts() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = ProductJson.filter((product) => {
    const searchVal = searchTerm.toLowerCase();

    const matchesName = (product.name || "").toLowerCase().includes(searchVal);

    const matchesCategorySearch = (product.category || "")
      .toLowerCase()
      .includes(searchVal);

    const matchesSearch = matchesName || matchesCategorySearch;

    const matchesBadge =
      activeCategory === "All" || product.category === activeCategory;

    return matchesSearch && matchesBadge;
  });
  useEffect(() => {
    document.title = "Products";
  }, []);
  return (
    <div className="main-products-wrapper">
      <div className="search-section">
        <div className="input">
          <Input
            placeholder="Search by name or category..."
            value={inputValue}
            onChangeHandler={(e) => {
              const value = e.target.value;
              setInputValue(value);
              setSearchTerm(value);
            }}
          />
        </div>

        <Button
          text="Search"
          styles={{
            borderRadius: "0 10px 10px 0",
            borderLeft: "none",
            height:"44px",
            float:"left"
          }}
          onClick={() => setSearchTerm(inputValue)}
        />
      </div>

      <div className="filter-badges">
        {CATEGORIES.map((cat, index) => (
          <Badge
            key={index}
            text={cat}
            click={() => setActiveCategory(cat)}
            color={activeCategory === cat ? "#ffffff" : "#926f52"}
            bgColor={activeCategory === cat ? "#926f52" : "#f1f5f9"}
            styles={{
              height: "2rem",
              width: "10rem",
              fontSize: "1rem",
              whiteSpace: "nowrap",
              fontWeight: "800",
            }}
          />
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Products
              key={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <div className="empty-results">
            <h3>No results found</h3>
            <p>
              We couldn't find any product matching "
              <strong style={{ color: "red" }}>{searchTerm}</strong>"
            </p>

            <Button
              text="Clear the applied filter"
              className="clear-btn"
              onClick={() => {
                setSearchTerm("");
                setInputValue("");
                setActiveCategory("All");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainProducts;
