<?php
// Database credentials
$host = 'shortline.proxy.rlwy.net';
$port = '26932';
$dbname = 'railway';
$username = 'root';
$password = 'IFNlBriXPJLDTcByPYieYCERdPBqvnzN';

// SSL options for secure connection
$ssl_options = [
    PDO::MYSQL_ATTR_SSL_CA => '/etc/ssl/certs/ca-certificates.crt',
    PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false // Set to true in production if you verify certs
];

// PDO connection options
$options = [
    PDO::ATTR_TIMEOUT => 8,
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_PERSISTENT => false,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_STRINGIFY_FETCHES => false,
    PDO::ATTR_EMULATE_PREPARES => false
] + $ssl_options;

try {
    // Create PDO connection
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, $options);

    // Verify SSL is being used
    $stmt = $pdo->query("SHOW STATUS LIKE 'Ssl_cipher'");
    $ssl = $stmt->fetch();

    if (empty($ssl['Value'])) {
        throw new RuntimeException("SSL not active! Connection is insecure.");
    }

    // Connection is secure, ready for queries...

} catch (PDOException $e) {
    error_log("DB Connection failed: " . $e->getMessage());
    die("Database maintenance in progress. Please try again later. Error: " . $e->getMessage());
} catch (Exception $e) {
    error_log("Security check failed: " . $e->getMessage());
    die("Secure connection requirement not met: " . $e->getMessage());
}
?>