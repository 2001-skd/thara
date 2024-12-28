<?php
// Allow from any origin (you can change '*' to a specific origin like 'http://localhost:5173')
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (POST, GET, etc.)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// If this is a preflight request, exit the script
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../config/db.php");

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the form data from the POST request
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // SQL query to insert data into the contactdetails table
    $sql = "INSERT INTO contactdetails (name, email, mobile, subject, message) VALUES (?, ?, ?, ?, ?)";
    
    // Prepare the SQL statement
    $stmt = $conn->prepare($sql);
    
    // Bind the form data to the SQL query
    $stmt->bind_param("sssss", $name, $email, $mobile, $subject, $message);

    // Execute the query and check if it was successful
    if ($stmt->execute()) {
        // Send a success response
        echo json_encode(["message" => "Contact Form Submitted Successfully"]);
    } else {
        // Send an error response
        http_response_code(500);
        echo json_encode(["message" => "Database error while inserting contact form"]);
    }

    // Close the statement
    $stmt->close();
}

// Close the database connection
$conn->close();

?>