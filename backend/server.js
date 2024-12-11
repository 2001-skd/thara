import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";
import categoryFormRoutes from "./routes/categoryFormRoutes.js";
import menuFormRoutes from "./routes/menuFormRoutes.js";
import adminCheck from "./routes/adminCheck.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middleware to parse json data
app.use(express.json());
app.use(cors());

app.use(express.static("public"));

// contact routes
app.use("/contact", contactRoutes);

// category routes
app.use("/category", categoryFormRoutes);

// menu form routes
app.use("/menu", menuFormRoutes);

// admin check routes
app.use("/admin", adminCheck);

// user side routes
app.use("/user", userRoutes);

// user order details and these page routes
app.use("/order", orderRoutes);

// app.get("/", (req, res) => {
//   res.send("working");
//   console.log("server is working");
// });

// Error handling middleware (should be the last middleware)
app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error stack trace to the console
  res.status(500).send("Something went wrong!"); // Sends a generic response to the client
});

app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log("all routes", middleware.route.path);
  }
});

// start server
app.listen(PORT, () => {
  console.log("the app was running in the port " + PORT);
});
