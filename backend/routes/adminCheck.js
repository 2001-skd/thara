import express from "express";
import db from "../database/db.js";
import path from "path";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { encode } from "punycode";
import { DefaultDeserializer } from "v8";
// const crypto = require("crypto");

const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
const secretKey = crypto.randomBytes(32).toString("hex");
// console.log(secretKey);

router.post("/admin-check", (req, res) => {
  const { username, adminpassword } = req.body;
  const sql =
    "SELECT * FROM admincredential WHERE adminusername = ? AND adminpassword = ?";
  db.query(sql, [username, adminpassword], (err, result) => {
    if (err) {
      console.log("Error While admin Login", err);
      res.status(500).json({ message: "Error while login" });
    }
    if (result.length > 0) {
      console.log("admin loggedin successfully");
      const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
      return res
        .status(200)
        .json({ message: "admin Loggedin successful", token: token });
    } else {
      res.status(401).json({ message: "Invalid Username or Password" });
    }
  });
});

// verify token from jwt

// function verifyToken(req, res, next) {
//   const token = req.headers["authorization"]?.split(" ")[1];

//   //   if not token provided
//   if (!token) {
//     res.status("403").json({ message: "Token Not Provided" });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       res.status("401").json({ message: "Unauthorized: Invalid token" });
//     }
//     req.user = decoded;
//     next();
//   });
// }

// router.get("/protected-route", verifyToken, (req, res) => {
//   res.status(200).json({ message: "Access To Route", user: req.user });
// });
export default router;
