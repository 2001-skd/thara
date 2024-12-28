<?php
// Allow from any origin (you can modify this for your specific domain)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (POST, OPTIONS)
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Allow specific headers (allow necessary headers including content-type and authorization)
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Content-Type for JSON
header('Content-Type: application/json');

// Handle OPTIONS request for preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Respond to the preflight request with a 200 OK status
    http_response_code(200);
    exit;
}

// Include database connection
include("../config/db.php");

// Check if the ID is provided in the URL (using GET method)
if (isset($_GET['id'])) {
    $categoryId = $_GET['id'];

    // Get the category name and modified date from POST data
    if (isset($_POST['categoryname']) && isset($_POST['categorymodifieddate'])) {
        $categoryname = $_POST['categoryname'];
        $categorymodifieddate = $_POST['categorymodifieddate'];
    } else {
        // If required data is not provided in the POST request
        echo json_encode(['message' => 'Category name and modified date are required']);
        http_response_code(400); // Bad request
        exit;
    }

    // Check if a file was uploaded
    $categoryimg = null;
    if (isset($_FILES['categoryimg']) && $_FILES['categoryimg']['error'] === 0) {
        // Set the target directory for the uploaded file
        $targetDir = "../uploads/category_img/";
        $fileName = basename($_FILES['categoryimg']['name']);
        $targetFilePath = $targetDir . $fileName;

        // Move the uploaded file to the server directory
        if (move_uploaded_file($_FILES['categoryimg']['tmp_name'], $targetFilePath)) {
            // File uploaded successfully, update the image path
            $categoryimg = "uploads/category_img/" . $fileName;
        } else {
            // Error uploading the image
            echo json_encode(['message' => 'Error uploading image file']);
            http_response_code(500); // Internal server error
            exit;
        }
    }

    // Prepare the SQL query for updating the category
    if ($categoryimg) {
        // If there is a new image, include it in the update
        $sql = "UPDATE categorylist SET categoryname = ?, categoryimg = ?, datemodified = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $categoryname, $categoryimg, $categorymodifieddate, $categoryId);
    } else {
        // If no new image, update only the name and modified date
        $sql = "UPDATE categorylist SET categoryname = ?, datemodified = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $categoryname, $categorymodifieddate, $categoryId);
    }

    // Execute the query
    if ($stmt->execute()) {
        // Check if any row was affected (i.e., if the category was updated)
        if ($stmt->affected_rows > 0) {
            echo json_encode(['message' => 'Category item updated successfully']);
            http_response_code(200); // OK
        } else {
            echo json_encode(['message' => 'Category item not found or no changes were made']);
            http_response_code(404); // Not found
        }
    } else {
        // Error executing the query
        echo json_encode(['message' => 'Error updating Category item']);
        http_response_code(500); // Internal server error
    }

    // Close the prepared statement
    $stmt->close();
} else {
    // If ID is not provided in the URL
    echo json_encode(['message' => 'Category ID is required']);
    http_response_code(400); // Bad request
}

// Close the database connection
$conn->close();
?>
