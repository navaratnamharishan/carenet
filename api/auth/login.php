<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php"; 

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Missing fields']);
    exit;
}

$stmt = $conn->prepare("SELECT id, name, email, password, role, is_super, status FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
    
    if (($row['status'] ?? '') !== 'approved' && !$row['is_super']) {
        echo json_encode(['success' => false, 'message' => 'Account not approved']);
        exit;
    }

    $hash = $row['password'];

    if (password_verify($password, $hash)) {
        
        $user = [
            'id' => (int)$row['id'],
            'name' => $row['name'],
            'email' => $row['email'],
            'role' => $row['role'],
            'isSuper' => (bool)$row['is_super']
        ];
        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Incorrect password']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'User not found']);
}
$stmt->close();
?>
