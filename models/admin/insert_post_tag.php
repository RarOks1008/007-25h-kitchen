<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $code = 500;
    $error = "";
    $post = $_POST["post"];
    $tag = $_POST["tag"];
    $query = "SELECT COUNT(ID_post) AS rowCount FROM post_tag WHERE ID_post = :post AND ID_tag = :tag";
    $priprema = $conn -> prepare($query);
    $priprema->bindParam(":post", $post);
    $priprema->bindParam(":tag", $tag);
    $rezultat = $priprema->execute();
    $redovi = $priprema->FetchAll();
    $redovi = $redovi[0]->rowCount;
    if ($redovi == 1) { $error = "post_tag_exists"; }
    if ($error == "") {
        $query = "INSERT INTO post_tag (ID_post, ID_tag) VALUES (:post, :tag)";
        $priprema = $conn -> prepare($query);
        $priprema->bindParam(":post", $post);
        $priprema->bindParam(":tag", $tag);
        $rezultat = $priprema->execute();
        if ($rezultat) {
            $code = 200;
            echo json_encode("Successful");
        } else {
            $code = 503;
            echo json_encode("database_error");
        }
    } else {
        $code = 503;
        echo json_encode($error);
    }
    http_response_code($code);
?>
