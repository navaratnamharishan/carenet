<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id'] ?? 0);
$role = $data['role'] ?? '';

if (!$id || !$role) { echo json_encode(['success'=>false,'message'=>'Missing fields']); exit;}
$stmt = $conn->prepare("UPDATE users SET role=? WHERE id=?");
$stmt->bind_param("si",$role,$id);
if ($stmt->execute()) echo json_encode(['success'=>true]);
else echo json_encode(['success'=>false,'error'=>$stmt->error]);
$stmt->close();
