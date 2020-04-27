<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $query = "SELECT ID, email, name, last_name FROM users WHERE rights_id != 1";
    $users = executeQuery($query);
    echo json_encode($users);
?>
