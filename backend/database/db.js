import mysql from "mysql2";
// mysql connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tharatakeaway",
});

// connect to mysql
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    retrun;
  }
  console.log("Connected to MySQL database.");
});

export default db;
