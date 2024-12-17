import mysql from "mysql2";
// mysql connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Thar@123",
  database: "tharatakeaway",
});

// connect to mysql
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

export default db;
