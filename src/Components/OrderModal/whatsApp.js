const generateWhatsAppOrderMessage = (buyData) => {
  const orderId = "ORD-" + Date.now();
  const dateTime = new Date().toLocaleString("en-IN");

  const subtotal = buyData.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );

  const productSection = buyData.products
    .map(
      (p, i) =>
        `*${i + 1}. ${p.name}*
Qty  : ${p.quantity}
Price: ₹${p.price}
Total: ₹${p.price * p.quantity}`,
    )
    .join("\n\n");

  return `
*NATFOO FOODS*

━━━━━━━━━━━━━━━━━━

🧾 *ORDER SUMMARY*

Order ID : ${orderId}
Date     : ${dateTime}

━━━━━━━━━━━━━━━━━━

*Customer Details*

${buyData.name}
${buyData.contact}
${buyData.email}


${buyData.address}
${buyData.pincode}

━━━━━━━━━━━━━━━━━━

*Products Ordered*

${productSection}

━━━━━━━━━━━━━━━━━━

*Subtotal*: ₹${subtotal}
*Discount*: As applicable

━━━━━━━━━━━━━━━━━━
*TOTAL*: ₹${subtotal}
━━━━━━━━━━━━━━━━━━
`;
};

const sendOrderToWhatsApp = (buyData) => {
  const message = generateWhatsAppOrderMessage(buyData);

  const encodedMessage = encodeURIComponent(message);

  const phoneNumber = "919042649000";

  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(url, "_blank");
};
export default sendOrderToWhatsApp;
