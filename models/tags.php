<?php
    header("Content-Type: application/json");
    include("../config/connection.php");
    $query = "SELECT * FROM tags";
    $tags = executeQuery($query);
    echo json_encode($tags);
?>
