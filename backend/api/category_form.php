<?php

// Allow from any origin (you can modify this for your specific domain)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods (POST)
header("Access-Control-Allow-Methods: POST, OPTIONS");

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



// Check if the form data is received
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Extract text data from the request body
    $categoryname = $_POST['categoryname'] ?? null;
    $categorymodifieddate = $_POST['categorymodifieddate'] ?? null;

    // Check if a file was uploaded
    if (isset($_FILES['categoryimg']) && $_FILES['categoryimg']['error'] == 0) {
        // Get the uploaded file's information
        $fileTmpPath = $_FILES['categoryimg']['tmp_name'];
        $fileName = $_FILES['categoryimg']['name'];
        $fileSize = $_FILES['categoryimg']['size'];
        $fileType = $_FILES['categoryimg']['type'];

        // Extract file extension and ensure it's valid
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        // Generate a new name for the file (to avoid overwriting)
        $newFileName = md5(time() . $fileName) . '.' . $fileExtension;

        // Set the full path for the uploaded file
        $uploadFilePath = 'uploads/category_img/' . $newFileName;

        // Check if the uploaded file is an image (you can extend this to support other formats)
        if (in_array($fileExtension, ['jpg', 'jpeg', 'png', 'gif'])) {
            // Attempt to move the uploaded file to the target directory
            if (move_uploaded_file($fileTmpPath, '../' . $uploadFilePath)) {
                // File successfully uploaded, now insert the category data into the database

                // Prepare the SQL query to insert the data
                $sql = "INSERT INTO categorylist (categoryname, categoryimg, datemodified) VALUES (?, ?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("sss", $categoryname, $uploadFilePath, $categorymodifieddate);

                // Execute the query
                if ($stmt->execute()) {
                    echo json_encode(['message' => 'Category data inserted successfully']);
                } else {
                    echo json_encode(['message' => 'Error while inserting category form']);
                }

                // Close the prepared statement
                $stmt->close();
            } else {
                echo json_encode(['message' => 'There was an error uploading the file']);
            }
        } else {
            echo json_encode(['message' => 'Only image files are allowed']);
        }
    } else {
        echo json_encode(['message' => 'No image file uploaded or there was an error uploading']);
    }
} else {
    echo json_encode(['message' => 'Invalid request method']);
}

// Close database connection (if needed)
$conn->close();
?>
