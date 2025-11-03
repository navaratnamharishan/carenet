<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php";

$res = $conn->query("SELECT COUNT(*) AS cnt, COALESCE(SUM(amount),0) AS total FROM donations");
$row = $res->fetch_assoc();
echo json_encode(['count'=>intval($row['cnt']),'total'=>floatval($row['total'])]);
