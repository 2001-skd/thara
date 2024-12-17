import express from "express";
import db from "../database/db.js";
import multer from "multer";
import path from "path";
import nodemailer from "nodemailer";

const router = express.Router();

// insert order into database
router.post("/create-order", (req, res) => {
  const {
    userId,
    cartItems,
    totalPrice,
    paymentMethod,
    userName,
    userEmail,
    userMobile,
    userAddress,
  } = req.body;

  const orderQuery =
    "INSERT INTO orders(user_id,user_name,user_email,user_phone,user_address,total_price,payment_method,order_status) VALUES (?,?,?,?,?,?,?,?)";

  db.query(
    orderQuery,
    [
      userId,
      userName,
      userEmail,
      userMobile,
      userAddress,
      totalPrice,
      paymentMethod,
      "pending",
    ],
    (err, orderResult) => {
      if (err) {
        return res.status(500).json({ message: "Error creating order", err });
      }

      //   else craete order ID
      const orderId = orderResult.insertId;
      console.log(orderId);

      //   step 2 - insert cart items into the order_items table
      const orderItemsQuery = `INSERT INTO order_items (order_id,food_name,foodimg,food_price,quantity,total_price) VALUES ?`;

      const orderItems = cartItems.map((item) => [
        orderId,
        item.foodname,
        item.foodimg,
        item.foodprice,
        item.qty,
        (item.foodprice * item.qty).toFixed(2),
      ]);

      db.query(orderItemsQuery, [orderItems], (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error inserting order items", err });
        }

        // send emails
        sendOrderConfirmationEmail(
          userName,
          userAddress,
          userMobile,
          userEmail,
          totalPrice,
          cartItems,
          orderId
        );

        sendAdminNotificationEmail(
          orderId,
          userName,
          totalPrice,
          userMobile,
          userAddress
        );
        res
          .status(201)
          .json({ message: "Order created successfully", orderId });
      });
    }
  );
});

// email codes

function sendOrderConfirmationEmail(
  userName,
  userAddress,
  userMobile,
  userEmail,
  totalPrice,
  cartItems,
  orderId
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: userEmail,
    subject: `Order Confirmation - Order ID: ${orderId}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
        }
        .header img {
            width: 100px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .order-summary {
            margin: 20px 0;
        }
        .order-summary table {
            width: 100%;
            border-collapse: collapse;
        }
        .order-summary table th, .order-summary table td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding: 10px;
            background-color: #333;
            color: #fff;
        }
        @media screen and (max-width: 600px) {
            .order-summary table th, .order-summary table td {
                font-size: 14px;
                padding: 8px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <!-- Header -->
    <div class="header">
        <img src="logo_url" alt="Thara's Takeaway Logo">
        <h1>Thara's Takeaway</h1>
    </div>

    <!-- Body -->
    <div class="order-summary">
        <p>Hello ${userName},</p>
        <p>Thank you for your order!</p>
        <table>
            <tr>
                <th>Items</th>
                <td>${cartItems.length}</td>
            </tr>
            <tr>
                <th>Total Price</th>
                <td>£${totalPrice}</td>
            </tr>
            <tr>
                <th>Shipping Address</th>
                <td>${userAddress}</td>
            </tr>
        </table>
        <p>We will process your order shortly.</p>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>&copy; <script>document.write(new Date().getFullYear());</script> Thara's Takeaway. All rights reserved.</p>
    </div>
</div>

</body>
</html>
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Order confirmation email sent:", info.response);
    }
  });
}

// Send notification email to admin
function sendAdminNotificationEmail(
  orderId,
  userName,
  totalPrice,
  userMobile,
  userAddress
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.ADMIN_GMAIL,
    subject: `New Order - Order ID: ${orderId}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Order Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
        }
        .header img {
            width: 100px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .order-details {
            margin: 20px 0;
        }
        .order-details table {
            width: 100%;
            border-collapse: collapse;
        }
        .order-details table th, .order-details table td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding: 10px;
            background-color: #333;
            color: #fff;
        }
        @media screen and (max-width: 600px) {
            .order-details table th, .order-details table td {
                font-size: 14px;
                padding: 8px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <!-- Header -->
    <div class="header">
        <img src="public/uploads/logo/logo-removebg-preview.png" alt="Thara's Takeaway Logo">
        <h1>Thara's Takeaway</h1>
    </div>

    <!-- Body -->
    <div class="order-details">
        <p>Hello Admin,</p>
        <p>A new order has been placed.</p>
        <table>
            <tr>
                <th>Order ID</th>
                <td>${orderId}</td>
            </tr>
            <tr>
                <th>Customer</th>
                <td>${userName}</td>
            </tr>
            <tr>
                <th>Customer Phone Number</th>
                <td>${userMobile}</td>
            </tr>

            <tr>
                <th>Customer Address</th>
                <td>${userAddress}</td>
            </tr>
            <tr>
                <th>Total Price</th>
                <td>£${totalPrice}</td>
            </tr>
        </table>
        <p>Please check the admin dashboard for more details.</p>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>&copy; <script>document.write(new Date().getFullYear());</script> Thara's Takeaway. All rights reserved.</p>
    </div>
</div>

</body>
</html>
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending admin notification email:", error);
    } else {
      console.log("Admin notification email sent:", info.response);
    }
  });
}

