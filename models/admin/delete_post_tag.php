<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $code = 500;
    $post_tag = $_POST["post_tag"];
    $ids = explode("-", $post_tag);
    $query = "DELETE FROM post_tag WHERE ID_post = :post_id AND ID_tag = :tag_id";
    $priprema = $conn -> prepare($query);
    $priprema->bindParam(":post_id", $ids[0]);
    $priprema->bindParam(":tag_id", $ids[1]);
    $rezultat = $priprema->execute();
    if ($rezultat) {
        $code = 202;
        echo json_encode("Successful");
    } else {
        $code = 503;
        echo json_encode("database_error");
    }
    http_response_code($code);
?>
