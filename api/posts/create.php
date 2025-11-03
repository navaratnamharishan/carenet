<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php";

$data = json_decode(file_get_contents("php://input"), true);
$title = $data['title'] ?? '';
$body = $data['body'] ?? '';
$author_id = intval($data['author_id'] ?? 0);
if (!$title || !$body) { echo json_encode(['success'=>false,'message'=>'Missing fields']); exit; }

$stmt = $conn->prepare("INSERT INTO posts (title,body,author_id) VALUES (?,?,?)");
$stmt->bind_param("ssi",$title,$body,$author_id);
if ($stmt->execute()) {
  
  $nid = $conn->insert_id;
  $stmt2 = $conn->prepare("INSERT INTO notifications (`type`,`title`,`message`,`ref_post_id`) VALUES ('Post',?, ?, ?)");
  $t = "Announcement: $title";
  $m = $body;
  $stmt2->bind_param("ssi",$t,$m,$nid);
  $stmt2->execute();
  $stmt2->close();
  echo json_encode(['success'=>true,'id'=>$stmt->insert_id]);
} else echo json_encode(['success'=>false,'error'=>$stmt->error]);
$stmt->close();
