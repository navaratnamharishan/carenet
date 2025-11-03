<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id'] ?? 0);
$title = $data['title'] ?? '';
$body = $data['body'] ?? '';
if (!$id || !$title || !$body) { echo json_encode(['success'=>false,'message'=>'Missing fields']); exit; }

$stmt = $conn->prepare("UPDATE posts SET title=?, body=? WHERE id=?");
$stmt->bind_param("ssi",$title,$body,$id);
if ($stmt->execute()) echo json_encode(['success'=>true]);
else echo json_encode(['success'=>false,'error'=>$stmt->error]);
$stmt->close();
