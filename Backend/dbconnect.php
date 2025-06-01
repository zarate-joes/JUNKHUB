<?php
$host = 'localhost';
$dbname = 'register';
$username = 'root';
$password = '';
$port = '3306';

// Connection options for local development
$options = [
    PDO::ATTR_TIMEOUT => 8,
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_PERSISTENT => false
];

try {
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname",
        $username,
        $password,
        $options
    );
    
} catch(PDOException $e) {
    error_log("DB Connection failed: " . $e->getMessage());
    die("Database connection error. Please try later.");
}

?>