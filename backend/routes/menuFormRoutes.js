import express from "express";
import db from "../database/db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// setup multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/food_img");
  },
  filename: function (req, file, cb) {
    const uniqueSuffixName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffixName + "-" + file.originalname);
  },
});

// initialize multer
const upload = multer({ storage: storage });

// router for adding menu list
router.post("/add-footomenu", upload.single("foodimg"), (req, res) => {
  const { foodname, foodprice, foodcategory, fooddesc, menumodifieddate } =
    req.body;

  //   get food image
  const foodImg = req.file ? `uploads/food_img/${req.file.filename}` : null;

  //   insert query
  const sql =
    "INSERT INTO foodmenulist (foodname,foodprice,foodcategory,foodimg,fooddesc,modifieddate) VALUES (?,?,?,?,?,?)";

  // write db query
  db.query(
    sql,
    [foodname, foodprice, foodcategory, foodImg, fooddesc, menumodifieddate],
    (err, result) => {
      if (err) {
        console.log("error while inserting food menu list", err);
        return res
          .status(500)
          .json({ message: "Error while inserting food menu list" });
      } else {
        res.status(200).send(result);
      }
    }
  );
});

// router for fetching food details
router.get("/get-foodmenu", (req, res) => {
  const sql = "SELECT * FROM foodmenulist ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Error while fetching food menu list", err);
      res.status(500).json({ message: "Error while fetching food menu list" });
    } else {
      res.status(200).send(result);
    }
  });
});

// get food menu based on id
router.get("/getform-foodmenu/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM foodmenulist WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Error while fetching food menu list", err);
      res.status(500).json({ message: "Error while fetching food menu list" });
    } else {
      res.status(200).send(result);
    }
  });
});

// router for deleting food details
router.delete("/delete-foodmenu/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM foodmenulist WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Error while deleting foodmenu list", err);
      res.status(500).json({ message: "Error while deleting foodmenu list" });
    } else {
      console.log("Deleted successfully");
      res.status(200).json({ message: "Deleted successfully" });
    }
  });
});

// router for editing food menu details
// Update Menu Route
router.put("/edit-menu/:id", upload.single("foodimg"), (req, res) => {
  const { foodname, foodprice, foodcategory, fooddesc, menumodifieddate } =
    req.body;
  const { id } = req.params;

  // Handle file upload (food image)
  const foodimg = req.file ? `uploads/food_img/${req.file.filename}` : null;

  // Build the SQL query depending on whether a new image was uploaded or not
  const sql = foodimg
    ? "UPDATE foodmenulist SET foodname = ?, foodprice = ?, foodcategory = ?, fooddesc = ?, foodimg = ?, modifieddate = ? WHERE id = ?"
    : "UPDATE foodmenulist SET foodname = ?, foodprice = ?, foodcategory = ?, fooddesc = ?, modifieddate = ? WHERE id = ?";

  // Prepare the data for the query
  const data = foodimg
    ? [
        foodname,
        foodprice,
        foodcategory,
        fooddesc,
        foodimg,
        menumodifieddate,
        id,
      ]
    : [foodname, foodprice, foodcategory, fooddesc, menumodifieddate, id];

  // Execute the SQL query
  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("Error updating menu item:", err);
      return res.status(500).json({ message: "Error updating menu item" });
    }

    if (result.affectedRows > 0) {
      // If the update was successful
      res.status(200).json({ message: "Menu item updated successfully" });
    } else {
      // If no rows were updated (perhaps ID does not exist)
      res.status(404).json({ message: "Menu item not found" });
    }
  });
});

// fetch form details in the form fields
router.get("/fetch-form-menu/:id", (req, res) => {
  const { id } = req.params; // Extract id from URL params
  const sql = "SELECT * FROM foodmenulist WHERE id = ?";

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

export default router;
