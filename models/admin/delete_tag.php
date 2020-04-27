<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $code = 500;
    $tag = $_POST["tag"];
    $query = "DELETE FROM tags WHERE ID = :tag";
    $priprema = $conn -> prepare($query);
    $priprema->bindParam(":tag", $tag);
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
