<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php";

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$contact = $data['contact'] ?? '';
$location = $data['location'] ?? '';
$type = $data['typeOfHelp'] ?? '';
$details = $data['details'] ?? '';
$language = $data['language'] ?? '';

if (!$name || !$contact || !$location || !$details) {
    echo json_encode(['success'=>false, 'message'=>'Missing fields']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO help_requests (name, contact, location, type_of_help, details, language, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')");
$stmt->bind_param("ssssss", $name, $contact, $location, $type, $details, $language);

if ($stmt->execute()) {
    echo json_encode(['success'=>true, 'message'=>'Request submitted']);
} else {
    echo json_encode(['success'=>false, 'message'=>$stmt->error]);
}
$stmt->close();
?>
