<?php

// Allow from any origin (you can modify this for your specific domain)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (GET, POST, DELETE, OPTIONS)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Content-Type for JSON
header('Content-Type: application/json');

// Handle OPTIONS request for preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // If the request is an OPTIONS request, simply return 200 OK
    http_response_code(200);
    exit();
}

// Include database connection
include("../config/db.php");

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get the category ID from the URL parameter
    if (isset($_GET['id'])) {
        $categoryId = $_GET['id'];

        // Prepare the DELETE SQL query
        $sql = "DELETE FROM categorylist WHERE id = ?";
        
        // Prepare the statement
        if ($stmt = $conn->prepare($sql)) {
            // Bind the parameter
            $stmt->bind_param("i", $categoryId); // "i" stands for integer type

            // Execute the query
            if ($stmt->execute()) {
                // Check if any row was deleted
                if ($stmt->affected_rows === 0) {
                    // No rows affected, meaning category was not found
                    echo json_encode(['message' => 'Category Not Found']);
                    http_response_code(404); // Not found
                } else {
                    // Successfully deleted
                    echo json_encode(['message' => 'Category deleted successfully']);
                    http_response_code(200); // Success
                }
            } else {
                // Error executing the query
                echo json_encode(['message' => 'Error while deleting']);
                http_response_code(500); // Internal server error
            }

            // Close the prepared statement
            $stmt->close();
        } else {
            // Error preparing the SQL statement
            echo json_encode(['message' => 'Error preparing statement']);
            http_response_code(500); // Internal server error
        }
    } else {
        // ID not provided in the URL
        echo json_encode(['message' => 'Category ID is required']);
        http_response_code(400); // Bad request
    }

    // Close the database connection
    $conn->close();
}
?>
