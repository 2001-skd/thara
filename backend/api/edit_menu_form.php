<?php
// Allow from any origin (you can modify this for your specific domain)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (PUT, OPTIONS)
header("Access-Control-Allow-Methods: PUT, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Content-Type for JSON
header('Content-Type: application/json');

// If this is a preflight request, just exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection and file upload handling
include("../config/db.php");

// Handle PUT request
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    // Get the ID from the URL parameters
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;

    // If ID is missing, return an error
    if ($id === null) {
        http_response_code(400);
        echo json_encode(["message" => "Missing ID parameter"]);
        exit();
    }

    // Get the incoming JSON payload (assumed to be in the request body)
    $inputData = json_decode(file_get_contents('php://input'), true);

    // Extract fields from the incoming data
    $foodname = $inputData['foodname'] ?? null;
    $foodprice = $inputData['foodprice'] ?? null;
    $foodcategory = $inputData['foodcategory'] ?? null;
    $fooddesc = $inputData['fooddesc'] ?? null;
    $menumodifieddate = $inputData['menumodifieddate'] ?? null;

    // Initialize the query parts
    $sql = "UPDATE foodmenulist SET foodname = ?, foodprice = ?, foodcategory = ?, fooddesc = ?, modifieddate = ? WHERE id = ?";
    $params = [$foodname, $foodprice, $foodcategory, $fooddesc, $menumodifieddate, $id];

    // Check if there is a file upload
    if (isset($_FILES['foodimg']) && $_FILES['foodimg']['error'] == 0) {
        // Handle the file upload (food image)
        $targetDir = "../uploads/food_img/";
        $fileName = basename($_FILES['foodimg']['name']);
        $targetFile = $targetDir . $fileName;

        // Move the uploaded file to the target directory
        if (move_uploaded_file($_FILES['foodimg']['tmp_name'], $targetFile)) {
            // File upload successful, include the image path in the query
            $foodimg = "uploads/food_img/" . $fileName;
            $sql = "UPDATE foodmenulist SET foodname = ?, foodprice = ?, foodcategory = ?, fooddesc = ?, foodimg = ?, modifieddate = ? WHERE id = ?";
            array_splice($params, 4, 0, $foodimg); // Insert the foodimg into the parameters
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
        // Dynamically bind the parameters based on the number of parameters
        if (isset($foodimg)) {
            $stmt->bind_param("ssssssi", ...$params); // 6 strings and 1 integer
        } else {
            $stmt->bind_param("sssssi", ...$params); // 5 strings and 1 integer if no foodimg
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
    // If the request method is not PUT, return a method not allowed status
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}


?>