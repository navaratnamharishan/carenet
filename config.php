<?php
// config.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

$host = "localhost";
$user = "root";
$pass = "";
$db = "carenet";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success'=>false,'error'=>'DB connection failed']);
    exit;
}
$conn->set_charset("utf8mb4");
?>
