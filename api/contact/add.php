<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php";

$data = json_decode(file_get_contents("php://input"), true);
$name = $conn->real_escape_string($data['name'] ?? '');
$email = $conn->real_escape_string($data['email'] ?? '');
$subject = $conn->real_escape_string($data['subject'] ?? '');
$message = $conn->real_escape_string($data['message'] ?? '');

if (!$name || !$email || !$message) { echo json_encode(['success'=>false,'message'=>'Missing fields']); exit; }

$stmt = $conn->prepare("INSERT INTO contact_messages (name,email,subject,message) VALUES (?,?,?,?)");
$stmt->bind_param("ssss",$name,$email,$subject,$message);
if ($stmt->execute()) {
  
  $t = "Contact message: " . substr($subject,0,80);
  $m = "$name sent a message";
  $stmt2 = $conn->prepare("INSERT INTO notifications (`type`,`title`,`message`) VALUES ('Contact',?,?)");
  $stmt2->bind_param("ss",$t,$m);
  $stmt2->execute();
  $stmt2->close();

  echo json_encode(['success'=>true,'id'=>$stmt->insert_id]);
} else echo json_encode(['success'=>false,'error'=>$stmt->error]);
$stmt->close();
