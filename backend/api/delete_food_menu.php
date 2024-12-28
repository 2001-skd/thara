<?php
// Allow from any origin (you can modify this for your specific domain)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (DELETE)
header("Access-Control-Allow-Methods: DELETE, OPTIONS");

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

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // Retrieve the ID from the URL
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;  // Ensure it's an integer

    if ($id === null) {
        // If ID is not provided, return an error response
        http_response_code(400);
        echo json_encode(["message" => "Missing ID parameter"]);
        exit();
    }

    // SQL query to delete the food menu item by ID
    $sql = "DELETE FROM foodmenulist WHERE id = ?";

    // Prepare the statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind the parameter to the query
        $stmt->bind_param("i", $id);  // "i" indicates the type is an integer

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(["message" => "Deleted successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Error while deleting food menu item"]);
        }

        // Close the prepared statement
        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Error preparing SQL statement"]);
    }
} else {
    // If the request method is not DELETE, return a method not allowed status
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}
?>
