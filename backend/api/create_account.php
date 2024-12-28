<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Allow from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Content-Type for JSON
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../config/db.php");  // Make sure this path is correct

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the form data from the request body
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        echo json_encode(['message' => 'Invalid JSON input']);
        http_response_code(400); // Bad request
        exit();
    }

    $userName = $data['userName'];
    $userMail = $data['userMail'];
    $userPhoneNumber = $data['userPhoneNumber'];
    $userPassword = $data['userPassword'];

    // SQL query to check if the user already exists
    $checkSql = "SELECT * FROM userdetails WHERE usermail = ?";

    // Prepare and execute the SQL query to check if the user exists
    $stmt = $conn->prepare($checkSql);  // Use the $db connection created in db.php
    $stmt->bind_param('s', $userMail);
    $stmt->execute();
    $result = $stmt->get_result();
    $existingUser = $result->fetch_assoc();

    if ($existingUser) {
        // User already exists, return an error
        http_response_code(400); // Bad request
        echo json_encode(['message' => 'User Already Registered, Please Login']);
    } else {
        // Hash the password using bcrypt
        $hashedPassword = password_hash($userPassword, PASSWORD_BCRYPT);

        // SQL query to insert a new user
        $insertSql = "INSERT INTO userdetails (username, usermail, usermobile, userpwd) VALUES (?, ?, ?, ?)";

        // Prepare and execute the SQL query to insert the new user
        $stmt = $conn->prepare($insertSql);
        $stmt->bind_param('ssss', $userName, $userMail, $userPhoneNumber, $hashedPassword);
        $stmt->execute();

        // Return success message
        http_response_code(200); // Success
        echo json_encode(['message' => 'User Registered Successfully']);
    }

} else {
    // Handle invalid request method
    http_response_code(405); // Method not allowed
    echo json_encode(['message' => 'Invalid request method']);
}
?>
