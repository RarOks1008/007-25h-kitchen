<?php
    header("Content-Type: application/json");
    include("../config/connection.php");
    $query = "SELECT * FROM types";
    $types = executeQuery($query);
    echo json_encode($types);
?>
