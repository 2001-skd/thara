<?php

header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (POST)
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Content-Type for JSON
header('Content-Type: application/json');

// If this is a preflight (OPTIONS) request, respond with 200
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Content-Type for JSON
header('Content-Type: application/json');

// Include your database connection
include("../config/db.php");

// Include JWT library
require_once '../vendor/autoload.php'; // Adjust path as necessary
use \Firebase\JWT\JWT;

// Generate a secure secret key
$secretKey = bin2hex(openssl_random_pseudo_bytes(32));  // Generate a secure 32-byte secret key

// Handle POST request to check admin credentials
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the posted data
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];
    $adminpassword = $data['adminpassword'];

    // SQL query to check if admin credentials are valid
    $sql = "SELECT * FROM admincredential WHERE adminusername = ? AND adminpassword = ?";
    
    // Prepare statement to avoid SQL injection
    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters
        $stmt->bind_param("ss", $username, $adminpassword);
        
        // Execute statement
        $stmt->execute();
        
        // Get the result
        $result = $stmt->get_result();
        
        // Check if credentials match
        if ($result->num_rows > 0) {
            // Admin logged in successfully, create a JWT token
            $payload = array(
                'username' => $username,
                'exp' => time() + 3600 // Token expires in 1 hour
            );

            // Encode the token with the third argument specifying the algorithm (HS256)
            $token = JWT::encode($payload, $secretKey, 'HS256');  // Adding the algorithm 'HS256'

            // Respond with success and token
            echo json_encode([
                'message' => 'Admin logged in successfully',
                'token' => $token
            ]);
        } else {
            // Invalid username or password
            echo json_encode(['message' => 'Invalid Username or Password']);
        }

        // Close the statement
        $stmt->close();
    } else {
        // Error with SQL query
        echo json_encode(['message' => 'Error while login']);
    }
} else {
    // If the request method is not POST
    echo json_encode(['message' => 'Invalid Request Method']);
}

?>
