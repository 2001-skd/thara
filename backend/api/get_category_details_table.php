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

// Handle GET request to fetch category details
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // SQL query to fetch all category details ordered by id DESC
    $sql = "SELECT * FROM categorylist ORDER BY id DESC";

    // Execute the query
    $result = $conn->query($sql);

    // Check if any records were fetched
    if ($result->num_rows > 0) {
        // Create an array to store the category details
        $categoryDetails = [];
        
        // Fetch all results
        while ($row = $result->fetch_assoc()) {
            $categoryDetails[] = $row;
        }

        // Respond with the fetched category details
        echo json_encode($categoryDetails);
    } else {
        // No records found, return an empty array
        echo json_encode([]);
    }
} else {
    // If the request method is not GET
    echo json_encode(['message' => 'Invalid Request Method']);
}

?>
