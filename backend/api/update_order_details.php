<?php

// Allow from any origin (you can modify this for your specific domain)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (POST, OPTIONS)
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Allow specific headers (Content-Type and Authorization for JWT)
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Content-Type for JSON
header('Content-Type: application/json');

// If this is a preflight (OPTIONS) request, respond with 200 OK
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include your database connection
include("../config/db.php");

// Handle POST request to update the order status
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the posted data
    $data = json_decode(file_get_contents('php://input'), true);
    $orderId = $data['orderId'];
    $newStatus = $data['newStatus'];

    // Validate input
    if (empty($orderId) || empty($newStatus)) {
        echo json_encode(['error' => 'Order ID and new status are required.']);
        exit();
    }

    // SQL query to update the order status
    $updateQuery = "UPDATE orders SET cooking_status = ? WHERE order_id = ?";

    // Prepare the SQL statement to avoid SQL injection
    if ($stmt = $conn->prepare($updateQuery)) {
        // Bind parameters to the statement
        $stmt->bind_param("si", $newStatus, $orderId);

        // Execute the statement
        $stmt->execute();

        // Check if any rows were affected (i.e., if the order was updated)
        if ($stmt->affected_rows > 0) {
            echo json_encode(['message' => 'Order status updated successfully']);
        } else {
            echo json_encode(['error' => 'Order not found']);
        }

        // Close the statement
        $stmt->close();
    } else {
        // Error with SQL query
        echo json_encode(['error' => 'Internal server error']);
    }
} else {
    // If the request method is not POST
    echo json_encode(['error' => 'Invalid Request Method']);
}
?>
