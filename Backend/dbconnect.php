<?php

$host="centerbeam.proxy.rlwy.net";
$dbname="railway";
$username="root";
$password="cglURvsjZsiIwwVsJdfpOKplztFeGylx";
$port = 34126;

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}