<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php"; 

$data = json_decode(file_get_contents("php://input"), true);
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$role = $data['role'] ?? 'donor';

if (!$name || !$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Missing fields']);
    exit;
}


$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already registered']);
    exit;
}
$stmt->close();


$hash = password_hash($password, PASSWORD_DEFAULT);


$sql = "INSERT INTO users (name, email, password, role, status, is_super) VALUES (?, ?, ?, ?, 'pending', 0)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $hash, $role);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}
$stmt->close();
?>
