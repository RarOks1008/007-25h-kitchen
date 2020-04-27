<?php
    header("Content-Type: application/json");
    include("../config/connection.php");
    $query = "SELECT p.title AS title, p.SRBtitle AS SRBtitle, p.date AS postDate, u.name AS name, u.last_name AS lastname FROM post p INNER JOIN users u ON p.user_id = u.ID ORDER BY p.date DESC LIMIT 3";
    $top_posts = executeQuery($query);
    echo json_encode($top_posts);
?>
