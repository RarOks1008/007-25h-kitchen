<?php
    header("Content-Type: application/json");
    include("../config/connection.php");
    $code = 500;
    $postId = $_GET["postId"];
    $query = "SELECT c.text AS commentText, c.date AS commentDate, u.name AS userName, u.last_name AS userLastName FROM comments c INNER JOIN users u ON c.user_id = u.ID WHERE c.post_id = :postId";
    $priprema = $conn->prepare($query);
    $priprema->bindParam(":postId", $postId);
    $rezultat = $priprema->execute();
    if ($rezultat) {
        $posts = $priprema->FetchAll();
        $code = 200;
        echo json_encode($posts);
    } else {
        $code = 504;
        echo json_encode("Update failed");
    }
    http_response_code($code);
?>
