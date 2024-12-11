import express from "express";
const router = express.Router();
import db from "../database/db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// post route for create account process for users
const saltRounds = 10;
const secretKey = crypto.randomBytes(32).toString("hex");

// route for user to create account
router.post("/create-account", (req, res) => {
  const { userName, userMail, userPhoneNumber, userPassword } = req.body;
  const insertSql =
    "INSERT INTO userdetails (username,usermail,usermobile,	userpwd) VALUES (?,?,?,?)";
  const checkSql = "SELECT * FROM userdetails WHERE usermail = ?";

  db.query(checkSql, [userMail], (err, result) => {
    if (err) {
      console.log("error while checking existing user", err);
      return res.status(500).json({ message: "Server Error" });
    }

    if (result.length > 0) {
      console.log("User Already Registered, Login");
      return res
        .status(400)
        .json({ message: "User Already Registered , Please Login" });
    } else {
      bcrypt.hash(userPassword, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.log("Error in password hashing", err);
          res.status(500).json({ message: "Error in password encryption" });
        }

        db.query(
          insertSql,
          [userName, userMail, userPhoneNumber, hashedPassword],
          (err, result) => {
            if (err) {
              console.log("error while user registering", err);
              return res.status(500).json({ message: "Server error" });
            } else {
              return res
                .status(200)
                .json({ message: "User Registered Successfully" });
            }
          }
        );
      });
    }
  });
});

// route for user to login
router.post("/login", (req, res) => {
  const { userMail, userPassword } = req.body;
  const sql = "SELECT * FROM userdetails WHERE usermail = ?";
  db.query(sql, [userMail], (err, result) => {
    if (err) {
      console.log("Error while checking User");
      return res.status(500).json({ message: "Error while checking User" });
    }
    if (result.length === 0) {
      console.log("User Not Found");
      return res.status(400).json({ message: "User Not Found" });
    }
    const user = result[0];
    console.log(user);

    // compare the provided password with the hashed password
    bcrypt.compare(userPassword, user.userpwd, (err, isMatch) => {
      if (err) {
        console.log("Password entered is Wrong", err);
        return res.status(500).json({ message: "Password entered is Wrong" });
      }
      if (isMatch) {
        const token = jwt.sign({ userMail }, secretKey, { expiresIn: "1h" });
        return res.status(200).json({
          message: "Password is Correct , Login Successfull",
          token: token,
          user: {
            id: user.id,
            name: user.username,
            email: user.usermail,
            usermobile: user.usermobile,
          },
        });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    });
  });
});

// fetch user details according from the user dashboard
router.get("/fetch-user-details", (req, res) => {
  const sql = "SELECT * FROM userdetails ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("error while fetching user details");
      res.status(500).json({ message: "Error While Fetching User Details" });
    } else {
      console.log("User details fetched successfully");
      res.status(200).json(result);
    }
  });
});

// set new password routes
router.post("/set-new-password", (req, res) => {
  const { userMail, userPassword } = req.body;

  // first check email id if exists
  const mailCheckQuery = "SELECT * FROM userdetails WHERE usermail = ?";
  db.query(mailCheckQuery, [userMail], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error while checking mail ID in set-new-password",
      });
    }

    // If email exists
    if (result.length > 0) {
      bcrypt.hash(userPassword, saltRounds, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({
            message: "Error while hashing password",
          });
        }

        // If password hashing is successful, update the password in the database
        const updatePasswordQuery =
          "UPDATE userdetails SET userpwd = ? WHERE usermail = ?";
        db.query(
          updatePasswordQuery,
          [hashedPassword, userMail],
          (updateErr, updateResult) => {
            if (updateErr) {
              return res.status(500).json({
                message: "Error while updating password",
              });
            }

            return res.status(200).json({
              message: "Password updated successfully",
            });
          }
        );
      });
    } else {
      // If email does not exist
      return res.status(404).json({ message: "Email ID does not exist" });
    }
  });
});

export default router;
