import React, { useState, useEffect } from "react";
import "./CartProduct.css";
import Badge from "../ui/Badge/Badge";
import { BiTrash } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { PiPlus } from "react-icons/pi";
import { GrSubtract } from "react-icons/gr";
const CartProduct = ({
  product = {
    category: "Cookies",
    desc: "awidbawiudbawi dbawiud bawiud biubiuwuid waiu wu ice cahef saeiuc iuab iae bhab ckiha vyiasd viads bviasdb ihads bbads asdbuchis duba eoiuabui fiaeuyb haeb iuae bfiaeh faesf yiabseuiy bsaefbseai efaibeih fbahe",
    id: 1,
    image: "/src/assets/product-images/Ajwain-Mellow.jpg",
    name: "Ajwain Mellow",
    price: 1230,
    quantity: 1,
  },
  setCartProducts,
  setCartQuantity,
}) => {
  console.log(product);
  const [productQuantity, setProductQuantity] = useState(0);
  useEffect(() => {
    setProductQuantity(product.quantity);
  }, [product]);

  const subCartProductQuantity = () => {
    if (productQuantity > 1) {
      setCartQuantity((prev) => prev - 1);
      setProductQuantity((prev) => prev - 1);
    }
  };
  const addCartProductQuantity = () => {
    setCartQuantity((prev) => prev + 1);
    setProductQuantity((prev) => prev + 1);
  };
  const removeFromCart = (IDToRemove) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.id != IDToRemove),
    );
    setCartQuantity((prev) => prev - productQuantity);
  };
  return (
    <div className="cart-product-container">
      <div className="cart-product-details">
        <div className="cart-product-image">
          <img src={product?.image} alt={product?.name} />
        </div>
        <div className="cart-product-mini-content">
          <div>
            <h2>{product?.name}</h2>
            <p>{product?.desc}</p>
            <Badge text={product?.category} />
          </div>
          <button
            className="removeItem"
            onClick={() => removeFromCart(product?.id)}
          >
            <BiTrash color="gray" />
          </button>
        </div>
      </div>
      <div className="cart-product-pricing">
        <h2>
          <FaRupeeSign size={window.innerWidth > 1280 ? 20 : 10} />
          {product?.price}
        </h2>
        <div className="cart-quantity-setter">
          <button
            className="btn-less quantity-btn"
            onClick={subCartProductQuantity}
          >
            <GrSubtract />
          </button>
          <span>{productQuantity}</span>
          <button
            className="btn-add quantity-btn"
            onClick={addCartProductQuantity}
          >
            <PiPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
