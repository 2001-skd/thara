<?php
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


// Include your database connection
include("../config/db.php"); 

// Get the user_id from query parameters
$user_id = $_GET['user_id'] ?? '';

if (!$user_id) {
    echo json_encode(['message' => 'User ID is required']);
    http_response_code(400); // Bad request
    exit();
}

// Prepare the SQL query to fetch order details for the given user ID
$query = "SELECT user_id, payment_method, order_status, food_name, food_price, foodimg, quantity, order_item_id, created_at, cooking_status 
          FROM orders 
          INNER JOIN order_items ON order_items.order_id = orders.order_id 
          WHERE user_id = ? 
          ORDER BY order_item_id DESC";

// Prepare the SQL statement
$stmt = $conn->prepare($query);

// Bind the user_id parameter
$stmt->bind_param('i', $user_id); // 'i' means the parameter is an integer

// Execute the query
if ($stmt->execute()) {
    // Fetch the result
    $result = $stmt->get_result();

    // Check if we got any rows
    if ($result->num_rows > 0) {
        $orderDetails = [];

        // Fetch all rows as an associative array
        while ($row = $result->fetch_assoc()) {
            $orderDetails[] = $row;
        }

        // Send the order details in the response
        echo json_encode($orderDetails);
        http_response_code(200); // OK
    } else {
        // If no orders found
        echo json_encode(['message' => 'No orders found for this user']);
        http_response_code(404); // Not found
    }
} else {
    // If there was an error executing the query
    echo json_encode(['message' => 'Error fetching order details']);
    http_response_code(500); // Internal server error
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
