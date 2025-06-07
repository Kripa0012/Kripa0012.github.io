<?php
header('Content-Type: application/json');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Your email - REPLACE THIS
$recipient_email = "your-email@example.com";

// Get form data with sanitization
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING) ?? 'New portfolio message';
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// Validate
$errors = [];
if (empty($name)) $errors[] = "Name is required";
if (empty($email)) $errors[] = "Email is required";
if (empty($message)) $errors[] = "Message is required";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email format";

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(", ", $errors)]);
    exit;
}

// Build email
$email_headers = [
    'From' => "$name <$email>",
    'Reply-To' => $email,
    'Content-Type' => 'text/html; charset=UTF-8',
    'X-Mailer' => 'PHP/' . phpversion()
];

$email_content = "
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> $name</p>
<p><strong>Email:</strong> $email</p>
<p><strong>Subject:</strong> $subject</p>
<p><strong>Message:</strong></p>
<p>".nl2br($message)."</p>
";

// Try sending (two methods)
try {
    // Method 1: PHP mail()
    $mail_sent = mail($recipient_email, $subject, $email_content, $email_headers);
    
    // Method 2: Fallback to SMTP (uncomment if needed)
    // require 'vendor/autoload.php'; // For PHPMailer
    // $mail_sent = sendViaSMTP($recipient_email, $subject, $email_content);
    
    if ($mail_sent) {
        echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent.']);
    } else {
        throw new Exception('Mail function failed');
    }
} catch (Exception $e) {
    // Log the error
    error_log("Mail error: ".$e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Could not send message. Please try again later.',
        'debug' => $e->getMessage() // Remove in production
    ]);
}

// SMTP function example (requires PHPMailer)
/*
function sendViaSMTP($to, $subject, $body) {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.yourprovider.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'your@email.com';
    $mail->Password = 'yourpassword';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    
    $mail->setFrom('your@email.com', 'Your Portfolio');
    $mail->addAddress($to);
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $body;
    
    return $mail->send();
}
*/
?>