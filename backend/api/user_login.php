<?php
session_start(); // Start the session

// Allow from any origin (you can modify this for your specific domain)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (POST)
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Content-Type for JSON
header('Content-Type: application/json');

// If this is a preflight request, just exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection
include("../config/db.php");

// Include JWT library
require_once '../vendor/autoload.php'; // Adjust path as necessary
use \Firebase\JWT\JWT;

// Generate a secure random secret key (32 bytes = 256 bits)
$secretKey = bin2hex(openssl_random_pseudo_bytes(32));

// Log the generated secret key (for debugging purposes)
error_log("Generated Secret Key: " . $secretKey);

// Get the data from the request body
$data = json_decode(file_get_contents("php://input"), true);
$userMail = $data['userMail'];
$userPassword = $data['userPassword'];

$sql = "SELECT * FROM userdetails WHERE usermail = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $userMail);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user) {
    // Compare the password with the hashed password stored in the database
    if (password_verify($userPassword, $user['userpwd'])) {
        // Prepare the payload for the JWT
        $payload = [
            'userMail' => $userMail,
            'id' => $user['id'],
            'name' => $user['username'],
            'email' => $user['usermail'],
            'mobile' => $user['usermobile'],
            'iat' => time(), // Issued At: current timestamp
            'exp' => time() + 3600, // Expiration time: 1 hour from now
        ];

        // Generate the JWT with the algorithm (HS256 is commonly used)
        $jwt = JWT::encode($payload, $secretKey, 'HS256'); // Add the 'HS256' algorithm

        // Respond with the token and user data
        echo json_encode([
            'message' => 'Login Successful',
            'token' => $jwt, // Send the JWT token
            'user' => [
                'id' => $user['id'],
                'name' => $user['username'],
                'email' => $user['usermail'],
                'usermobile' => $user['usermobile'],
            ]
        ]);
    } else {
        echo json_encode(['message' => 'Invalid credentials']);
        http_response_code(400); // Bad request
    }
} else {
    echo json_encode(['message' => 'User not found']);
    http_response_code(404); // Not found
}
?>
