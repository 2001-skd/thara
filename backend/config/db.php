<?php
// Database configuration
$host = "localhost";
$user = "root"; 
$password = "";
$database = "tharatakeaway";

// Create a connection
$conn = new mysqli($host, $user, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Connection is successful
// echo "Database connected successfully!";
?>
