<?php
header('Content-Type: application/json');
session_start();

require_once 'dbconnect.php';

// Check if user is logged in
if (!isset($_SESSION["owner_id"])) {
    echo json_encode(["success" => false, "error" => "Session expired. Please login again."]);
    exit;
}

// Get input data
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (empty($data['currentPassword']) || empty($data['newPassword']) || empty($data['confirmPassword'])) {
    echo json_encode(["success" => false, "error" => "All fields are required."]);
    exit;
}

if ($data['newPassword'] !== $data['confirmPassword']) {
    echo json_encode(["success" => false, "error" => "New passwords do not match."]);
    exit;
}

// Verify current password
$stmt = $conn->prepare("SELECT password FROM owners WHERE owner_id = ?");
$stmt->bind_param("i", $_SESSION["owner_id"]);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows !== 1) {
    echo json_encode(["success" => false, "error" => "User not found."]);
    exit;
}

$owner = $result->fetch_assoc();

if (!password_verify($data['currentPassword'], $owner["password"])) {
    echo json_encode(["success" => false, "error" => "Current password is incorrect."]);
    exit;
}

// Update password
$newHash = password_hash($data['newPassword'], PASSWORD_DEFAULT);
$updateStmt = $conn->prepare("UPDATE owners SET password = ? WHERE owner_id = ?");
$updateStmt->bind_param("si", $newHash, $_SESSION["owner_id"]);

if ($updateStmt->execute()) {
    echo json_encode(["success" => true, "message" => "Password updated successfully."]);
} else {
    echo json_encode(["success" => false, "error" => "Database error. Please try again."]);
}