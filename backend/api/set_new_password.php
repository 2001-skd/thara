<?php
// Include database connection
include("../config/db.php");

// Allow CORS headers if needed (modify as per your requirements)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Content-Type for JSON
header('Content-Type: application/json');

// If this is a preflight request, just exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the request data
$data = json_decode(file_get_contents("php://input"), true);
$userMail = $data['userMail'];
$userPassword = $data['userPassword'];

// Check if email exists
$mailCheckQuery = "SELECT * FROM userdetails WHERE usermail = ?";
$stmt = $conn->prepare($mailCheckQuery);
$stmt->bind_param("s", $userMail);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Email exists, hash the new password
    $hashedPassword = password_hash($userPassword, PASSWORD_BCRYPT);

    // Update the password in the database
    $updatePasswordQuery = "UPDATE userdetails SET userpwd = ? WHERE usermail = ?";
    $updateStmt = $conn->prepare($updatePasswordQuery);
    $updateStmt->bind_param("ss", $hashedPassword, $userMail);

    if ($updateStmt->execute()) {
        // Success
        echo json_encode(["message" => "Password updated successfully"]);
    } else {
        // Error while updating password
        echo json_encode(["message" => "Error while updating password"]);
        http_response_code(500); // Internal Server Error
    }
} else {
    // Email does not exist
    echo json_encode(["message" => "Email ID does not exist"]);
    http_response_code(404); // Not Found
}
?>
