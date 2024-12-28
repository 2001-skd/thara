<?php
// Allow from any origin (you can modify this for your specific domain)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (POST)
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Content-Type for JSON
header('Content-Type: application/json');

// If this is a preflight request, just exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection
include("../config/db.php");

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if a file was uploaded
    if (isset($_FILES['foodimg']) && $_FILES['foodimg']['error'] == 0) {
        $foodImg = "uploads/food_img/" . basename($_FILES['foodimg']['name']);

        // Move uploaded file to the correct directory
        if (!move_uploaded_file($_FILES['foodimg']['tmp_name'], "../" . $foodImg)) {
            http_response_code(500);
            echo json_encode(["message" => "Error while uploading the image"]);
            exit();
        }
    } else {
        $foodImg = null; // No image uploaded
    }

    // Retrieve POST data
    $foodname = $_POST['foodname'];
    $foodprice = $_POST['foodprice'];
    $foodcategory = $_POST['foodcategory'];
    $fooddesc = $_POST['fooddesc'];
    $menumodifieddate = $_POST['menumodifieddate'];

    // SQL query to insert the food menu details
    $sql = "INSERT INTO foodmenulist (foodname, foodprice, foodcategory, foodimg, fooddesc, modifieddate) 
            VALUES (?, ?, ?, ?, ?, ?)";

    // Prepare the statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind the parameters to the statement
        $stmt->bind_param("sdssss", $foodname, $foodprice, $foodcategory, $foodImg, $fooddesc, $menumodifieddate);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(["message" => "Food menu item added successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Error while inserting food menu item"]);
        }

        // Close the prepared statement
        $stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Error preparing SQL statement"]);
    }
} else {
    // If the request method is not POST, return a method not allowed status
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
}
?>
