<?php
// Allow from any origin (you can modify this for your specific domain)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (POST, OPTIONS)
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Content-Type for JSON
header('Content-Type: application/json');

// Handle OPTIONS request for preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection
include("../config/db.php");

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the ID from the URL parameters (using GET method)
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;

    // If ID is missing, return an error
    if ($id === null) {
        http_response_code(400);
        echo json_encode(["message" => "Missing ID parameter"]);
        exit();
    }

    // Extract fields from the POST data
    $foodname = $_POST['foodname'] ?? null;
    $foodprice = $_POST['foodprice'] ?? null;
    $foodcategory = $_POST['foodcategory'] ?? null;
    $fooddesc = $_POST['fooddesc'] ?? null;
    $menumodifieddate = $_POST['menumodifieddate'] ?? null;

    // Initialize the query for updating the data
    $sql = "UPDATE foodmenulist SET foodname = ?, foodprice = ?, foodcategory = ?, fooddesc = ?, modifieddate = ? WHERE id = ?";
    $params = [$foodname, $foodprice, $foodcategory, $fooddesc, $menumodifieddate, $id];

    // Check if a file (food image) was uploaded
    if (isset($_FILES['foodimg']) && $_FILES['foodimg']['error'] === 0) {
        // Handle the file upload
        $targetDir = "../uploads/food_img/";
        $fileName = basename($_FILES['foodimg']['name']);
        $targetFile = $targetDir . $fileName;

        // Move the uploaded file to the server directory
        if (move_uploaded_file($_FILES['foodimg']['tmp_name'], $targetFile)) {
            // If file upload is successful, update the query to include the image path
            $foodimg = "uploads/food_img/" . $fileName;
            $sql = "UPDATE foodmenulist SET foodname = ?, foodprice = ?, foodcategory = ?, fooddesc = ?, foodimg = ?, modifieddate = ? WHERE id = ?";
            array_splice($params, 4, 0, $foodimg); // Insert the image path into parameters
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Error uploading the food image"]);
            exit();
        }
    }

    // Log the query and parameters for debugging
    error_log("SQL Query: " . $sql); // Log the SQL query
    error_log("SQL Params: " . implode(", ", $params)); // Log the parameters

    // Prepare the SQL query
    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters based on whether an image is uploaded
        if (isset($foodimg)) {
            $stmt->bind_param("ssssssi", ...$params); // 6 strings and 1 integer
        } else {
            $stmt->bind_param("sssssi", ...$params); // 5 strings and 1 integer if no image
        }

        // Execute the query
        if ($stmt->execute()) {
            // Check how many rows were affected
            $affectedRows = $stmt->affected_rows;
            if ($affectedRows > 0) {
                // If the update was successful
                http_response_code(200);
                echo json_encode(["message" => "Menu item updated successfully"]);
            } else {
                // If no rows were updated (perhaps ID does not exist)
                http_response_code(404);
                echo json_encode(["message" => "Menu item not found"]);
            }
        } else {
            // If there was an error executing the query
            http_response_code(500);
            echo json_encode(["message" => "Error executing the query"]);
        }

        // Close the prepared statement
        $stmt->close();
    } else {
        // If there was an error preparing the SQL statement
        http_response_code(500);
        echo json_encode(["message" => "Error preparing SQL statement"]);
    }
} else {
    // If the request method is not POST, return a method not allowed status
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}

// Close the database connection
$conn->close();
?>
