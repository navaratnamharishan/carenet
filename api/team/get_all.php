<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php";

$res = $conn->query("SELECT * FROM team_members ORDER BY id DESC");
$out = [];
while($r = $res->fetch_assoc()) $out[] = $r;
echo json_encode($out);
