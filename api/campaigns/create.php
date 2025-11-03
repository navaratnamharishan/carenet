<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");


include "../../config.php";


error_reporting(E_ALL);
ini_set('display_errors', 1);


$targetDir = "../../uploads/campaigns/";
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}


$title = trim($_POST['title'] ?? '');
$year = intval($_POST['year'] ?? 0);
$location = trim($_POST['location'] ?? '');
$summary = trim($_POST['summary'] ?? '');
$image = $_FILES['image'] ?? null;


if (!$title || !$year || !$location || !$summary) {
    echo json_encode([
        "success" => false,
        "message" => "All fields (title, year, location, summary) are required"
    ]);
    exit;
}


$imagePath = "uploads/campaigns/default.jpg";


if ($image && $image['error'] === 0) {
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($image['type'], $allowedTypes)) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid image type. Only JPG, PNG, GIF allowed."
        ]);
        exit;
    }

    $filename = uniqid() . "_" . basename($image["name"]);
    $targetFile = $targetDir . $filename;

    if (move_uploaded_file($image["tmp_name"], $targetFile)) {
        $imagePath = "uploads/campaigns/" . $filename;
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to upload image."
        ]);
        exit;
    }
}


$stmt = $conn->prepare("INSERT INTO campaigns (image, title, year, location, summary) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "DB prepare failed: " . $conn->error
    ]);
    exit;
}

$stmt->bind_param("ssiss", $imagePath, $title, $year, $location, $summary);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Campaign added successfully",
        "id" => $stmt->insert_id,
        "image" => $imagePath
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "DB execute failed: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
