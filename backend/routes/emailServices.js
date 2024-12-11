import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or use another email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email to the user
const sendOrderConfirmationEmail = (
  userName,
  userAddress,
  userMobile,
  userEmail,
  totalPrice,
  cartItems,
  orderId,
  year
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Your Order #TTA${orderId} - Thara's Takeaway`,
    html: `
      <h1>Thank you for your order, ${userName}!</h1>
      <p>Your order #${orderId} has been received.</p>
      <p><strong>Order Summary:</strong></p>
      <table border="1" cellpadding="5">
        <tr><th>Food Item</th><th>Quantity</th><th>Price</th><th>Total</th></tr>
        ${cartItems
          .map(
            (item) => `
          <tr>
            <td>${item.foodname}</td>
            <td>${item.qty}</td>
            <td>£${item.foodprice}</td>
            <td>£${(item.foodprice * item.qty).toFixed(2)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p><strong>Total Price: £${totalPrice}</strong></p>
      <p>Delivery Address: ${userAddress}</p>
      <p>Payment Method: ${paymentMethod}</p>
      <p>Thank you for choosing Thara's Takeaway!</p>
      <footer>&copy; ${year} Thara's Takeaway</footer>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending confirmation email:", error);
    } else {
      console.log("Confirmation email sent: " + info.response);
    }
  });
};

// Send email to the admin
const sendAdminNotificationEmail = (orderId, userName, totalPrice, year) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "admin-email@example.com", // Admin's email
    subject: `New Order Received: #TTA${orderId} - Thara's Takeaway`,
    html: `
      <h1>New Order Received: #${orderId}</h1>
      <p><strong>Customer Name:</strong> ${userName}</p>
      <p><strong>Total Price:</strong> £${totalPrice}</p>
      <p><strong>Year:</strong> ${year}</p>
      <p>Please check the admin dashboard for further details.</p>
      <footer>&copy; ${year} Thara's Takeaway</footer>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending admin notification email:", error);
    } else {
      console.log("Admin notification email sent: " + info.response);
    }
  });
};

module.exports = { sendOrderConfirmationEmail, sendAdminNotificationEmail };
