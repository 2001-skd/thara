<?php
// Include the database connection
include("../config/db.php");

// Set CORS headers if required (for development)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // SQL query to fetch details from the database based on category
    $sql = "SELECT foodname, foodprice, foodcategory, foodimg, fooddesc, categoryname, categoryimg 
            FROM foodmenulist 
            INNER JOIN categorylist ON foodmenulist.foodcategory = categorylist.categoryname";
    
    // Prepare the SQL statement
    $stmt = $conn->prepare($sql);
    
    // Execute the query
    $stmt->execute();
    
    // Fetch the result
    $result = $stmt->get_result();
    
    // If there are results, return them as JSON
    if ($result->num_rows > 0) {
        $menuDetails = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($menuDetails);
    } else {
        // If no data is found
        echo json_encode(['message' => 'No menu details found based on category']);
    }

} catch (Exception $e) {
    // Handle any exceptions and return a 500 status code
    http_response_code(500);
    echo json_encode(['message' => 'Error while fetching details on menulist based on category', 'error' => $e->getMessage()]);
}

// Close the database connection
$stmt->close();
$conn->close();
?>
