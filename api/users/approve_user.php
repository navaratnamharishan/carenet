<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id'] ?? 0);
$admin_id = intval($data['admin_id'] ?? 0);

if (!$id) { echo json_encode(['success'=>false,'message'=>'Missing id']); exit; }
$stmt = $conn->prepare("UPDATE users SET status='approved' WHERE id = ?");
$stmt->bind_param("i",$id);
if ($stmt->execute()) {
  
  $title = "Account approved";
  $msg = "Your account has been approved by admin.";
  $stmt2 = $conn->prepare("INSERT INTO notifications (type,title,message,ref_user_id) VALUES ('UserApproved',?,?,?)");
  $stmt2->bind_param("ssi",$title,$msg,$id);
  $stmt2->execute();
  $stmt2->close();
  echo json_encode(['success'=>true]);
} else {
  echo json_encode(['success'=>false,'error'=>$stmt->error]);
}
$stmt->close();
