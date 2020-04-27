<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $query = "SELECT title, SRBtitle, ID, text, SRBtext FROM post";
    $posts = executeQuery($query);
    echo json_encode($posts);
?>
