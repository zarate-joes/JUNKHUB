<?php
require 'dbconnect.php';
$ssl = $pdo->query("SHOW STATUS LIKE 'Ssl_cipher'")->fetch();
echo "Connection encrypted using: " . $ssl['Value'];
?>