import express from "express";
const router = express.Router();
import db from "../database/db.js";

// POST Routes for submitting the contact form data to server
router.post("/submit-contact", (req, res) => {
  const { name, email, mobile, subject, message } = req.body;
  const sql =
    "INSERT INTO contactdetails (name,email,mobile,subject,message) VALUES (?,?,?,?,?)";
  db.query(sql, [name, email, mobile, subject, message], (err, result) => {
    if (err) {
      console.log("error inserting data", err);
      res
        .status(500)
        .json({ message: "database error while contact form inserting" });
    } else {
      res.status(200).json({ message: "Contact Form Successfully" });
    }
  });
});

// fetch data from the contact form
router.get("/get-contact-details", (req, res) => {
  const sql = "SELECT * FROM contactdetails ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Error while fetching contact details", err);
      res.status(500).send("Database error");
    } else {
      res.status(200).json(result);
    }
  });
});

export default router;
