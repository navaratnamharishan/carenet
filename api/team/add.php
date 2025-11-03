<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "../../config.php";

$targetDir = "../../uploads/team/";
if (!is_dir($targetDir)) mkdir($targetDir, 0777, true);


$name = $_POST['name'] ?? '';
$role = $_POST['role'] ?? '';


$imagePath = '';
if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
    $filename = uniqid() . '_' . basename($_FILES["image"]["name"]);
    $targetFile = $targetDir . $filename;
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
        $imagePath = "uploads/team/" . $filename; 
}

if (!$name || !$role) {
    echo json_encode(['success'=>false,'message'=>'Missing name or role']);
    exit;
}


$stmt = $conn->prepare("INSERT INTO team_members (name, role, image) VALUES (?,?,?)");
$stmt->bind_param("sss", $name, $role, $imagePath);
if ($stmt->execute()) {
    echo json_encode(['success'=>true,'id'=>$stmt->insert_id,'image'=>$imagePath]);
} else {
    echo json_encode(['success'=>false,'error'=>$stmt->error]);
}
$stmt->close();
};