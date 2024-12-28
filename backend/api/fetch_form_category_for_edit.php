<?php

// Allow from any origin (you can modify this for your specific domain)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (GET)
header("Access-Control-Allow-Methods: GET, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Content-Type for JSON
header('Content-Type: application/json');

// Handle OPTIONS request for preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Send 200 OK for OPTIONS preflight request
    exit();
}

// Include database connection
include("../config/db.php");

// Check if the id is provided in the URL
if (isset($_GET['id'])) {
    $categoryId = $_GET['id'];

    // Prepare the SQL query to fetch category details by id
    $sql = "SELECT * FROM categorylist WHERE id = ?";

    // Prepare the statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind the parameter
        $stmt->bind_param("i", $categoryId); // "i" stands for integer type

        // Execute the query
        if ($stmt->execute()) {
            // Get the result
            $result = $stmt->get_result();
            
            // Check if a row was found
            if ($result->num_rows > 0) {
                // Fetch the result as an associative array
                $data = $result->fetch_assoc();

                // Return the data as a JSON response
                echo json_encode($data);
                http_response_code(200); // Success
            } else {
                // No category found with the provided id
                echo json_encode(['message' => 'Category not found']);
                http_response_code(404); // Not found
            }
        } else {
            // Error executing the query
            echo json_encode(['message' => 'Error while fetching form details']);
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

?>
