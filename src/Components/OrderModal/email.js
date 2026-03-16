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

  const total = buyData.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );

  const templateParams = {
    order_id: orderId,
    date: date,
    name: buyData.name,
    phone: buyData.contact,
    email: buyData.email,
    address: buyData.address,
    pincode: buyData.pincode,
    products: formatProducts(buyData.products),
    total: total,
  };

  emailjs
    .send(
      "service_gd3qt7u",
      "template_9zzjm15",
      templateParams,
      "e4RfFs8z7DEUSchZj",
    )
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error("Email failed:", error);
    });
};

export default sendOrderEmail;
