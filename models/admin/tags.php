<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $query = "SELECT name, SRBname, ID FROM tags";
    $tags = executeQuery($query);
    echo json_encode($tags);
?>
