import mysql from "mysql2";
// mysql connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_NAME,
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
