import emailjs from "@emailjs/browser";
const formatProducts = (products) => {
  return products
    .map(
      (p, i) =>
        `${i + 1}. ${p.name}
Quantity : ${p.quantity}
Price    : ₹${p.price}
Total    : ₹${p.price * p.quantity}`,
    )
    .join("\n\n");
};

const sendOrderEmail = (buyData) => {
  const orderId = "ORD-" + Date.now();
  const date = new Date().toLocaleString("en-IN");

  const templateParams = {
    order_id: orderId,
    date: date,
    name: buyData.name,
    phone: buyData.contact,
    email: buyData.email,
    address: buyData.address,
    pincode: buyData.pincode,
    products: formatProducts(buyData.products),
    subtotal: buyData.subtotal,
    discount: buyData.discountAmount,
    total: buyData.total,
  };

  emailjs
    .send(
      "service_lm1gf28",
      "template_3mz0zie",
      templateParams,
      "Dz9dfdjwRWqf-Tii_",
    )
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error("Email failed:", error);
    });
};

export default sendOrderEmail;
