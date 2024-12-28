<?php
session_start(); // Start the session

header("Content-Type: application/json");

// Check if the session exists
if (isset($_SESSION['user_id'])) {
    // If the session exists, return user data (optional)
    echo json_encode([
        'message' => 'Session is active',
        'user' => [
            'id' => $_SESSION['user_id'],
            'name' => $_SESSION['user_name'],
            'email' => $_SESSION['user_email'],
            'usermobile' => $_SESSION['user_mobile'],
        ]
    ]);
} else {
    // If the session doesn't exist, return a message
    echo json_encode(['message' => 'No active session']);
    http_response_code(401); // Unauthorized
}
?>
