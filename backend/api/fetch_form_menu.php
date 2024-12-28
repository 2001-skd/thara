<?php
// Allow from any origin (you can modify this for your specific domain)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (GET)
header("Access-Control-Allow-Methods: GET, OPTIONS");

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

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Retrieve the ID from the URL
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null; // Ensure it's an integer

    if ($id === null) {
        // If ID is not provided, return an error response
        http_response_code(400);
        echo json_encode(["message" => "Missing ID parameter"]);
        exit();
    }

    // SQL query to fetch food menu item by ID
    $sql = "SELECT * FROM foodmenulist WHERE id = ?";

    // Prepare the statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind the parameter to the query
        $stmt->bind_param("i", $id);  // "i" indicates the type is an integer

        // Execute the query
        if ($stmt->execute()) {
            $result = $stmt->get_result(); // Get the result of the query

            // Check if the result contains any rows
            if ($result->num_rows > 0) {
                // Fetch the data and return it as a JSON response
                $data = $result->fetch_assoc();
                echo json_encode($data);
            } else {
                // If no rows were returned, send a 404 error response
                http_response_code(404);
                echo json_encode(["message" => "Food menu item not found"]);
            }
        } else {
            // If there was an error executing the query
            http_response_code(500);
            echo json_encode(["message" => "Error while fetching form details"]);
        }

        // Close the prepared statement
        $stmt->close();
    } else {
        // If there was an error preparing the SQL statement
        http_response_code(500);
        echo json_encode(["message" => "Error preparing SQL statement"]);
    }
} else {
    // If the request method is not GET, return a method not allowed status
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}
?>
