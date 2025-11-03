<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Validate email
if (!isset($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid or missing email address"]);
    exit;
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? 'No Subject';
$message = $_POST['message'] ?? '';

// Validate required fields
if (!$name || !$email || !$message) {
    echo json_encode(["success" => false, "message" => "Name, Email, and Message are required"]);
    exit;
}

// Load PHPMailer
require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // SMTP settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';  
    $mail->SMTPAuth   = true;
    $mail->Username   = 'yourcompany@gmail.com'; 
    $mail->Password   = 'your_app_password';     
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Email settings
    $mail->setFrom($email, $name); // Sender is user
    $mail->addAddress('navaratnamharishan@gmail.com'); // Receiver
    $mail->Subject = $subject;
    $mail->Body = "
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Message:</strong><br>{$message}</p>
    ";
    $mail->isHTML(true);

    if ($mail->send()) {
        echo json_encode(["success" => true, "message" => "Message sent successfully!"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
