<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php";

$res = $conn->query("SELECT p.id,p.title,p.body,p.created_at,u.name AS author_name, p.author_id FROM posts p LEFT JOIN users u ON p.author_id=u.id ORDER BY p.created_at DESC");
$out = [];
while($r = $res->fetch_assoc()) $out[] = $r;
echo json_encode($out);
