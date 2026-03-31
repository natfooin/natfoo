import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productsData from "./../prodcutsData.json";
import Badge from "../Components/ui/Badge/Badge";
import "./SingleProduct.css";
import { TiTick } from "react-icons/ti";
import { FaRupeeSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DetailCard from "../Components/DetailCard/DetailCard";
import DiscountToolTip from "../Components/DiscountToolTip/DiscountToolTip";
import slabs from "../DiscountSlabs.json";
// import { toast } from "react-toastify";

const SingleProduct = ({ setCartPrice, setCartQuantity, setCartProducts }) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  const navi = useNavigate();

  useEffect(() => {
    const product = productsData.find((product) => product.id === parseInt(id));

    setProductData(product || null);
    setQuantity(1);

    if (product && product["similar-products"]) {
      const similar = productsData.filter((p) =>
        product["similar-products"].includes(p.id),
      );
      setSimilarProducts(similar);
    } else {
      setSimilarProducts([]);
    }
  }, [id]);

  const subQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!productData) return;

    setCartProducts((prev) => {
      const existingProductIndex = prev.findIndex(
        (item) => item.id === productData.id,
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...prev];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity: updatedProducts[existingProductIndex].quantity + quantity,
        };
        return updatedProducts;
      } else {
        return [
          ...prev,
          { ...productData, quantity, uid: crypto.randomUUID() },
        ];
      }
    });

    setCartQuantity((prev) => prev + quantity);
    setCartPrice((prev) => prev + productData.price * quantity);

    setQuantity(1);
    navi(-1);
    // toast(`${productData.name} added to cart!`, {type:"success"}, {position:"bottom-right"});
  };

  useEffect(() => {
    if (productData?.name) {
      document.title = productData.name;
    }
  }, [productData]);

  if (!productData) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

  return (
    <div className="single-product-page-container">
      <div className="product-wrapper">
        {/* IMAGE */}
        <div className="product-display">
            <img
              src={productData.image}
              alt={productData.name}
              loading="       "
              
            />
          {productData["similar-products"] && (
            <div className="similar-products-container">
              <h3>What you find inside</h3>

              <div className="similar-product-item">
                <img
                  src={productData["similar-products"][0]}
                  alt={productData["similar-products"][1]}
                />
                <span>{productData["similar-products"][1]}</span>
              </div>
            </div>
          )}
          {/* Can be used for future purpose */}
          {/* {similarProducts.length > 0 && (
            <div className="similar-products-container">
              {similarProducts.map((item) => (
                <Link
                  to={`/product/${item.id}`}
                  key={item.id}
                  className="similar-product-item"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    
                  />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )} */}
        </div>

        {/* DETAILS */}
        <div className="product-details">
          <h1 className="product-head">{productData.name}</h1>

          <p className="product-catch">
            <TiTick color="lightgreen" /> Healthy • Tasty • Natural
          </p>

          <hr style={{ border: "1px solid gold" }} />
          <p className="product-desc">
            {productData.desc1 || productData.desc}
          </p>

          {productData.desc2 && (
            <p className="product-desc">{productData.desc2}</p>
          )}
          {productData.desc3 && (
            <p className="product-desc">{productData.desc3}</p>
          )}
          <div>
            <Badge
              text={productData.category}
              styles={{ scale: "1.5", margin: "1rem 0" }}
            />
          </div>

          {/* PRICE */}
          <span>
            <h3 className="price">
              <FaRupeeSign size={22} />
              {productData.price}
            </h3>

            <h3 className="discount-amount">
              <DiscountToolTip
                label="View Discounts"
                styles={{ color: "white" }}
                slabs={slabs}
              />
            </h3>
          </span>

          {/* QUANTITY */}
          <div className="quatity-setter">
            <button onClick={subQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={addQuantity}>+</button>
          </div>

          {/* ADD TO CART */}
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* PRODUCT INFO */}
      {productData.content && (
        <>
          <h2 className="product-info-title">Product Information</h2>

          <div className="details-section">
            {Array.isArray(productData?.content) && (
              <>
                {productData?.content[0] && (
                  <DetailCard
                    header="Why choose this Product?"
                    content={productData.content[0]}
                  />
                )}

                {productData?.content[1] && (
                  <DetailCard
                    header="Easy to Cook"
                    content={productData.content[1]}
                  />
                )}
              </>
            )}

            {!Array.isArray(productData.content) && (
              <>
                {productData.content.whyNatfoo && (
                  <DetailCard
                    header="Why Choose This Product?"
                    content={productData.content.whyNatfoo}
                  />
                )}

                {productData.content.cookingDirection && (
                  <DetailCard
                    header="Easy to Cook"
                    content={productData.content.cookingDirection}
                  />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SingleProduct;
