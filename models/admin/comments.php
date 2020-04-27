<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $query = "SELECT text, ID FROM comments";
    $comments = executeQuery($query);
    echo json_encode($comments);
?>
