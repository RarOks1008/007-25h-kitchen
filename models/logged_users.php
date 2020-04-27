<?php
    header("Content-Type: application/json");
    include("../config/connection.php");
    $logged = executeQuery("SELECT COUNT(*) AS logged_users FROM users WHERE LastTimeSeen > DATE_SUB(NOW(), INTERVAL 5 MINUTE)");
    echo json_encode($logged);
?>
