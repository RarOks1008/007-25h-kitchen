<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $query = "SELECT p.title AS postTitle, p.SRBtitle AS postSRBTitle, p.ID AS postID, t.name AS tagName, t.SRBname AS tagSRBName, t.ID AS tagID FROM post_tag pt INNER JOIN post p ON pt.ID_post = p.ID INNER JOIN tags t ON pt.ID_tag = t.ID";
    $posttags = executeQuery($query);
    echo json_encode($posttags);
?>
