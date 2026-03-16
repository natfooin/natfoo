const sendOrderToWhatsApp = (buyData) => {
  const phoneNumber = "919042649000";

  // Order ID
  const orderId = "ORD-" + Date.now();

  // Date & Time
  const dateTime = new Date().toLocaleString("en-IN");

  // Subtotal
  const subtotal = buyData.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const grandTotal = subtotal;

  // Product list
  const productList = buyData.products
    .map(
      (p, i) =>
`*${i + 1}. ${p.name}*
Category : ${p.category}
Quantity : ${p.quantity}
Price    : ₹${p.price}
Subtotal : ₹${p.price * p.quantity}`
    )
    .join("\n\n");

  const message = `
🏢 *Natfoo Foods Pvt Ltd*
━━━━━━━━━━━━━━━━━━━━

🛒 *NEW ORDER RECEIVED*

📦 *Order Details*
Order ID : ${orderId}
Date     : ${dateTime}

━━━━━━━━━━━━━━━━━━━━

👤 *Customer Details*
Name     : ${buyData.name}
Phone    : ${buyData.contact}
Email    : ${buyData.email}

📍 *Delivery Address*
${buyData.address}
Pincode  : ${buyData.pincode}

📝 *Customer Note*
${buyData.note || "None"}

━━━━━━━━━━━━━━━━━━━━

📦 *Ordered Products*

${productList}

━━━━━━━━━━━━━━━━━━━━

💰 *Order Summary*

Total Price : ₹${grandTotal}

━━━━━━━━━━━━━━━━━━━━
`;

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(url, "_blank");
};

export default sendOrderToWhatsApp