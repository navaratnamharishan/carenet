<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../config.php";
// logout for stateless API is client-side (remove token/localStorage); respond success.
echo json_encode(['success'=>true,'message'=>'Logged out (client-side)']);
