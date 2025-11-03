<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id'] ?? 0);
if (!$id) { echo json_encode(['success'=>false,'message'=>'Missing id']); exit; }

$stmt = $conn->prepare("DELETE FROM posts WHERE id=?");
$stmt->bind_param("i",$id);
if ($stmt->execute()) {
  // delete related notifications
  $stmt2 = $conn->prepare("DELETE FROM notifications WHERE ref_post_id=?");
  $stmt2->bind_param("i",$id);
  $stmt2->execute();
  $stmt2->close();

  echo json_encode(['success'=>true]);
} else echo json_encode(['success'=>false,'error'=>$stmt->error]);
$stmt->close();
