<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php";

$result = $conn->query("SELECT id,name,email,role,status,is_super FROM users ORDER BY id ASC");
$users = [];
while($r = $result->fetch_assoc()) $users[] = $r;
echo json_encode($users);
