<?php
session_start();
$_SESSION = array();
session_destroy();
setcookie(session_name(), '', time() - 3600, '/');
header('Location: ../Owner Registration/owner_sign_in.php');
exit;