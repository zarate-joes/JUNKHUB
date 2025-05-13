<?php
$host = 'centerbeam.proxy.rlwy.net';
$port = '34126';
$dbname = 'railway';
$username = 'root';
$password = 'cglURvsjZsiIwwVsJdfpOKplztFeGylx';

// SSL Configuration (critical for Railway)
$ssl_options = [
    PDO::MYSQL_ATTR_SSL_CA => '/etc/ssl/certs/ca-certificates.crt', // Default cert path
    PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false, // Disable for Railway's proxy
];

// Connection options
$options = [
    PDO::ATTR_TIMEOUT => 8,
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_PERSISTENT => false
] + $ssl_options; // Merge SSL options

try {
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname",
        $username,
        $password,
        $options
    );
    
    // Verify SSL is actually being used
    $stmt = $pdo->query("SHOW STATUS LIKE 'Ssl_cipher'");
    $ssl = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (empty($ssl['Value'])) {
        throw new Exception("SSL not active! Connection is insecure!");
    }
    
} catch(PDOException $e) {
    error_log("DB Connection failed: " . $e->getMessage());
    die("Database maintenance in progress. Please try later.");
}
?>