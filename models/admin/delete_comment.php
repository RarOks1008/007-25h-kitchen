<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $code = 500;
    $comment = $_POST["comment"];
    $query = "DELETE FROM comments WHERE ID = :comment";
    $priprema = $conn -> prepare($query);
    $priprema->bindParam(":comment", $comment);
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
