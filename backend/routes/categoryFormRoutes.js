import express from "express";
import db from "../database/db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Setup multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Destination folder for the uploaded files
    cb(null, "public/uploads/category_img"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using timestamp and random number
    const uniqueSuffixName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffixName + "-" + file.originalname);
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// POST route for inserting category data with file upload
router.post("/category-form", upload.single("categoryimg"), (req, res) => {
  // Extract text data from the request body
  const { categoryname, categorymodifieddate } = req.body;

  // Get the uploaded file's relative path
  const categoryimg = req.file
    ? `uploads/category_img/${req.file.filename}`
    : null;

  // SQL query to insert the category data into the database
  const sql =
    "INSERT INTO categorylist (categoryname, categoryimg, datemodified) VALUES (?,?,?)";

  // Execute the query to insert data
  db.query(
    sql,
    [categoryname, categoryimg, categorymodifieddate],
    (err, result) => {
      if (err) {
        console.log("Error while inserting category form", err);
        return res
          .status(500)
          .json({ message: "Error while inserting category form" });
      }
      res.status(200).json({ message: "Category data inserted successfully" });
    }
  );
});

// query for fetching data
router.get("/get-category-details", (req, res) => {
  const sql = "SELECT * FROM categorylist ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Error while fetching category list", err);
      res.status(500).json({ message: "Database error" });
    } else {
      res.status(200).send(result);
    }
  });
});

// query for deleting data
router.delete("/delete-category/:id", (req, res) => {
  const { id } = req.params; // Extract id from the request
  // const sql = "DELETE from categorylist WHERE id = ?";
  // console.log(req.params["id"]);
  const sql = "DELETE from categorylist WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Error while deleting category list", err);
      return res.status(500).json({ message: "Error while deleting" });
    }

    // Check how many rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    console.log("Delete result:", result);
    res.status(200).json({ message: "Category deleted successfully" });
  });
});

// query for editing
router.put("/edit-category/:id", upload.single("categoryimg"), (req, res) => {
  // Extract text data from the request body
  const { categoryname, categorymodifieddate } = req.body;
  const { id } = req.params;

  // Get the uploaded file's relative path
  const categoryimg = req.file
    ? `uploads/category_img/${req.file.filename}`
    : null;

  const sql = categoryimg
    ? "UPDATE categorylist SET categoryname=?, categoryimg=?, datemodified=? WHERE id=?"
    : "UPDATE categorylist SET categoryname=?,datemodified=? WHERE id=?";

  const data = categoryimg
    ? [categoryname, categoryimg, categorymodifieddate, id]
    : [categoryname, categoryimg, categorymodifieddate];

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("Error updating category details", err);
      res.status(500).json({ message: "Error updating category details" });
      return result;
    } else {
      res.status(200).send(result);
      console.log(result);
    }
  });
});

// routes for category list based on category name on menulist to show details on category details in website home page

router.get("/fetch-details-based-on-category", (req, res) => {
  const sql =
    "SELECT foodname,foodprice,foodcategory,foodimg,fooddesc,categoryname,categoryimg from foodmenulist INNER JOIN categorylist ON foodmenulist.foodcategory = categorylist.categoryname";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(
        "error while fetching /fetch-details-based-on-category this api"
      );
      return res.status(500).json({
        message: "error while fetching details on menulist based on category",
      });
    } else {
      console.log("Menu Details Fetched Successfully , Based on Category Name");
      return res.status(200).json(result);
    }
  });
});

// fetch category form details
router.get("/fetch-form-category/:id", (req, res) => {
  const { id } = req.params; // Extract id from URL params
  const sql = "SELECT * FROM categorylist WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Error while form details fetching", err);
      return res
        .status(500)
        .json({ message: "Error While Form Details Fetching" });
    } else {
      console.log("Form Details Fetched Successfully");
      return res.status(200).json(result); // Use res.status(200).json to send the response
    }
  });
});

// update edit category form
router.put("/edit-category/:id", upload.single("categoryimg"), (req, res) => {
  const { categoryname, categorymodifieddate } = req.body;
  const { id } = req.params;

  const categoryimg = req.file
    ? `uploads/category_img/${req.file.filename}`
    : null;

  // Build the SQL query depending on whether a new image was uploaded or not
  const sql = categoryimg
    ? "UPDATE categorylist SET categoryname = ?, categoryimg = ?, datemodified = ? WHERE id = ?"
    : "UPDATE categorylist SET categoryname = ?, datemodified = ? WHERE id = ?";

  // Prepare the data for the query
  const data = categoryimg
    ? [categoryname, categoryimg, categorymodifieddate, id]
    : [categoryname, categorymodifieddate, id];

  // Execute the SQL query
  db.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error updating Category item:", err);
      return res.status(500).json({ message: "Error updating Category item" });
    }

    if (result.affectedRows > 0) {
      // If the update was successful
      return res
        .status(200)
        .json({ message: "Category item updated successfully" });
    } else {
      // If no rows were updated (perhaps ID does not exist or no change in data)
      return res
        .status(404)
        .json({ message: "Category item not found or no changes were made" });
    }
  });
});

export default router;
