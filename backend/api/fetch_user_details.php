<?php
// Allow from any origin (you can modify this for your specific domain)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (GET, POST)
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
    // SQL query to fetch user details ordered by ID in descending order
    $sql = "SELECT * FROM userdetails ORDER BY id DESC";

    // Execute the query
    $result = $conn->query($sql);

    // Check if the query was successful
    if ($result) {
        // Fetch all rows as an associative array
        $userDetails = $result->fetch_all(MYSQLI_ASSOC);  // Use fetch_all() with MYSQLI_ASSOC

        // Send a JSON response with a success status and the user details
        echo json_encode($userDetails);
    } else {
        // If there was an error with the query, send a 500 error response
        http_response_code(500);
        echo json_encode(["message" => "Error While Fetching User Details"]);
    }
} else {
    // If the request method is not GET, return a method not allowed status
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}
?>
