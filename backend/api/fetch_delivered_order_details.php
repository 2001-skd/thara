<?php

// Allow from any origin (you can modify this for your specific domain)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (GET, OPTIONS)
header("Access-Control-Allow-Methods: GET, OPTIONS");

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

// Handle GET request to fetch delivered order items with cooking status 'delivered'
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // SQL query to fetch orders and order items where cooking_status is 'delivered'
    $sql = "
        SELECT orders.*, order_items.* 
        FROM orders 
        INNER JOIN order_items ON orders.order_id = order_items.order_id 
        WHERE orders.cooking_status = 'delivered'
    ";

    // Execute the query
    $result = $conn->query($sql);

    // Check if any records were fetched
    if ($result->num_rows > 0) {
        // Create an array to store the order details
        $orderItems = [];
        
        // Fetch all results
        while ($row = $result->fetch_assoc()) {
            $orderItems[] = $row;
        }

        // Respond with the fetched order items
        echo json_encode($orderItems);
    } else {
        // No records found, return an empty array
        echo json_encode([]);
    }
} else {
    // If the request method is not GET
    echo json_encode(['message' => 'Invalid Request Method']);
}

?>
