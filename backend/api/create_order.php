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

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Get the request body (expects JSON data)
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate that the data is present
    if (!empty($data)) {
        // Extract data from request body
        $userId = $data['userId'];
        $cartItems = $data['cartItems'];
        $totalPrice = $data['totalPrice'];
        $paymentMethod = $data['paymentMethod'];
        $userName = $data['userName'];
        $userEmail = $data['userEmail'];
        $userMobile = $data['userMobile'];
        $userAddress = $data['userAddress'];

        // Step 1: Insert into 'orders' table
        $orderQuery = "INSERT INTO orders (user_id, user_name, user_email, user_phone, user_address, total_price, payment_method, order_status) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')";

        if ($stmt = $conn->prepare($orderQuery)) {
            $stmt->bind_param('issssds', $userId, $userName, $userEmail, $userMobile, $userAddress, $totalPrice, $paymentMethod);

            // Execute the statement
            if ($stmt->execute()) {
                // Get the inserted order ID
                $orderId = $stmt->insert_id;
                $stmt->close();

                // Step 2: Insert each cart item into the 'order_items' table
                $orderItemsQuery = "INSERT INTO order_items (order_id, food_name, foodimg, food_price, quantity, total_price) VALUES (?, ?, ?, ?, ?, ?)";

                if ($stmtItems = $conn->prepare($orderItemsQuery)) {
                    // Loop through each cart item and insert
                    foreach ($cartItems as $item) {
                        $foodName = $item['foodname'];
                        $foodImg = $item['foodimg'];
                        $foodPrice = $item['foodprice'];
                        $qty = $item['qty'];
                        $itemTotalPrice = number_format($foodPrice * $qty, 2);

                        // Bind parameters for each item
                        $stmtItems->bind_param('issdii', $orderId, $foodName, $foodImg, $foodPrice, $qty, $itemTotalPrice);
                        $stmtItems->execute();
                    }
                    $stmtItems->close();

                    // Send success response
                    echo json_encode([
                        'message' => 'Order created successfully',
                        'orderId' => $orderId
                    ]);
                } else {
                    // Handle error in inserting order items
                    echo json_encode([
                        'message' => 'Error inserting order items',
                        'error' => $conn->error
                    ]);
                }
            } else {
                // Handle error in creating order
                echo json_encode([
                    'message' => 'Error creating order',
                    'error' => $conn->error
                ]);
            }
        } else {
            // Handle SQL preparation error
            echo json_encode([
                'message' => 'Error preparing SQL statement',
                'error' => $conn->error
            ]);
        }
    } else {
        // Handle empty request body
        echo json_encode(['message' => 'No data provided']);
    }
} else {
    // If the request is not POST, return a method not allowed error
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
?>
