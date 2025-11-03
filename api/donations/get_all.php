<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php";

$res = $conn->query("SELECT d.*, u.name as donor_name FROM donations d LEFT JOIN users u ON d.donor_id = u.id ORDER BY d.created_at DESC");
$out = [];
while($r = $res->fetch_assoc()) $out[] = $r;
echo json_encode($out);
