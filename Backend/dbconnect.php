<?php

$host = getenv('MYSQLHOST');     // e.g., "mysql.railway.internal"
$port = getenv('MYSQLPORT');     // e.g., 34126
$dbname = getenv('MYSQLDATABASE'); // "railway"
$username = getenv('MYSQLUSER');   // "root"
$password = getenv('MYSQLPASSWORD'); // Railway auto-generates this

$options = [
  PDO::MYSQL_ATTR_SSL_CA => '/etc/ssl/cert.pem' // SSL for security
];


try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

?>