// fetch all details in order history
router.get("/fetch-order-details", (req, res) => {
  const { user_id } = req.query;
  const query =
    "SELECT user_id,payment_method,order_status,food_name,food_price,foodimg,quantity,order_item_id, created_at, cooking_status FROM orders INNER JOIN order_items ON order_items.order_id = orders.order_id WHERE user_id= ? ORDER BY order_item_id DESC";

  db.query(query, [user_id], (err, result) => {
    if (err) {
      console.log("Error while inserting order history fetching", err);
      return res
        .status(500)
        .json({ message: "Error while inserting order history fetching" });
    } else {
      return res.status(200).json(result);
    }
  });
});

// fetch ordered items but still pending
router.get("/fetch-new-order-items", (req, res) => {
  const sql =
    "SELECT orders.*, order_items.* FROM orders INNER JOIN order_items ON orders.order_id = order_items.order_id WHERE orders.cooking_status = 'pending'";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("error while fetch ordered items but still pending", err);
      return res
        .status(500)
        .json({ message: "Error While fetch ordered items but still pending" });
    } else {
      console.log(
        "Details Fetched Successfully fetch ordered items but still pending"
      );
      return res.status(200).send(result);
    }
  });
});

// fetch ordered details in processing
router.get("/fetch-processing-order-items", (req, res) => {
  const sql =
    "SELECT orders.*, order_items.* FROM orders INNER JOIN order_items ON orders.order_id = order_items.order_id WHERE orders.cooking_status = 'processing'";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("error while fetch ordered items but still pending", err);
      return res
        .status(500)
        .json({ message: "Error While fetch ordered items but still pending" });
    } else {
      console.log(
        "Details Fetched Successfully fetch ordered items but still pending"
      );
      return res.status(200).send(result);
    }
  });
});

// fetch delivered order details
router.get("/fetch-delivered-order-items", (req, res) => {
  const sql =
    "SELECT orders.*, order_items.* FROM orders INNER JOIN order_items ON orders.order_id = order_items.order_id WHERE orders.cooking_status = 'delivered'";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("error while fetch ordered items but still pending", err);
      return res
        .status(500)
        .json({ message: "Error While fetch ordered items but still pending" });
    } else {
      console.log(
        "Details Fetched Successfully fetch ordered items but still pending"
      );
      return res.status(200).send(result);
    }
  });
});

// change order status from
router.post("/update-status", (req, res) => {
  const { orderId, newStatus } = req.body;

  // Validate input
  if (!orderId || !newStatus) {
    return res
      .status(400)
      .json({ error: "Order ID and new status are required." });
  }

  try {
    // Update query to change the cooking_status in the orders table
    const updateQuery = `UPDATE orders SET cooking_status = ? WHERE order_id = ?`;

    // Execute the query with a callback function
    db.query(updateQuery, [newStatus, orderId], (error, result) => {
      if (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Check if the order was updated
      if (result.affectedRows > 0) {
        console.log("Order status updated successfully");
        return res
          .status(200)
          .json({ message: "Order status updated successfully" });
      } else {
        console.log("Order not found");
        return res.status(404).json({ error: "Order not found" });
      }
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
